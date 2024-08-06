import mongoose from 'mongoose';
const { Schema } = mongoose;
const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  contenu: String,
  contenuMedia:[
          {url :strings}
      ],
  comments: [
    {
      text :string,
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
