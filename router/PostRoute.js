import express from 'express';
import PostController from '../controllers/Post.js';

const router = express.Router();
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getUserPosts);
router.get('/:userId/:postId', PostController.getOneUserPost);
router.get('/comment/:userId/:postId', PostController.getComment);
router.get('/like/:userId/:postId', PostController.getLike);
router.get('/numberlike/:userId/:postId', PostController.getNumberLike);
// router.post('/post', PostController.createPost);
// router.put('/post/:id', PostController.updatePost);
// router.delete('/post/:id', PostController.deletePost);
// router.post('/post/comment/:userId/:postId', PostController.addComment);
// router.post('/post/like/:userId/:postId', PostController.addLike);
export default router;
