import Joi from 'joi';

class Validation {
  constructor() {
    this.userSchema = Joi.object({
      nom: Joi.string().required().messages({
        'string.base': 'Le nom doit être une chaîne de caractères',
        'string.empty': 'Le nom ne doit pas être vide',
        'any.required': 'Le champ nom est requis'
      }),
      mail: Joi.string().when('$isRegistration', {
        is: true,
        then: Joi.string().email().required().messages({
          'string.base': 'Le nom doit être une chaîne de caractères',
          'string.min': 'Le nom doit contenir au moins 1 caractère',
          'any.required': 'Le nom est requis'
        }),
        otherwise: Joi.forbidden() // Interdit le champ 'name' pour la connexion
      }),
      prenom: Joi.string().required().messages({
        'string.base': 'Le prénom doit être une chaîne de caractères',
        'string.empty': 'Le prénom ne doit pas être vide',
        'any.required': 'Le champ prénom est requis'
      }),
      
      telephone: Joi.string().optional().messages({
        'number.empty': 'Le numéro de téléphone ne doit pas être vide'
      }),
      type: Joi.string().optional().messages({
        'string.base': 'Le rôle doit être une chaîne de caractères',
        'string.empty': 'Le rôle ne doit pas être vide'
      }),
      password: Joi.string().optional().messages({
        'string.base': 'Le mot de passe doit être une chaîne de caractères',
        'string.empty': 'Le mot de passe ne doit pas être vide'
      }),
      passconfirm: Joi.string().optional().messages({
        'string.base': 'Le mot de passe doit être une chaîne de caractères',
        'string.empty': 'Le mot de passe ne doit pas être vide'
      })
    });
  }

  validateUser(data) {
    const { error, value } = this.userSchema.validate(data, { abortEarly: false });
    if (error) {
      return { valid: false, errors: error.details };
    }
    return { valid: true, value };
  }


   validateAuth = (data, isRegistration) => {
    const { error, value } = this.userSchema.validate(data, {
      context: { isRegistration },
      abortEarly: false
    });
  
    if (error) {
      return { valid: false, errors: error.details };
    }
    return { valid: true, value };
  };
}

export default Validation;
