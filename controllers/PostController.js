import User from '../models/User.js';
import Post from '../models/Post.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  Utils  from '../utils/utils.js';
import Validator from '../utils/Validator2.js'
import UserController from './UserController.js';

class postController{
    
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
          user.credits -= 1;
          await user.save();

          res.json(post);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
    
      static async createStory(req, res) {
        const { contenu, contenuMedia } = req.body;
      
        try {
          const user = await User.findById(req.id); // Supposons que req.id contient l'ID de l'utilisateur connecté
          if (!user) {
            return res.status(404).send("User not found");
          }
      
          const expireAt = new Date();
          expireAt.setHours(expireAt.getHours() + 24);
      
          const post = await Post.create({
            contenu,
            userId: req.id,
            createdAt: new Date(),
            contenuMedia,
            expireAt
          });
      UserController.addNotification(req.id,{
        type: "story",
        message: `vous avez creer un nouveau post`,
      })
          user.credits -= 1;
          await user.save();
      console.log("dkkdjkdks");
          res.json(post);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
      static async  deleteStoryExpire() {
        try {
          const now = new Date();
          const result = await Post.deleteMany({ expireAt: { $lte: now } });
          console.log(`Expired stories deleted: ${result.deletedCount}`);
        } catch (err) {
          console.error('Error deleting expired stories:', err);
        }
      }
      static async handleLikeDislike(req, res) {
        const { type, idpost } = req.params; 
        const userId = req.id; 
    
        if (!['like', 'dislike', 'neutre'].includes(type)) {
          return res.status(400).send("Invalid type");
        }
    
        try {
          const post = await Post.findById(idpost);
          if (!post) {
            return res.status(404).send("Post not found");
          }
    
          const existingEntry = post.likesDislikes.find(entry => entry.idLikerD == userId);
          if (existingEntry) {
            if (type === 'neutre') {
              post.likesDislikes = post.likesDislikes.filter(entry => entry.idLikerD.toString() != userId);
            } else {
              existingEntry.type = type;
            }
          } else if (type !== 'neutre') {
            console.log("djshdj");
            post.likesDislikes.push({ type:type, idLikerD: req.id });
          }
    
          await post.save();
          res.json(post);
        } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
        }
      }
      static async fileActu(req, res) {
        const userId = req.id;
    
        try {
            let posts = await Post.find({ expireAt: null })
                .sort({ createdAt: -1 })
                .populate('userId', 'nom prenom photo')  
                .lean();
    
            let stories = await Post.find({ expireAt: { $ne: null } })
                .sort({ expireAt: -1 })
                .populate('userId', 'nom prenom photo')
                .lean();
    
            if (!userId) {
                return res.json({ posts, stories });
            }
    
            const sortedPosts = posts.toSorted((a, b) => {
                const aSeen = a.viewersIds.includes(userId);
                const bSeen = b.viewersIds.includes(userId);
    
                if (aSeen && !bSeen) return 1;
                if (!aSeen && bSeen) return -1;
                return 0;
            });
    
            const sortedStories = stories.toSorted((a, b) => {
                const aSeen = a.viewersIds.includes(userId);
                const bSeen = b.viewersIds.includes(userId);
    
                if (aSeen && !bSeen) return 1;
                if (!aSeen && bSeen) return -1;
                return 0;
            });
    
            
            res.json({ posts: sortedPosts, stories: sortedStories });
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }
    }
    
    static async modifyPost(req, res) {
      const { id } = req.params;
      if (!mongoose.isValidObjectId(id)) {
        return res.status(400).send('id is not a valid');
      }

      const { contenu, contenuMedia } = req.body;
  
      try {
          let post = await Post.findOne({ _id: id, expireAt: null });
  
          if (!post) {
              return res.status(404).send("Post not found or it's a story");
          }
  
          post.contenu = contenu || post.contenu;
          post.contenuMedia = contenuMedia || post.contenuMedia;
  
          await post.save();
  
          res.json(post);
      } catch (err) {
          console.error(err.message);
          res.status(500).send("Server Error");
      }
  }
  static async deletePost(req, res) {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).send('User is not a valid');
    }
    try {
        const post = await Post.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).send("Post not found");
        }

        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}



  
    
    
      
}
export default postController;