import express from 'express';
import  UserController from "../controllers/UserController.js";
import Middleware from '../middlewares/TestMiddleware.js';

const router = express.Router();


router.post('/users',  UserController.createUser);
router.get('/email/:email', UserController.findUserByEmail);
router.get('/email',Middleware.test, UserController.findUserByEmail2);
router.post('/login', UserController.loginUser);

// Vous pouvez ajouter d'autres routes ici

// router.get('/', UserController.getAllPosts);
// router.post('/login', UserController.login);
// router.post('/register', UserController.register);
// router.get('/profile', Middleware.test,UserController.getUser2);
// router.get('/:id/profile',Middleware.test,Middleware.test2, UserController.getUser);
// router.get('/:id/posts', UserController.getPosts);
// router.get('/:id/votes', UserController.getVotes);
// router.get('/:id/followers', UserController.getFollowers);
// router.get('/:id/following', UserController.getFollowing);
// router.post('/:userId/posts/:postId/comment', UserController.makeComment);
// router.post('/:userId/posts/:postId/like', UserController.makeLike);
// router.post('/:userId/follow/:followerId', UserController.followUser);
// router.delete('/:userId/unfollow/:followerId', UserController.unfollowUser);

export default router;