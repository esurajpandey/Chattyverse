import User from '../../models/User.js';

import asyncHandler from 'express-async-handler';
import generateToken from '../../utils/generateToken.js';

export default asyncHandler(async (req, resp) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        resp.status(400);
        throw "Required fields not be empty";
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
        resp.status(409);
        throw "User already exists";
    }
    const user = await User.create({
        name, email, password, picture: pic
    });

    if (user) {
        resp.status(201).send({
            _id: user?.id,
            name: user?.name,
            email: user?.name,
            token: generateToken({ id: user?.id }),
            picture: user?.picture
        });
    } else {
        resp.status(422);
        throw "Failed to create User";
    }
});