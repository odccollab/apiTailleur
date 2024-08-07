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
}
export default postController;