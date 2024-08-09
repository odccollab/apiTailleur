import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  Utils  from '../utils/utils.js';
import Validator from '../utils/Validator2.js'
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
    try {
      const user = await User.findOne({ mail });
      if (!user || !Utils.compPass(password, user.password)) {
        return res.status(400).json({ message: 'Invalid credentials',password: Utils.compPass(password, user.password) });
      }
      const token = jwt.sign({ id: user._id,role:user.role }, process.env.SECRET_KEY, {
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
      const user = await User.findById(userId);
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

  static async addNotification(req, res) {
    const { userId, notification } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      user.notifications.push(notification);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
   // Récupérer tous les messages d'un utilisateur
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
