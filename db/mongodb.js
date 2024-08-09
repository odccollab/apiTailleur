import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class Database {
  constructor() {
    this._connect();
  }

  _connect() {
<<<<<<< HEAD
    mongoose.connect(process.env.MONGO_URL1)
      .then(() => {
=======
    mongoose.connect(process.env.MONGO_URL)
      .then(() => {
        dbName:"apiTailleur"
>>>>>>> bf354c3 (fonctionnalité message et partage sur la nouvelle branche)
        console.log('Database connection successful');
      })
      .catch(err => {
        console.error('Database connection error: ', err);
      });
  }
}

export default new Database();
<<<<<<< HEAD
=======
// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// dotenv.config();

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URL, {

//             dbName: "apiTailleur"  // 

//         });

//         console.log('MongoDB connected');
//     } catch (error) {
//         console.error('Error connecting to MongoDB:', error.message);
//     }
// };

// export default connectDB;
>>>>>>> bf354c3 (fonctionnalité message et partage sur la nouvelle branche)
