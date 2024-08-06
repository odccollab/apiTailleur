
import validationSchemas from "../utils/SchemaValidation.js";
export default function validateData(key) {

    return (req, res, next) => {
      const schema = validationSchemas[key];
      
      if (!schema) {
        return res.status(400).json({ error:" No validation schema found for key: " +key});
      }
      // console.log(schema);
      
      const { error, value } = schema.validate(req.body);
      // console.log(error, value);
      
  
      if (error) {
        return res.status(400).json({ error: error.details[0] });
      }
      // console.log(req.body);
      
      next();
    };
  }