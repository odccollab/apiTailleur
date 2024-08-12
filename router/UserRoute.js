import express from 'express';
import  UserController from "../controllers/UserController.js";
import UserController2 from "../controllers/UserController2.js";
import Middleware from '../middlewares/TestMiddleware.js';
import Validator from '../middlewares/ValidatorMiddleware.js';
import MiddlewareToken from '../middlewares/TokenMiddleware.js';
const router = express.Router();

//create User ça prend { nom, prenom, role, password, telephone, mail,passconfirm }
router.post('/create',Validator("register"),  UserController2.createUser);
//avoir profile du user connected
router.get('/profile',Middleware.test,Middleware.whoru, UserController.profile);
//login user ça prend { mail, password }
router.post('/login2',Validator("login"), UserController.loginUser);
 //ajouter ou enlever un follower pour un user ça prend  {  followedId }
router.post('/follow',MiddlewareToken(), UserController.addFollower);
//lister les followers du user connecté
router.get('/followers', MiddlewareToken(),UserController.getFollowers);
//lister les utilisateurs qui sont followés par le user connecté
router.get('/followings',MiddlewareToken(),UserController.getFollowings);
//achat credit  ça prend  {  amount }
router.post('/achatCredit', MiddlewareToken(), UserController.rechargerCompte);
//changer la tailleur  ça prend  rien 
router.post('/modifyProfile', MiddlewareToken(), UserController.ChangeEnTailleur)
//ajouter ou enlever favori ça prend { postId }
router.post('/favorite',MiddlewareToken(), UserController2.manageFavorites);
//lister les favoris du user connecté
router.get('/favorite',MiddlewareToken(), UserController2.getUserFavorites);
//ajouter ou enlever vote pour un post ça prend  {  voteForUserId }
router.post('/vote',MiddlewareToken(), UserController2.manageVotes);
//avoir les messages pour le user connecte
router.get('/messages', Middleware.test, UserController.getMessages);
//envoyer message  ça prend { receiver, content } 
router.post('/messages', Middleware.test, UserController.sendMessage);
//rechercher message  ça prend { searchText, startDate, endDate, senderId }
router.get('/messages/search', Middleware.test, UserController.searchMessages);
// router.get('/messages/:userId', Middleware.test, UserController.getMessagesByUserId);



export default router;      
