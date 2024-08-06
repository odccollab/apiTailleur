import Post from '../models/Post.js';

class ViewController {
  static async incrementViews(req, res) {
    const { postId } = req.params;

    try {
      const post = await Post.findByIdAndUpdate(
        postId,
        { $inc: { views: 1 } },
        { new: true }
      );

      if (!post) {
        return res.status(404).send('Post not found');
      }

      res.json({ views: post.views });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  static async getViews(req, res) {
    const { postId } = req.params;

    try {
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).send('Post not found');
      }

      res.json({ views: post.views });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
}

export default ViewController;