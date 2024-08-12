/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               role:
 *                 type: string
 *               password:
 *                 type: string
 *               image:
 *                 type: string
 *               telephone:
 *                 type: string
 *               mail:
 *                 type: string
 *               passconfirm:
 *                 type: string
 *             required:
 *               - nom
 *               - prenom
 *               - role
 *               - password
 *               - telephone
 *               - mail
 *               - passconfirm
 *               - image
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the profile of the connected user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/login2:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mail:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - mail
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/follow:
 *   post:
 *     summary: Add or remove a follower for a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               followedId:
 *                 type: string
 *             required:
 *               - followedId
 *     responses:
 *       200:
 *         description: Follower added or removed successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/followers:
 *   get:
 *     summary: List the followers of the connected user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Followers retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/followings:
 *   get:
 *     summary: List the users followed by the connected user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Followings retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/achatCredit:
 *   post:
 *     summary: Purchase credits for the user
 *     tags: [Credits]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *             required:
 *               - amount
 *     responses:
 *       200:
 *         description: Credits purchased successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/modifyProfile:
 *   post:
 *     summary: Change the profile to 'tailleur'
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Profile changed successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/favorite:
 *   post:
 *     summary: Add or remove a post from favorites
 *     tags: [Favorites]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               postId:
 *                 type: string
 *             required:
 *               - postId
 *     responses:
 *       200:
 *         description: Favorite added or removed successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/favorite:
 *   get:
 *     summary: List the favorite posts of the connected user
 *     tags: [Favorites]
 *     responses:
 *       200:
 *         description: Favorites retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/vote:
 *   post:
 *     summary: Add or remove a vote for a post
 *     tags: [Votes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               voteForUserId:
 *                 type: string
 *             required:
 *               - voteForUserId
 *     responses:
 *       200:
 *         description: Vote added or removed successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/messages:
 *   get:
 *     summary: Get messages for the connected user
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users/messages:
 *   post:
 *     summary: Send a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               receiver:
 *                 type: string
 *               content:
 *                 type: string
 *             required:
 *               - receiver
 *               - content
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/messages/search:
 *   get:
 *     summary: Search for messages
 *     tags: [Messages]
 *     parameters:
 *       - in: query
 *         name: searchText
 *         schema:
 *           type: string
 *         description: The text to search for
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date for filtering
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date for filtering
 *       - in: query
 *         name: senderId
 *         schema:
 *           type: string
 *         description: The ID of the message sender
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *       400:
 *         description: Bad request
 */

export default router;
