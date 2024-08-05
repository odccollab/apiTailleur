import mongoose from 'mongoose';
const { Schema } = mongoose;

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
  ]
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
