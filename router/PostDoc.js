/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenu:
 *                 type: string
 *               contenuMedia:
 *                 type: string
 *             required:
 *               - contenu
 *               - contenuMedia
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Modify an existing post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenu:
 *                 type: string
 *               contenuMedia:
 *                 type: string
 *             required:
 *               - contenu
 *               - contenuMedia
 *     responses:
 *       200:
 *         description: Post modified successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /posts/status:
 *   get:
 *     summary: Get all status
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of status
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */

/**
 * @swagger
 * /posts/{postId}/comment:
 *   post:
 *     summary: Add a comment to a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 */

/**
 * @swagger
 * /posts/{postId}/comment:
 *   get:
 *     summary: Get all comments for a post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: A list of comments
 */

/**
 * @swagger
 * /posts/{postId}/comment/{commentId}:
 *   put:
 *     summary: Update a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 */

/**
 * @swagger
 * /posts/{postId}/comment/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The comment ID
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 */

/**
 * @swagger
 * /posts/createStory:
 *   post:
 *     summary: Create a new story
 *     tags: [Stories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenu:
 *                 type: string
 *               contenuMedia:
 *                 type: string
 *             required:
 *               - contenu
 *               - contenuMedia
 *     responses:
 *       201:
 *         description: Story created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /posts/{postId}/view:
 *   get:
 *     summary: Increment views for a post
 *     tags: [Views]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: View incremented successfully
 */

/**
 * @swagger
 * /posts/{postId}/views:
 *   get:
 *     summary: Get all views for a post
 *     tags: [Views]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: A list of views
 */

/**
 * @swagger
 * /posts/accueil:
 *   get:
 *     summary: Get all posts for the home page
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: A list of posts
 */

/**
 * @swagger
 * /posts/{type}/{idpost}:
 *   get:
 *     summary: Handle like or dislike for a post
 *     tags: [Likes/Dislikes]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of action (like/dislike)
 *       - in: path
 *         name: idpost
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       200:
 *         description: Action performed successfully
 */

/**
 * @swagger
 * /posts/share:
 *   post:
 *     summary: Share a post with a user
 *     tags: [Shares]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - postId
 *               - userId
 *     responses:
 *       201:
 *         description: Post shared successfully
 */

/**
 * @swagger
 * /posts/share/email:
 *   post:
 *     summary: Share a post via email
 *     tags: [Shares]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - postId
 *               - email
 *     responses:
 *       201:
 *         description: Post shared via email successfully
 */

/**
 * @swagger
 * /posts/share/facebook:
 *   post:
 *     summary: Share a post on Facebook
 *     tags: [Shares]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               facebookId:
 *                 type: string
 *             required:
 *               - postId
 *               - facebookId
 *     responses:
 *       201:
 *         description: Post shared on Facebook successfully
 */

/**
 * @swagger
 * /posts/share/whatsapp:
 *   post:
 *     summary: Share a post on WhatsApp
 *     tags: [Shares]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               whatsappNumber:
 *                 type: string
 *             required:
 *               - postId
 *               - whatsappNumber
 *     responses:
 *       201:
 *         description: Post shared on WhatsApp successfully
 */

/**
 * @swagger
 * /posts/signale:
 *   post:
 *     summary: Report a post
 *     tags: [Reports]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *               motif:
 *                 type: string
 *             required:
 *               - postId
 *               - reason
 *     responses:
 *       201:
 *         description: Post reported successfully
 */

/**
 * @swagger
 * /posts/find:
 *   get:
 *     summary: Search for a user or post
 *     tags: [Search]
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query
 *     responses:
 *       200:
 *         description: A list of users or posts
 */

export default router;
