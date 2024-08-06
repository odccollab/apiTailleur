import Post from '../models/Post.js';

class CommentController {
  static async addComment(req, res) {
    const { postId } = req.params;
    const { text } = req.body;
    const commenterId = req.id;

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send('Post not found');
      }

      post.comments.push({
        text,
        commenterId
      });

      await post.save();
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  static async getComments(req, res) {
    const { postId } = req.params;
    try {
      const post = await Post.findById(postId).populate('comments.commenterId', 'nom prenom');
      if (!post) {
        return res.status(404).send('Post not found');
      }
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  // Ajoutez d'autres méthodes liées aux commentaires si nécessaire
}

export default CommentController;