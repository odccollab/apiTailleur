import User from '../models/User.js';
import Post from '../models/Post.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  Utils  from '../utils/utils.js';
import Validator from '../utils/Validator2.js'
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';

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
  //signaler un post postfindById
  static async signalPost(req, res) {
    const { motif, postId } = req.body;
    try {

      const userId = req.id;

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
      Post.signale.push({ userId, motif });

      await post.save();
      res.json({ message: "signaler avec succés", Data: post });
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
        contenuMedia: contenuMedia
      });

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }


  static async sharePost(req, res) {
    const { postId, userIds } = req.body;

    if (!mongoose.Types.ObjectId.isValid(postId) || !userIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).send({ error: 'Invalid postId or userIds' });
    }

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send({ error: 'Post not found' });
      }

      for (const userId of userIds) {
        await User.findByIdAndUpdate(userId, { $push: { sharedPosts: post._id } });
      }

      res.status(200).send({ message: 'Post shared successfully' });
    } catch (error) {
      res.status(500).send(error);
    }
  }
  static async shareByEmail(req, res) {
    try {
      const { postId, email } = req.body;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post non trouvé' });
      }

      // Configurer le transporteur (transporter) Nodemailer
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER, // Votre adresse e-mail
          pass: process.env.EMAIL_PASS, // Votre mot de passe d'application
        },
      });

      // Configurer l'e-mail
      let mailOptions = {
        from: process.env.EMAIL_USER, // Adresse e-mail de l'expéditeur
        to: email, // Adresse e-mail du destinataire
        subject: `Découvrez ce post !`,
        text: `Je trouve ce post intéressant, jetez un œil : ${post.contenu} \nLien: ${process.env.BASE_URL}/posts/${postId}`,
      };

      // Envoyer l'e-mail
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
        res.status(200).json({ message: 'E-mail envoyé avec succès' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


  // Partager un post sur Facebook
  static async shareOnFacebook(req, res) {
    try {
      const { postId } = req.body;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post non trouvé' });
      }

      const postUrl = `${process.env.BASE_URL}/posts/${postId}`;
      const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;

      res.json({ link: facebookShareLink });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Partager un post sur WhatsApp
  static async shareOnWhatsApp(req, res) {
    try {
      const { postId } = req.body;
      const post = await Post.findById(postId);

      if (!post) {
        return res.status(404).json({ message: 'Post non trouvé' });
      }

      const message = `Découvrez ce post intéressant : ${post.contenu} \nLien: ${process.env.BASE_URL}/post/${postId}`;
      const whatsappShareLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

      res.json({ link: whatsappShareLink });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
export default postController;