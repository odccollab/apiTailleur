
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.js';
export default function CanPost(){
    return (req, res, next) => {
    try {
        let userid=req.id
        let user =  UserModel.findById(userid)
        if(!user) return res.status(404).json({error: 'User not found'})
        if(user.credit<1){
            return res.status(403).json({error: 'cannot continue this operation solde insufficient'})
        }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Access denied, token is invalid' });
    }
}
}