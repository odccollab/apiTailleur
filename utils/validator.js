import UserController from "../controllers/UserController";

// une classe validator qui permet de retourner des messages d'erreur pour tout les champs un seul validator pour le projet qui gere tout  
        // nom,
        // prenom,
        // role,
        // password,
        // telephone,
        // mail,
        // passconfirm
        
class Validator {
 
    static nom(nom) {
        if (!nom || nom.trim() === "") {
            return "Le nom est obligatoire";
        }
    }
    static prenom(prenom) {
        if (!prenom || prenom.trim() === "") {
            return "Le prénom est obligatoire";
        }
    }
    static role(role) {
        if (!role || role.trim() === "") {
            return "Le rôle est obligatoire";
        }
    }
    static password(password) {
        if (!password || password.trim() === "") {
            return "Le mot de passe est obligatoire";
        }
    }
    static telephone(telephone) {
        if (!telephone || telephone.trim() === "") {
            return "Le téléphone est obligatoire";
        }
    }
    static mail(mail) {
        if (!mail || mail.trim() === "") {
            return "L'adresse email est obligatoire";
        }
    }
    static passconfirm(passconfirm) {
        if (!passconfirm || passconfirm.trim() === "") {
            return "Le champ de confirmation du mot de passe est obligatoire";
        }
    }
    static confirmPassword(password, passconfirm) {
        if (password!== passconfirm) {
            return "Les mots de passe ne sont pas identiques";
        }
    }
    static validate(data, validators) {
        let errors = {};
        for (let field in validators) {
            errors[field] = validators[field](data[field]);
        }
        return errors;
    
    }

}


