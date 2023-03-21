import User from "../../models/User.js"
import generateToken from "../../utils/generateToken.js";
import asyncHandler from 'express-async-handler';

export default asyncHandler(async (req, resp) => {
    const { email, password } = req.body;

    if (!email || !password) {
        resp.status(400);
        throw "Required field is missing";
    }

    const user = await User.findOne({ email });

    if (!user) {
        resp.status(404);
        throw "User doesn't exists in database";
    }


    if (user?.password === password) {
        resp.status(200).send({
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            picture: user?.picture,
            token: generateToken({ id: user?.id })
        });
    } else {
        resp.status(401).send({
            message: "Invalid credentials"
        });
    }
})