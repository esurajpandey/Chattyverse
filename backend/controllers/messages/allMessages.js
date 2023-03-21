import User from "../../models/User.js";
import Message from '../../models/message.js';
import Chat from '../../models/chat.js';

export default async (req, resp) => {
    try {
        const chatId = req.params.chatId;

        const message = await Message.find({ chat: chatId }).populate("sender", "name picture email").populate("chat");

        resp.status(200).send(message);

    } catch (err) {
        resp.status(500).send(err);
    }
}