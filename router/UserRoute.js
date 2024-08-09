import express from 'express';
import  UserController from "../controllers/UserController.js";
import UserController2 from "../controllers/UserController2.js";
import Middleware from '../middlewares/TestMiddleware.js';
import Validator from '../middlewares/ValidatorMiddleware.js';
import token from '../middlewares/TokenMiddleware.js';
import MiddlewareToken from '../middlewares/TokenMiddleware.js';
const router = express.Router();
router.post('/users', UserController.createUser);
router.get('/email/:email',UserController.findUserByEmail);
router.get('/email',Middleware.test,Middleware.whoru, UserController.findUserByEmail2);
router.post('/login2',Validator("login"), UserController.loginUser);
router.post('/login',UserController.loginUser);
router.post('/create',Validator("register"),  UserController2.createUser);
router.post('/favorite',token(), UserController2.manageFavorites);
router.get('/favorite',token(), UserController2.getUserFavorites);
router.post('/vote',token(), UserController2.manageVotes);
 router.post('/login',Middleware.Validate,UserController.loginUser);
 router.post('/create',Validator("register"),  UserController2.createUser);
 router.post('/achatCredit', MiddlewareToken(), UserController.rechargerCompte);
 router.post('/modifyProfile', MiddlewareToken(), UserController.ChangeEnTailleur)




export default router;