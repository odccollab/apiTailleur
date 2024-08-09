import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export default class Middleware {
    static test = (req, res, next) => {
        try {
            console.log("Verifying token...");
            const token = req.header("Authorization").replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decoded.id);
            req.id = decoded.id;
            next();
        } catch (error) {
            res.status(401).json({ error: 'Access denied, token is invalid' });
        }
    }
    static whoru=(req,res,yokhl)=>{

        try{
            
            console.log(console.log(req.user));
            yokhl();
        }catch(error){
            res.status(401).json({error: 'Access denied, token is invalid'});
        }
    }
}
