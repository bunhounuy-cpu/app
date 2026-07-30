import jwt from 'jsonwebtoken'


const generateToken = (payload) => {
    const secret = process.env.JWT_SECRET
    const options = {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    };

    return jwt.sign(payload, secret, options)
}

export default generateToken