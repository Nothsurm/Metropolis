import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
    const token = jwt.sign({userId}, process.env.VITE_JWT_SECRET, {expiresIn: '30d'});

    //Set JWT as an http-only cookie
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.VITE_NODE_ENV === 'development',
        sameSite: 'strict',
        maxAge: 30* 24 * 60 * 60 * 1000
    })

    return token
};

export default generateToken;