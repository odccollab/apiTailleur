import User from '../models/User.js';
import Post from '../models/Post.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  Utils  from '../utils/utils.js';
import Validator from '../utils/Validator2.js'

class postController{
    
    //signaler un post postfindById
    static async signalPost(req, res) {
        const { motif,postId } = req.body;
        try {

        const userId=req.id;

          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).send("Vous n'etes pas connecté");
          }
          const post = Post.find((post) => post.id === postId);
          if (!post) {
            return res.status(404).send("Post not found");
          }

          if (Post.signale.some((signalement) => signalement.userId === userId)) {
            return res.status(400).send("Vous avez déjà signalé ce post");
          }
        Post.signale.push({userId,motif});

          await post.save();
          res.json({message:"signaler avec succés",Data:post});
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }

      //rechercher un user ou un post
      static async findUserOrPost(req, res) {
        const { id } = req.params;
        try {   
          const user = await User.findById(id);
          if (user) {
            return res.json(user);
          }
          const post = await Post.findById(id);
          if (post) {
            return res.json(post);
          }
          res.status(404).send("User or Post not found");

        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
      static async createPost(req, res) {
        const { contenu, contenuMedia } = req.body;
    
        try {
          const user = await User.findById(req.id); // Supposons que req.user.id contient l'ID de l'utilisateur connecté
          if (!user) {
            return res.status(404).send("User not found");
          }
    
          const post = await Post.create({
            contenu,
            userId: req.id,
            createdAt: new Date(),
            contenuMedia:contenuMedia
          });
    
          res.json(post);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }



      static async getAllPosts(req, res) {
        try {
          const posts = await Post.find({});
          res.json(posts);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      }

      static async getAllStatus(req, res) {
        try {
          const status = await Post.find({}, { _id: 1, contenu: 1, contenuMedia: 1, createdAt: 1 });
          res.json(status);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      }
    


  
   
      static async incrementViews(req, res) {
        const { postId, userId } = req.params;
    
        try {
          if (!mongoose.isValidObjectId(userId)) {
            return res.status(400).send('User is not a valid');
          }
          const user = await User.findById(userId);
          
          if (!user) {
            return res.status(404).send('User not found');
          }
    
          // Vérifier si l'utilisateur a déjà visionné le post
          const post = await Post.findById(postId);
          if (post.viewersIds.includes(userId)) {
            return res.json({ views: post.views });
          }
    
          // Incrémenter le nombre de vues et ajouter l'ID de l'utilisateur
          const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $inc: { views: 1 }, $addToSet: { viewersIds: userId } },
            { new: true }
          );
     
          res.json({ views: updatedPost.views });
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      }
    
      static async getViews(req, res) {
        const { postId } = req.params;
    
        try {
          const post = await Post.findById(postId);
          if (!post) {
            return res.status(404).send('Post not found');
          }
    
          res.json({ views: post.views, viewersIds: post.viewersIds });
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      } 



      static async addComment(req, res) {
        const { postId } = req.params;
    
        const { text } = req.body;
        const commenterId = req.id;
    
        try {
    
          // if (!mongoose.Types.ObjectId.isValid(postId)) {
          //   return res.status(400).send('Invalid post ID');
          // }
        
          // Continuer avec l'enregistrement du commentaire si le texte n'est pas vide
    
          const post = await Post.findById(postId);
          if (!post) {
            return res.status(404).send('Post not found');
          }
          if (!req.body.comment || !req.body.comment.text.trim()) {
            return res.status(400).json({ message: "Le texte du commentaire ne peut pas être vide" });
          }
    
          post.comments.push({
            text,
            commenterId
          });
    
          await post.save();
          res.json(post.comments);
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      }
    
      static async getComments(req, res) {
        const { postId } = req.params;
        try {
          // Appliquez le middleware verifyToken à cette route aussi
          const userId = req.userId; // L'ID de l'utilisateur connecté
    
          const post = await Post.findById(postId).populate('comments.commenterId', 'nom prenom');
          if (!post) {
            return res.status(404).send('Post not found');
          }
    
          // Ajoutez l'ID de l'utilisateur connecté à la réponse
          res.json({
            connectedUserId: userId,
            comments: post.comments
          });
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        }
      }
    
  
    
    static async deleteComment(req, res) {
      const { postId, commentId } = req.params;
  
      try {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).send('Post not found');
        }
  
        // Trouver le commentaire dans le tableau de commentaires du post
        const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);
        if (commentIndex === -1) {
          return res.status(404).send('Comment not found');
        }
  
        // Supprimer le commentaire du tableau
        post.comments.splice(commentIndex, 1);
        await post.save();
  
        res.json({ message: 'Comment deleted' });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  
  
    static async updateComment(req, res) {
      const { postId, commentId } = req.params;
      const { text } = req.body;
  
      try {
        const post = await Post.findById(postId);
        if (!post) {
          return res.status(404).send('Post not found');
        }
  
        // Trouver le commentaire dans le tableau de commentaires du post
        const commentIndex = post.comments.findIndex((comment) => comment._id.toString() === commentId);
        if (commentIndex === -1) {
          return res.status(404).send('Comment not found');
        }
  
        // Mettre à jour le texte du commentaire
        post.comments[commentIndex].text = text;
        post.comments[commentIndex].updatedAt = new Date();
        await post.save();
  
        res.json(post.comments[commentIndex]);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }

    }
  
export default postController;
