import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Validation from "../utils/Validator.js";
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
            // const token = req.headers.authorization.split(' ')[1];
            // jwt.verify(token,process.env.SECRET);
            const token = req.headers.authorization.split(' ')[1];
            jwt.verify(token,process.env.SECRET);
            yokhl();
        }catch(error){
            res.status(401).json({error: 'Access denied, token is invalid'});
        }
    }
    static Validate=(req,res,yokhl)=>{

        try{
            
            const urlSegments = req.path.split('/').filter(segment => segment);
            const key = urlSegments[urlSegments.length - 1];
            console.log(key+"Schema");
            console.log(req.body);
            let error = Validation.validate(req.body, key);
            console.log(error);
          
        }catch(error){
            res.status(401).json({error});
        }
    }
}
