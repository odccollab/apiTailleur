import mongoose from 'mongoose';
const { Schema } = mongoose;
const notificationSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  read: {
    type: Boolean,
    default: false,
  },
});


const userSchema = new Schema({
  nom: {
    type: String,
    required: [true, "le champs est requis"]
  },
  prenom: String,
  role: String,
  password: String,
  telephone: { type: Number, unique: true },
  mail: { type: String, unique: true },
  votes: [
    {
      idVoteur: { type: Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  notifications: [notificationSchema],
  favoris: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  post: [// post represente les post partagés
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
  
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
