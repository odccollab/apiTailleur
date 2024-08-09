import UserModel from '../model/UserModel.js';

export const authMiddleware = async (req, res, next) => {
  try {
    const userId = req.header('userId');
    if (!userId) {
      throw new Error('Authentication error');
    }
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new Error('Authentication error');
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};
