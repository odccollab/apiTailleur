import mongoose from 'mongoose';
const { Schema } = mongoose;
const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  contenu: String,
  contenuMedia: {
    type: [String], // Tableau de chaînes de caractères
    default: [],    // Par défaut, un tableau vide
  },


  comments: [
    {
      text :String,
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      commenterId: { type: Schema.Types.ObjectId, ref: 'User' },
      
    }
  ],
  likes: [
    {
      idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  dislikes: [
      {
        idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ],
  likesDislikes: [
      {
        type: { type: String, enum: ['like', 'dislike', 'neutre'] },
        idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ],
 
  signale: [
      {
        motif: String,
        idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ],
viewersIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  viewersIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  expireAt: { type: Date,default:null },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
