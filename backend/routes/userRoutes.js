import express from 'express';
import allUsers from '../controllers/auth/allUsers.js';
import createUser from '../controllers/auth/createUser.js';
import loginUser from '../controllers/auth/loginUser.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();


router.route('/login').post(loginUser);
router.route('/user').post(createUser).get(verifyToken, allUsers);

export default router;