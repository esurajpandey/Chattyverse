import User from "../../models/User.js";
import Message from '../../models/message.js';
import Chat from '../../models/chat.js';

export default async (req, resp) => {
    try {
        const { content, chatId } = req.body;

        if (!content || !chatId) {
            console.log("Invalid data passed into message");
            resp.status(400);
            throw "Invalid request with empty field";
        }


        const newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId
        };

        let message = await Message.create(newMessage);

        message = await message.populate("sender", "name picture");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name picture email"
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        });
        resp.json(message);
    } catch (err) {
        console.log(err);
        resp.status(500).send(err.message)
    }
}