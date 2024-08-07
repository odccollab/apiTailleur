import Joi  from "joi";

const validationSchemas = {
    register: Joi.object({
        nom: Joi.string().required().messages({
          'string.base': 'Le nom doit être une chaîne de caractères',
          'string.empty': 'Le nom ne doit pas être vide',
          'any.required': 'Le champ nom est requis'
        }),
        mail: Joi.string().required().email().messages({
          'string.base': 'Le prénom doit être une chaîne de caractères',
          'string.empty': 'Le prénom ne doit pas être vide',
          'string.email': 'L\'email doit être valide'
        }),
        prenom: Joi.string().required().messages({
          'string.base': 'Le prénom doit être une chaîne de caractères',
          'string.empty': 'Le prénom ne doit pas être vide',
          'any.required': 'Le champ prénom est requis'
        }),
        
        telephone: Joi.string().optional().messages({
          'number.empty': 'Le numéro de téléphone ne doit pas être vide'
        }),
        type: Joi.string().required().messages({
          'string.base': 'Le rôle doit être une chaîne de caractères',
          'string.empty': 'Le rôle ne doit pas être vide'
        }),
        password: Joi.string().required().messages({
          'string.base': 'Le mot de passe doit être une chaîne de caractères',
          'string.empty': 'Le mot de passe ne doit pas être vide'
        }),
        passconfirm: Joi.string().required().messages({
          'string.base': 'Le mot de passe doit être une chaîne de caractères',
          'string.empty': 'Le mot de passe ne doit pas être vide'
        })
      }),
       login : Joi.object({
         
          mail: Joi.string().required().email().messages({
            'string.base': 'Le prénom doit être une chaîne de caractères',
            'string.empty': 'Le prénom ne doit pas être vide',
            'string.email': 'L\'email doit être valide'
          }),
          password: Joi.string().required().messages({
            'string.base': 'Le mot de passe doit être une chaîne de caractères',
            'string.empty': 'Le mot de passe ne doit pas être vide'
          }),
         
        }),
        post: Joi.object({
          contenu: Joi.string().required().messages({
            'string.base': 'Le contenu doit être une chaîne de caractères',
            'string.empty': 'Le contenu est obligatoire',
            'any.required': 'Le champ contenu est requis'
          }),
          contenuMedia: Joi.array().items(Joi.string().uri().regex(/\.(jpeg|jpg|gif|png|mp4|mov)$/)).optional().messages({
            'array.base': 'Le contenu média doit être un tableau',
            'array.includes': 'Le contenu média doit contenir des URLs valides de vidéos ou d\'images'
          }).default([])  // Default to an empty array if not provided
        })
         


};
export default validationSchemas;