import express from 'express';
import accessChat from '../controllers/chats/accessChat.js';
import verifyToken from '../middleware/verifyToken.js'
import fetchChats from '../controllers/chats/fetchChats.js';
import createGroupChat from '../controllers/chats/createGroupChat.js';
import renameGroup from '../controllers/chats/renameGroup.js';
import addToGroup from '../controllers/chats/addToGroup.js';
import removeFromGroup from '../controllers/chats/removeFromGroup.js';

const router = express.Router();

router.route("/").post(verifyToken, accessChat).get(verifyToken, fetchChats);
router.route("/create-group").post(verifyToken, createGroupChat);
router.route("/rename-group").put(verifyToken, renameGroup);
router.route("/add-to-group").put(verifyToken, addToGroup);
router.route("/remove-from-group").put(verifyToken, removeFromGroup);

export default router;