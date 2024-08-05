import Post from "../models/PostRelease";

class CommentController {
    getComment(idUser, idPost){
        return Post.getComment(idUser, idPost);
    }
    addComment(idUser, idPost, newComment){
        Post.addComment(idUser, idPost, newComment);
    }
    deleteComment(idUser, idPost, idComment){
        Post.getComment(idUser, idPost).find(comment => comment.id === idComment).delete();
    }
    

}