import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  Utils  from '../utils/utils.js';
import Post from '../models/Post.js';
import Validator from '../utils/Validator2.js'

class postController{
    
    //signaler un post post
    static async signalPost(req, res) {
        const { userId, motif } = req.body;
        try {
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).send("User not found");
          }
          const post = post.find((post) => post.id === postId);
          if (!post) {
            return res.status(404).send("Post not found");
          }
          post.signale++;
          post.signale.push({userId,motif});
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
      static async addlike(req, res){
        const {postId} = req.params;
        const {userId} = req.decoded;
        try {
            const post = await Post.findById(postId);
            if (!post) {
                return res.status(404).send("Post not found");
            }
         
           //veririfier si userId est dans la table likes
            if(post.likes.includes(userId)){
                return res.status(400).send("vous avez déja liké ce post");
            }else
            console.log('breukh');
            //si non, ajouter userId à la table likes
            post.likes.push(userId);
            await post.save();
            res.json(post);
            
        } catch (err) {
            console.error(err.message);
            res.status(500).send("Server Error");
        }

       }
      


}
export default postController;
