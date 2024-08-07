
import validationSchemas from "../utils/SchemaValidation.js";
export default function validateData(key) {

    return (req, res, next) => {
        console.log(req);
      const schema = validationSchemas[key];
      
      if (!schema) {
        return res.status(400).json({ error:" No validation schema found for key: " +key});
      }
      
      const { error, value } = schema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      req.body = value;
      next();
    };
  }