import bcrypt from 'bcryptjs';
export default class Utils{
    static hashPassword(password) {
        return bcrypt.hashSync(password, 10);
    }

    static compPass(password, hashedPassword) {
        return bcrypt.compareSync(password, hashedPassword);
      }
}