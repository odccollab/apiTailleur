import Joi from 'joi';

class Validation {
  constructor() {
    this.registerSchema = Joi.object({
      nom: Joi.string().required().messages({
        'string.base': 'Le nom doit être une chaîne de caractères',
        'string.empty': 'Le nom ne doit pas être vide',
        'any.required': 'Le champ nom est requis'
      }),
      mail: Joi.string().required().email().messages({
        'string.base': 'L\'email doit être une chaîne de caractères',
        'string.empty': 'L\'email ne doit pas être vide',
        'string.email': 'L\'email doit être valide'
      }),
      prenom: Joi.string().required().messages({
        'string.base': 'Le prénom doit être une chaîne de caractères',
        'string.empty': 'Le prénom ne doit pas être vide',
        'any.required': 'Le champ prénom est requis'
      }),
      telephone: Joi.string().optional().messages({
        'string.empty': 'Le numéro de téléphone ne doit pas être vide'
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
        'string.base': 'Le mot de passe de confirmation doit être une chaîne de caractères',
        'string.empty': 'Le mot de passe de confirmation ne doit pas être vide'
      })
    });

    this.loginSchema = Joi.object({
      mail: Joi.string().required().email().messages({
        'string.base': 'L\'email doit être une chaîne de caractères',
        'string.empty': 'L\'email ne doit pas être vide',
        'string.email': 'L\'email doit être valide'
      }),
      password: Joi.string().required().messages({
        'string.base': 'Le mot de passe doit être une chaîne de caractères',
        'string.empty': 'Le mot de passe ne doit pas être vide'
      })
    });
  }

  validate(data, schema) {
    // Assurez-vous que `schema` est bien un objet Joi valide
    if (!schema || typeof schema.validate !== 'function') {
      throw new Error('Le schéma fourni n\'est pas valide');
    }

    const { error, value } = schema.validate(data, { abortEarly: false });

    if (error) {
      return { valid: false, errors: error.details };
    }
    return { valid: true, value };
  }
}

export default Validation;
