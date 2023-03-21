import asycnHandler from 'express-async-handler';
import Chat from '../../models/chat.js';
export default asycnHandler(async (req, resp) => {
    try {
        if (!req.body.users || !req.body.name) {
            return resp.status(400).send({ message: "Please fill all the feilds" });
        }

        const users = JSON.parse(req.body.users);

        if (users.length < 2) {
            return resp.status(400).send({ message: "Minimum 3 users are required to form a group chat" });
        }

        users.push(req.user);

        const group = await Chat.create({
            chatName: req.body.name,
            users: users,
            isGroupChat: true,
            groupAdmin: req.user
        });


        const groupChat = await Chat.findOne({ _id: group._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        resp.status(200).send(groupChat);
    } catch (err) {
        resp.status(503).send(err.message);
    }
})