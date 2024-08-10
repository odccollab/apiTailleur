import jwt from 'jsonwebtoken';
export default function verifyToken(){
    return (req, res, next) => {
    try {
        console.log("Verifying token...");
        const token = req.header("Authorization")?.replace('Bearer ', '');
        // console.log(token);
       
        if (!token) {
        return res.status(401).json({ error: 'No token provided' });
        }
            
        const decoded = jwt.verify(token, process.env.SECRET_KEY);      
        console.log(decoded.id);
         req.id = decoded.id;
         req.nom=decoded.nom;
         req.prenom=decoded.prenom;
         req.image=decoded.image;
          // Vous pouvez utiliser req.userId si vous préférez
        next();
    } catch (error) {
        res.status(401).json({ error: 'Access denied, token is invalid' });
    }
}
}
