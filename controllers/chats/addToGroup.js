import asycnHandler from 'express-async-handler';
import Chat from '../../models/chat.js';

export default async (req, resp) => {
    const { chatId, userId } = req.body;
    console.log(chatId, userId);
    console.log("Hello");
    try {
        const added = await Chat.findByIdAndUpdate(chatId, {
            $push: { users: userId },
        }, { new: true })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        // console.log("added", added);
        if (!added) {
            resp.status(422);
            throw "Chat not found"
        } else {
            resp.status(200).send(added);
        }
    } catch (err) {
        resp.status(500).send(err.message);
    }
};