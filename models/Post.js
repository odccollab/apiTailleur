import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  contenu: String,
  contenuMedia:[
          {url :String}
      ],
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
        type: String,
        idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ],
  signale: [
      {
        motif: String,
        idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ],

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
