import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
    mongoose.connect(process.env.MONGO_URL)
      .then(() => {
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error: ', err);
      });
  }
}

export default new Database();
