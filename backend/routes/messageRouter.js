import express from 'express';
import verifyToken from '../middleware/verifyToken.js'
import sendMessage from '../controllers/messages/sendMessage.js';
import allMessages from '../controllers/messages/allMessages.js';
const router = express.Router();

router.route('/').post(verifyToken, sendMessage);
router.route("/:chatId").get(verifyToken, allMessages);

export default router;