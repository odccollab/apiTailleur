import express from 'express';
import PostController from '../controllers/Post.js';
import PostController from '../controllers/PostController.js';
import validateData from '../middlewares/ValidatorMiddleware.js';
import verifyToken from '../middlewares/TokenMiddleware.js';
import postController from '../controllers/PostController.js';


import MiddlewareToken from  '../middlewares/TokenMiddleware.js';
import Validator from '../middlewares/ValidatorMiddleware.js';
import CanPost from '../middlewares/CanPostMiddleware.js';


const router = express.Router();

// router.get('/:id', PostController.getUserPosts);
// router.get('/:userId/:postId', PostController.getOneUserPost);
// router.get('/comment/:userId/:postId', PostController.getComment);
// router.get('/like/:userId/:postId', PostController.getLike);
// router.get('/numberlike/:userId/:postId', PostController.getNumberLike);

router.get('/status', PostController.getAllStatus);

// Nouvelles routes pour les commentaires
router.post('/:postId/comment',verifyToken(), validateData('comment'), postController.addComment);
router.get('/:postId/comment', postController.getComments); 



// Nouvelles routes pour les vues
// router.post('/:postId/view', ViewController.incrementViews);
router.post('/:postId/view/:userId',verifyToken(), postController.incrementViews);
router.get('/:postId/views',verifyToken(), PostController.getViews);
router.get('/create', validateData("post"), PostController.createPost);

router.delete('/:postId/comment/:commentId', PostController.deleteComment);
router.put('/:postId/comment/:commentId', PostController.updateComment);




router.post('/create',MiddlewareToken(),Validator("post"), CanPost(),PostController.createPost);
router.post('/createStory',MiddlewareToken(),Validator("post"),CanPost(), PostController.createStory);
router.get('/:type/:idpost',MiddlewareToken(), PostController.handleLikeDislike);
// router.get('/postsc',MiddlewareToken(), PostController.allPost);
// router.get('/posts', PostController.allPost);
router.put('/:id',MiddlewareToken(),Validator("post"), PostController.modifyPost);
router.delete('/:id',MiddlewareToken(), PostController.deletePost);
router.get('/accueil',MiddlewareToken(),PostController.fileActu)

router.post('/create',MiddlewareToken(),Validator("post"), PostController.createPost);
router.post('/share', PostController.sharePost);
router.post('/share/email', PostController.shareByEmail);
router.post('/share/facebook', PostController.shareOnFacebook);
router.post('/share/whatsapp', PostController.shareOnWhatsApp);
export default router;
