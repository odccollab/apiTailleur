import express from 'express';
import PostController from '../controllers/Post.js';
import CommentController from '../controllers/CommentController.js';
import ViewController from '../controllers/ViewController.js';



const router = express.Router();
router.get('/', PostController.getAllPosts);
router.get('/:id', PostController.getUserPosts);
router.get('/:userId/:postId', PostController.getOneUserPost);
router.get('/comment/:userId/:postId', PostController.getComment);
router.get('/like/:userId/:postId', PostController.getLike);
router.get('/numberlike/:userId/:postId', PostController.getNumberLike);



// Nouvelles routes pour les commentaires
router.post('/:postId/comment', CommentController.addComment);
router.get('/:postId/comment', CommentController.getComments); 



// Nouvelles routes pour les vues
router.post('/:postId/view', ViewController.incrementViews);
router.get('/:postId/views', ViewController.getViews);






export default router;
