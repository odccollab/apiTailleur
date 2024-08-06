import { z } from 'zod';

userSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    type: z.string().min(1, 'Type is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long')
  });
class Validation{
   
      
       validateData = (schema, data) => {
          try {
            schema.parse(data);
            return { valid: true };
          } catch (e) {
            return { valid: false, errors: e.errors };
          }
        };
}

  const val=new Validation();

  // Utilisation du validateur
  const dataToValidate = {
    name: 'sididiop',
    email: 'alice@example.com',
    age: 30,
    type: 'admin',
    password: 'password123',
    confirmPassword: 'password12'
  };
  
  const result = val.validateData(userSchema, dataToValidate);
  
  if (result.valid) {
    console.log('Data is valid');
  } else {
    console.error('Validation errors:', result.errors[0].message);
  }
  
export default userSchema;