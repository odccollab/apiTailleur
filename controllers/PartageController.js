// controllers/postController.js
import Post from '../models/Post';
import UserModel from '../models/User';

exports.sharePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userIds } = req.body; // IDs des utilisateurs avec qui partager le post
    const sharingUserId = req.user._id; // ID de l'utilisateur qui partage (authentifié)

    // Vérifier si le post existe
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post non trouvé" });
    }

    // Vérifier si les utilisateurs cibles existent
    const targetUsers = await UserModel.find({ _id: { $in: userIds } });
    if (targetUsers.length !== userIds.length) {
      return res.status(400).json({ message: "Un ou plusieurs utilisateurs cibles n'existent pas" });
    }

    // Ajouter le post au tableau de posts de chaque utilisateur cible
    const updatePromises = targetUsers.map(user => 
      UserModel.findByIdAndUpdate(
        user._id,
        { $addToSet: { post: postId } }, // Utilise $addToSet pour éviter les doublons
        { new: true }
      )
    );

    await Promise.all(updatePromises);

    // Créer une notification pour chaque utilisateur cible
    const notificationPromises = targetUsers.map(user =>
      UserModel.findByIdAndUpdate(
        user._id,
        {
          $push: {
            notifications: {
              type: 'share',
              message: `L'utilisateur ${req.user.nom} ${req.user.prenom} a partagé un post avec vous.`,
              date: new Date()
            }
          }
        },
        { new: true }
      )
    );

    await Promise.all(notificationPromises);

    res.status(200).json({ message: "Post partagé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors du partage du post", error: error.message });
  }
};