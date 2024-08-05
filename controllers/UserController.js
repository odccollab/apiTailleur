import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  Utils  from '../utils/utils.js';
class UserController {
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static async createUser(req, res) {
    let { nom, prenom, role, password, telephone, mail ,passconfirm} = req.body;
    if (password!== passconfirm) {
      return res.status(400).send('Passwords do not match');
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
      res.status(500).send('Server Error');
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
      if (!user || Utils.compPass(password, user.password)) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
        expiresIn: '7h',
      });
      res.json({success:"connected", token });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  // Ajoutez d'autres méthodes du contrôleur ici
}

export default UserController;
