import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Post from '../models/Post.js';
import Utils from '../utils/utils.js';
// import Validator from '../utils/Validator.js'
export default class UserController2 {


  static async createUser(req, res) {


    let { nom, prenom, role, password, telephone, mail, passconfirm } = req.body;

    if (password !== passconfirm) {
      return res.status(400).send('Les mots de passe ne correspondent pas');

    }
    password = Utils.hashPassword(password);
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

  //---------------------------------------favoris-----------------------------------------
  static async manageFavorites(req, res) {
    const { postId } = req.body;
    const userId = req.id; // Récupération de l'ID de l'utilisateur depuis le middleware d'authentification

    try {
      // Vérifier l'existence de l'utilisateur
      const user = await User.findById(userId);
      if (!user) {
        return res.status(400).send('Vous n\'êtes pas connecté');
      }

      // Vérifier l'existence du post
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send('Le post n\'existe pas');
      }

      // Vérifier si le post est déjà dans les favoris de l'utilisateur
      const postIndex = user.favoris.indexOf(postId);

      if (postIndex === -1) {
        // Le post n'est pas dans les favoris, donc on l'ajoute
        user.favoris.push(postId);
        await user.save();
        return res.json({ message: "Post ajouté aux favoris", data: user });
      } else {
        // Le post est déjà dans les favoris, donc on le supprime
        user.favoris.splice(postIndex, 1);
        await user.save();
        return res.json({ message: "Post retiré des favoris", data: user });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
  }

    //---------------------------------------Affichage Favoris-----------------------------------------
    static async getUserFavorites(req, res) {
      const userId = req.id; // Récupération de l'ID de l'utilisateur depuis le middleware d'authentification
    
      try {
        // Trouver l'utilisateur et ses favoris, en incluant les informations de l'utilisateur qui a publié chaque post favori
        const user = await User.findById(userId)
          .populate({
            path: 'favoris',
            populate: {
              path: 'userId',
              select: 'nom prenom'
            }
          });
    
        if (!user) {
          return res.status(400).send('Vous n\'êtes pas connecté');
        }
    
        res.json({ favorites: user.favoris });
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur du serveur');
      }
    }

  //---------------------------------------vote-----------------------------------------
  static async manageVotes(req, res) {
    const voteForUserId = req.body.voteForUserId;
    const userId = req.id; // Récupération de l'ID de l'utilisateur depuis le middleware d'authentification
  
    try {
      // Vérifier l'existence de l'utilisateur à voter
      const userToVote = await User.findById(voteForUserId);
      if (!userToVote) {
        return res.status(404).send('L\'utilisateur n\'existe pas');
      }
  
      // Vérifier que l'utilisateur ne vote pas pour lui-même
      if (userId === voteForUserId) {
        return res.status(400).send('Vous ne pouvez pas voter pour vous-même');
      }
  
      // Trouver l'index du vote dans le tableau de votes de l'utilisateur
      const user = await User.findById(userId);
      const voteIndex = user.votes.findIndex(vote => vote.idVoteur.equals(voteForUserId));
  
      if (voteIndex === -1) {
        // L'utilisateur n'a pas encore voté, donc on ajoute le vote
        user.votes.push({ idVoteur: voteForUserId });
        await user.save();
        return res.json({ message: "Vous avez voté pour cet utilisateur", data: user });
      } else {
        // L'utilisateur a déjà voté, donc on supprime le vote
        user.votes.splice(voteIndex, 1);
        await user.save();
        return res.json({ message: "Vous avez retiré votre vote", data: user });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
  }
}
