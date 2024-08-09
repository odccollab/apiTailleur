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

      const token = jwt.sign({ id: user._id,role:user.role }, SECRET_KEY, {
        expiresIn: '7h',
      });
      res.json({success:"connected", token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
  static async addFollower(req, res) {
    const { userId, followerId } = req.body;
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      user.followers.push(followerId);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
  

  static async addNotification(userId, notification) {
    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
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

  

}

export default UserController;
