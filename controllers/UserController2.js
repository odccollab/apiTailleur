import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import  Utils  from '../utils/utils.js';
import Validator from '../utils/Validator.js'
export default class UserController2 {


    static async createUser(req, res) {
        let validated=new Validator()
        const { valid, errors } = validated.validate(req.body,"registerSchema") ;

        if (!valid) return res.status(400).json({ errors });

        let { nom, prenom, role, password, telephone, mail, passconfirm } = req.body;
        if(!mail){
            return res.status(400).json({errors:[{message:'L\'adresse email est requise'}]});
        }
        if (password!== passconfirm) {
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
}