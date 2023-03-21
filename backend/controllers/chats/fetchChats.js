import Chat from '../../models/chat.js';
import User from '../../models/User.js';

export default async (req, resp) => {
    try {
        // console.log("=================", req.user._id)

        const chats = await Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })

        const results = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "name,email,picture"
        });

        resp.status(200).send(results);
    } catch (err) {
        resp.status(500).send(err);
    }
}