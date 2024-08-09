import express from 'express';
import PostController from '../controllers/PostController.js';
import MiddlewareToken from  '../middlewares/TokenMiddleware.js';
import Validator from '../middlewares/ValidatorMiddleware.js';
import CanPost from '../middlewares/CanPostMiddleware.js';


const router = express.Router();
// router.get('/', PostController.getAllPosts);
// router.get('/:id', PostController.getUserPosts);
// router.get('/:userId/:postId', PostController.getOneUserPost);
// router.get('/comment/:userId/:postId', PostController.getComment);
// router.get('/like/:userId/:postId', PostController.getLike);
// router.get('/numberlike/:userId/:postId', PostController.getNumberLike);

// router.post('/post', PostController.createPost);
// router.put('/post/:id', PostController.updatePost);
// router.delete('/post/:id', PostController.deletePost);
// router.post('/post/comment/:userId/:postId', PostController.addComment);
// router.post('/post/like/:userId/:postId', PostController.addLike);
router.post('/create',MiddlewareToken(),Validator("post"), CanPost(),PostController.createPost);
router.post('/createStory',MiddlewareToken(),Validator("post"),CanPost(), PostController.createStory);
router.get('/:type/:idpost',MiddlewareToken(), PostController.handleLikeDislike);
// router.get('/postsc',MiddlewareToken(), PostController.allPost);
// router.get('/posts', PostController.allPost);
router.put('/:id',MiddlewareToken(),Validator("post"), PostController.modifyPost);
router.delete('/:id',MiddlewareToken(), PostController.deletePost);
router.get('/accueil',MiddlewareToken(),PostController.fileActu)

export default router;
