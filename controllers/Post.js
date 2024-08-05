import Post from "../models/PostRelease.js";

export default class PostController {
    static getAllPosts(req, res) {
        try {
            const posts = Post.getAll();
            res.json(posts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getUserPosts(req, res) {
        const { id } = req.params;
        try {
            const userPosts = Post.getUserPosts(parseInt(id));
            res.json(userPosts);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getComment(req, res) {
        const { userId, postId } = req.params;
        try {
            const comments = Post.getComment(parseInt(userId), parseInt(postId));
            res.json(comments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getLike(req, res) {
        const { userId, postId } = req.params;
        try {
            const likes = Post.getLike(parseInt(userId), parseInt(postId));
            res.json(likes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getNumberLike(req, res) {
        const { userId, postId } = req.params;
        try {
            const numberOfLikes = Post.getNumberLike(parseInt(userId), parseInt(postId));
            res.json({ numberOfLikes });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static getOneUserPost(req, res) {
        const { userId, postId } = req.params;
        try {
            const post = Post.getOneUserPost(parseInt(userId), parseInt(postId));
            res.json(post);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}
