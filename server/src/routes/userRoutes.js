const express = require('express');

const UserController = require('../controllers/UserController');
const checkLoggedIn = require('../middlewares/checkLoggedIn');
const checkUserType = require('../middlewares/checkUserType');
const hasAuthScopes = require('../middlewares/hasAuthScopes');

const router = express.Router();

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Signup for a new account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/NewUser'
 *     responses:
 *       '200':
 *         description: User was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Success!
 *                 user:
 *                   $ref: '#components/schemas/User'
 */
router.post('/signup', UserController.signup);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in to your account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: john.doe@mail.utoronto.ca
 *                 format: email
 *               password:
 *                 type: string,
 *                 description: Password of the user
 *                 example: SecurePassword123!
 *                 format: password
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#components/schemas/User'
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /user/logout:
 *   post:
 *     responses:
 *       '200':
 *         description: Successfully logged you out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out!
 */
router.post('/logout', UserController.logout);

/**
 * @swagger
 * /user/info:
 *   get:
 *     summary: Get the info for the currently logged in user
 *     responses:
 *       '200':
 *         description: Successfully retrieved user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#components/schemas/User'
 *       '403':
 *         description: User is not logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Please sign in to access this route!
 */
router.get('/info', checkLoggedIn, UserController.getInfo);

router.post('/request-password-reset', UserController.requestPasswordReset);

router.post('/reset-password', UserController.resetPassword);

router.post('/verify-user-email', UserController.confirmUser);

router.post('/request-auth-scopes', checkLoggedIn, UserController.requestAuthScopes);

router.get(
  '/unapproved-users',
  checkLoggedIn,
  hasAuthScopes(['accounts:read']),
  UserController.getUnapprovedUsers,
);

router.get(
  '/all-auth-scopes',
  checkLoggedIn,
  hasAuthScopes(['accounts:read']),
  UserController.getUsersAuthScopes,
);

router.put('/update-info', UserController.updateInfo);

router.put('/unsubscribe', UserController.unsubscribeUser);

router.put('/resubscribe', checkLoggedIn, UserController.resubscribeUser);

router.put(
  '/account-statuses',
  checkLoggedIn,
  hasAuthScopes(['accounts:edit']),
  UserController.updateAccountStatuses,
);

router.put(
  '/auth-scopes',
  checkLoggedIn,
  hasAuthScopes(['accounts:edit']),
  UserController.updateAuthScopes,
);

router.get('/scunt-judge-users', UserController.getScuntJudgeUsers);
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the user to delete
 *     responses:
 *       '200':
 *         description: The user was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/FAQ'
 *       '403':
 *         $ref: '#components/responses/NotLoggedIn'
 */
router.delete('/:id', checkLoggedIn, hasAuthScopes(['accounts:delete']), UserController.deleteUser);

/**
 * @swagger
 * /user/user-exist:
 *   post:
 *     summary: Checks if a user with an email exists
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user
 *                 example: john.doe@mail.utoronto.ca
 *                 format: email
 *     responses:
 *       '200':
 *         description: Successfully found user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: number
 *                   description: is 1 if user exists
 *       '404':
 *          description: Did not find user
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  code:
 *                    type: number
 *                    description: is 0 user does not exists
 */
router.put('/user-exist', checkLoggedIn, checkUserType('frosh'), UserController.userExist);

/**
 * @swagger
 * /user/view-waiver:
 *   get:
 *     summary: Retrieves the waiver file for the authenticated user
 *     description: This endpoint retrieves the waiver file associated with the authenticated user. The user must be logged in to access this resource.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved the waiver file
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       '401':
 *         description: User not authenticated
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User not authenticated.
 *       '404':
 *         description: User or waiver file not found
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: User not found or No waiver found for this user.
 *       '500':
 *         description: Internal server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Error retrieving file.
 *     tags:
 *       - User
 */
router.get('/view-waiver/:id', checkLoggedIn, UserController.viewWaiver);

module.exports = router;
