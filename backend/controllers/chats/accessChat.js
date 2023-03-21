import asycnHandler from 'express-async-handler';
import Chat from '../../models/chat.js';
import User from '../../models/User.js';

export default asycnHandler(async (req, resp) => {
    const { userId } = req.body;

    if (!userId) {
        resp.status(400);
        throw "UsedId not sent with request";
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            { users: { $elemMatch: { $eq: req.user._id } } },
            { users: { $elemMatch: { $eq: userId } } }
        ]
    }).populate("users", "-password")
        .populate("latestMessage");


    isChat = await User.populate(isChat, {
        path: "lastestMessage.sender",
        select: "name picture email"
    });

    if (isChat.length > 0) {
        resp.status(200).send(isChat[0])

    } else {
        //create new chat

        const chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId],
        }


        try {
            const createdChat = await Chat.create(chatData);
            // console.log("Chat created", createdChat);
            const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "-password");
            resp.status(200).send(fullChat);
        } catch (err) {
            console.log(err);
            resp.status(500).send(err.message);
        }
    }

})