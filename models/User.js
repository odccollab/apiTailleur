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
<<<<<<< HEAD

=======
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
>>>>>>> bf354c3 (fonctionnalité message et partage sur la nouvelle branche)

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
<<<<<<< HEAD
  post: [// post represente les post partagés
    {
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }
  ],
=======
  sharedPosts: [{
    type: Schema.Types.ObjectId, ref: 'Post'
  }],
  messages: [messageSchema],

>>>>>>> bf354c3 (fonctionnalité message et partage sur la nouvelle branche)
  
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
