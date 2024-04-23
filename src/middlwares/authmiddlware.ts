import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;

    if (!accessTokenSecret) {
        console.error('ACCESS_TOKEN_SECRET is not set.');
        return res.status(500).send('Internal Server Error');
    }

    try {
        const decoded = jwt.verify(token, accessTokenSecret);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
};

export default verifyToken;
