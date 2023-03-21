import asycnHandler from 'express-async-handler';
import Chat from '../../models/chat.js';

export default asycnHandler(async (req, resp) => {
    const { chatId, chatName } = req.body;
    console.log("InUpdate", req.body);
    if (!chatId || !chatName) {
        return resp.status(400).send("Required feilds are missing");
    }

    const updatedChat = await Chat.findByIdAndUpdate(chatId, {
        chatName
    }, { new: true })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChat) {
        resp.status(404); c
        throw "Chat not found"
    } else {
        resp.status(200).send(updatedChat);
    }
})