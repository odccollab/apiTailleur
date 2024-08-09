
import validationSchemas from "../utils/SchemaValidation.js";
export default function validateData(key) {

    return (req, res, next) => {
      const schema = validationSchemas[key];
      
      if (!schema) {
        return res.status(400).json({ error:" No validation schema found for key: " +key});
      }
      console.log(req.id,"iiiiz");
      
      const { error, value } = schema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      req.body = value;
      next();
    };
  }