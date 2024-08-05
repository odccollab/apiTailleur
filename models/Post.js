const postSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [
      {
        commenterId: { type: Schema.Types.ObjectId, ref: 'User' },
        commenterNom: String,
        commenterPrenom: String,
        commenterTelephone: Number,
        commenterMail: String
      }
    ],
    likes: [
      {
        type: String,
        idLikerD: { type: Schema.Types.ObjectId, ref: 'User' }
      }
    ]
  });
  
  const Post = mongoose.model('Post', postSchema);
  export default Post;
  