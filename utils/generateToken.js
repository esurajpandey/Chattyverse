import jwt from 'jsonwebtoken';

export default (data) => {
    return jwt.sign(data, process.env.SECRET_KEY, {
        expiresIn: "30d"
    })
}   