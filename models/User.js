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
const messageSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const userSchema = new Schema({
  nom: {
    type: String,
    required: [true, "le champs est requis"]
  },
  prenom: String,
  type: String,
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
  credits:{ type:Number,default:3},
  sharedPosts: [{
    type: Schema.Types.ObjectId, ref: 'Post'
  }],
  messages: [messageSchema],
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
