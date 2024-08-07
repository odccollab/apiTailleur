import Joi from 'joi';
import validationSchemas from "../utils/SchemaValidation.js";
class Validation {
  

  static validate(data, schema) {
    // console.log(validationSchemas);
    const schemas=validationSchemas[schema];
console.log(schemas.validate);
    if (!schemas || typeof schemas.validate !== 'function') {
      return "error";
      throw new Error('Le schéma fourni n\'est pas valide');
    }

    const { error, value } = schemas.validate(data, { abortEarly: false });

    if (error) {
      return { valid: false, errors: error.details };
    }
    return { valid: true, value };
  }
}

export default Validation;
