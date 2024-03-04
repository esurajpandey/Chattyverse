import asycnHandler from 'express-async-handler';
import Chat from '../../models/chat.js';
import User from '../../models/User.js';

export default asycnHandler(async (req, resp) => {
    const { chatId, userId } = req.body;
    try {
        const removed = await Chat.findByIdAndUpdate(chatId, {
            $pull: { users: userId },
        }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");


        if (!removed) {
            resp.status(422);
            throw "Chat not found"
        } else {
            resp.status(200).send(removed);
        }
    } catch (err) {
        resp.status(500).send(err.message);
    }
});