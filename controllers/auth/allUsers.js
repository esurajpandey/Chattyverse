import User from '../../models/User.js';
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, resp) => {
    console.log("Hello");
    const keyword = req.query.search ? {
        $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } }
        ]
    } : {};

    try {
        const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
        console.log(users);
        resp.status(200);
        resp.send(users);
    } catch (err) {
        console.log(err.message);
    }

});
