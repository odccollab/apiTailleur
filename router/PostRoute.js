import express from 'express';
import PostController from '../controllers/PostController.js';
import validateData from '../middlewares/ValidatorMiddleware.js';
import verifyToken from '../middlewares/TokenMiddleware.js';
import postController from '../controllers/PostController.js';


import MiddlewareToken from  '../middlewares/TokenMiddleware.js';
import Validator from '../middlewares/ValidatorMiddleware.js';
import CanPost from '../middlewares/CanPostMiddleware.js';



const router = express.Router();
// creer un post les variable requis { contenu, contenuMedia }

router.post('/create',MiddlewareToken(),Validator("post"), CanPost(),PostController.createPost);
//modifier un post les variable requis { contenu, contenuMedia }
router.put('/:id',MiddlewareToken(),Validator("post"), PostController.modifyPost);
//recuperer tous les status 
router.get('/status', PostController.getAllStatus);
//delete a post
router.delete('/:id',MiddlewareToken(), PostController.deletePost);
//commentaire
//ajouter un commentaire les variable requis 
// const { postId, commentId } = req.params;
//     const { text } = req.body;
router.post('/:postId/comment', verifyToken(), validateData('comment'), postController.addComment);
//recuperer tous les commentaires d'un post 
router.get('/:postId/comment', postController.getComments);
//modifier un commentaire  
// const { postId, commentId } = req.params;
//     const { text } = req.body;
router.put('/:postId/comment/:commentId',validateData('comment'), PostController.updateComment);
//supprimer un commentaire 
router.delete('/:postId/comment/:commentId', PostController.deleteComment);
//story 
router.post('/createStory',MiddlewareToken(),Validator("post"),CanPost(), PostController.createStory);


// Nouvelles routes pour les vues 
router.get('/:postId/view',verifyToken(), postController.incrementViews);
//voilr les vue d'un post 
router.get('/:postId/views',verifyToken(), PostController.getViews);
//file actu 
router.get('/accueil',MiddlewareToken(),PostController.fileActu)


//liker dislike
router.get('/:type/:idpost',MiddlewareToken(), PostController.handleLikeDislike);

//partage post a un user de l'appli
router.post('/share', PostController.sharePost);
//partage post a un user via email, facebook, whatsapp
router.post('/share/email', PostController.shareByEmail);
router.post('/share/facebook', PostController.shareOnFacebook);
router.post('/share/whatsapp', PostController.shareOnWhatsApp);
//signale un use
 router.post('/signale',MiddlewareToken(), PostController.signalPost);
 //recherche utilisateur ou post ça prend  {value}
 router.get('/find', PostController.findUserOrPost);

export default router;
