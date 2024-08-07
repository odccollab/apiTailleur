import mongoose from 'mongoose';
const { Schema } = mongoose;

const postSchema = new Schema({
<<<<<<< Updated upstream
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
=======
<<<<<<< Updated upstream
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [
>>>>>>> Stashed changes
      {
        idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ],
  likesDislikes: [
      {
        type: String,
        idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
      }
<<<<<<< Updated upstream
    ],
  signale: [
      {
        motif: String,
        idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ],

=======
    ]
  });
  
  const Post = mongoose.model('Post', postSchema);
  export default Post;
  
=======
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  contenu: { type: String },
  contenuMedia: [
    { url: { type: String } }
  ],
  comments: [
    {
      text: { type: String },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      commenterId: { type: Schema.Types.ObjectId, ref: 'User' }
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
      type: { type: String },
      idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
    }
  ],
  signale: [
    {
      motif: { type: String },
      idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
    }
  ],
>>>>>>> Stashed changes
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
export default Post;
<<<<<<< Updated upstream
=======
>>>>>>> Stashed changes
>>>>>>> Stashed changes
