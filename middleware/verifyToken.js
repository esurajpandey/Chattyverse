import jwt from 'jsonwebtoken';
import User from '../models/User.js';


export default async (req, resp, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // console.log("on B=vero", req.headers.authorization)
            token = req.headers.authorization.split(" ")[1];
            // console.log("token", process.env.SECRET_KEY);
            const decode = jwt.verify(token, `${process.env.SECRET_KEY}`);
            // console.log("decode", decode);
            req.user = await User.findById(decode.id).select("-password");//without password
            // console.log("user detaisl", req.user);
            next();

        } catch (err) {
            resp.status(401);
            throw "Not authorized, token failed"
        }
    }
}