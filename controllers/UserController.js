import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  Utils  from '../utils/utils.js';
import Validator from '../utils/Validator2.js'
import mongoose from 'mongoose';
import Post from '../models/Post.js';
class UserController {
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static async createUser(req, res) {
    let validate=new Validator()
    const { valid, errors } = validate.validateUser(req.body);

    if (!valid) return res.status(400).json({ errors });

    let { nom, prenom, role, password, telephone, mail,passconfirm } = req.body;
    if (password !== passconfirm) {
      return res.status(400).send('Les mots de passe ne correspondent pas');
    }
    password = UserController.hashPassword(password);
    try {
      const user = await User.create({
        nom,
        prenom,
        role,
        password,
        telephone,
        mail,
      });
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
  }

  static async findUserByEmail(req, res) {
    const { email } = req.params;
    try {
      const user = await User.findOne({ mail: email });
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  static async findUserByEmail2(req, res) {
    const id  = req.id;
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  static compPass(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
  }

  static async loginUser(req, res) {
    const { mail, password } = req.body;
    // console.log(password);
    
    if (!mail ||!password) {
      return res.status(400).json({ message: 'Please provide both email and password' });
    }
    try {
      const user = await User.findOne({ mail });
      // console.log(user);
      
      if (!user || !Utils.compPass(password, user.password)) {
        
        return res.status(400).json({ message: 'Invalid credentials',password: Utils.compPass(password, user.password) });
      }
const SECRET_KEY ="d,fhjdhfjesrgfjshwgjfhugseyruyfqusdfkjqsdhfLIqdfslqsdhflqshkdfghkqsdhfkqhdSDGHSGDHGSHDHHSGDHSGDHGSHCHSGDH12345678908765432345"

      const token = jwt.sign({ id: user._id,role:user.type ,nom:user.nom,prenom:user.prenom,photo:user.i}, SECRET_KEY, {
        expiresIn: '7h',
      });
      res.json({success:"connected", token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  

  static async addNotification(userId, notification) {
    try {
      const user = await User.findById(userId);
      user.notifications.push(notification);
      await user.save();
      return user;
    } catch (err) {
      console.error("jsjsdh");
    }
  }


  // Méthode pour suivre ou ne plus suivre un utilisateur
  static async handleFollowUnfollow(req, res) {
    const { id } = req.params;  
    const userId = req.id; 

    try {

        const userToFollow = await User.findById(id);  // Utilisateur à suivre

        if (!userToFollow) {
            return res.status(404).send("User not found");
        }

        const isFollowing = userToFollow.followers.includes(userId);

        if (isFollowing) {
            // Si l'utilisateur suit déjà, on le retire de la liste des followers
            userToFollow.followers = userToFollow.followers.filter(followerId => followerId.toString() !== userId);
        } else {
            // Sinon, on ajoute l'utilisateur à la liste des followers
            userToFollow.followers.push(userId);
        }

        await userToFollow.save();  // Enregistrement des changements

        res.json({ followers: userToFollow.followers });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}
static async rechargerCompte(req, res) {
  const { amount } = req.body;  
  const userId = req.id;  
if(amount<1000){
  return res.status(400).send("Le montant doit être supérieur ou égal à 1000");
}
  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send("User not found");
      }

      const creditsToAdd = Math.floor(amount / 1000);

      user.credits += creditsToAdd;

      await user.save();

      res.json({ success: true, credits: user.credits });
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
}

static async ChangeEnTailleur(req, res) {
  const userId = req.id;

  try {
      const user = await User.findById(userId);

      if (!user) {
          return res.status(404).send("User not found");
      }

      if (user.credits < 10) {
          return res.status(400).send("Insufficient credits to upgrade to Tailleur");
      }

      user.credits -= 10;
      user.type = 'tailleur';

      await user.save();

      res.json({ message: "Account upgraded to Tailleur", credits: user.credits });
  } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
  }
}

    static async addFollower(req, res) {
    const {  followedId } = req.body;
    //import mongoose
    if (!mongoose.Types.ObjectId.isValid(followedId)){
      return res.status(400).send({ error: 'Invalid followedId' });
    }

    try {
      const userconected = await User.findById(req.id);
      const userToFollow = await User.findById(followedId);
      
      if (!userconected ) {
        return res.status(404).send("User connected not found");
      }
      if(!userToFollow){
        return res.status(404).send("User to follow not found");

      }
       if(followedId==req.id){
       return res.status(400).send("vous ne pouvez pas vous suivre vous-même");
     }
     
      if(userToFollow.followers.includes(req.id)){
        
        const index = userToFollow.followers.indexOf(req.id);
        if (index > -1) {
          userToFollow.followers.splice(index, 1);
        }
        await userToFollow.save();
        return res.status(400).send("vous avez arretez de suivre cet utilisateur");

      }
      userToFollow.followers.push(req.id);
      // userToFollow.followers.push(followedId);
      await userToFollow.save();
      res.json(userToFollow);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
  //  methode qui affiche les followers d'un user
  static async getFollowers(req, res) {
    const userconected = await User.findById(req.id);
    if (req.role != 'tailleur') {
      return res.status(403).json({ message: 'Vous devez être un tailleur avoir des followers' });
    }
    if (!userconected) {
      return res.status(404).send("User connected not found");
    }
    //  console.log(req.id);
    // console.log(userconected.followers);
    // ici on affiche les followers de l'utilisateur connecté
    // ici on affiche les followers de l'utilisateur connecté avec leur nom et prénom
    const followers = await Promise.all(
      userconected.followers.map(async (followerId) => {
        const follower = await User.findById(followerId);
        if (follower) {
          return {
            _id: follower._id,
            nom: follower.nom,
            prenom: follower.prenom,
            photo: follower.photo
          };
        }
      })
    );
    return res.json(followers);
   
  }
  //  methode qui affiche les followings d'un user
   static async getFollowings(req, res) {
  //   try {
  //     const userconected = await User.findById(req.id);
  //     if (!userconected) {
  //       return res.status(404).send("User connected not found");
  //     }
  
  //     // Ensure 'following' is an array or provide an empty array as default
  //     const followingList = userconected.following || [];
  //     const followings = [];
  
  //     // Loop through each followingId and fetch the corresponding user details
  //     for (let i = 0; i < followingList.length; i++) {
  //       const followingId = followingList[i];
  //       const following = await User.findById(followingId);
        
  //       if (following) {
  //         followings.push({
  //           _id: following._id,
  //           nom: following.nom,
  //           prenom: following.prenom,
  //           photo: following.photo
  //         });
  //       }
      }
  
  //     return res.json(followings);
  //   } catch (error) {
  //     return res.status(500).json({ message: error.message });
  //   }
  // }
  static async getMessages(req, res) {
    try {
      // Récupérer l'ID de l'utilisateur à partir du token
      const userId = req.id;
  
      // Chercher l'utilisateur par son ID
      const user = await User.findById(userId).populate({
        path: 'messages.sender messages.receiver',
        select: 'nom prenom mail',
      });
  
      // Vérifier si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Retourner les messages de l'utilisateur
      res.status(200).json(user.messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async searchMessages(req, res) {
    try {
      const userId = req.id; // Récupérer l'ID de l'utilisateur à partir du token
      const { searchText, startDate, endDate, senderId } = req.query;

      // Construire un objet de recherche dynamique
      let query = { receiver: userId };

      if (searchText) {
        query.content = { $regex: searchText, $options: 'i' }; // Recherche de texte insensible à la casse
      }

      if (startDate || endDate) {
        query.timestamp = {};
        if (startDate) query.timestamp.$gte = new Date(startDate);
        if (endDate) query.timestamp.$lte = new Date(endDate);
      }

      if (senderId) {
        query.sender = senderId;
      }

      const messages = await User.find(query)
        .populate('sender', 'nom prenom mail')
        .populate('receiver', 'nom prenom mail');

      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Envoyer un message à un autre utilisateur
  static async sendMessage(req, res) {
    try {
      const { receiver, content } = req.body;
  
      // Vérifiez que l'utilisateur connecté (expéditeur) existe
      const sender = await User.findById(req.id);
      if (!sender) {
        return res.status(404).json({ message: 'Utilisateur expéditeur non trouvé' });
      }
  
      // Vérifiez que l'utilisateur destinataire existe
      const receiverUser = await User.findById(receiver);
      if (!receiverUser) {
        return res.status(404).json({ message: 'Utilisateur destinataire non trouvé' });
      }
  
      // Créer le message
      const message = {
        sender: sender._id,
        receiver: receiverUser._id,
        content: content,
        timestamp: new Date(),
      };
  
      // Ajouter le message aux deux utilisateurs
      sender.messages.push(message);
      receiverUser.messages.push(message);
  
      // Enregistrer les modifications
      await sender.save();
      await receiverUser.save();
  
      res.status(201).json({ message: 'Message envoyé avec succès' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

}

export default UserController;
