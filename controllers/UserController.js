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
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      user.followers.push(followerId);
      await user.save();
      res.json(user);
    } catch (err) {
      // console.error(err.message);
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
  

}

export default UserController;
