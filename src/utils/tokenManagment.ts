import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const generateAccessToken = (user: { id: string; fullName: string; role: string }) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: '1min' });
}

export const generateRefreshToken = (user: { id: string; role: string; }) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!,{expiresIn:'60min'});
}
