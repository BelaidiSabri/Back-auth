import User from "../models/User";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenManagment";
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';


export const registerUser = async (req, res) => {

    interface JwtPayload {
        id: string;
        fullName: string;
        role: string;
    }
    try {
        const { fullName, email, password, role } = req.body;
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('Email already in use.');
        }
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // Create a new user
        const user = new User({ fullName, email, password: hashedPassword, role });
        await user.save();
        // Optional: Generate Tokens if you want to log the user in immediately after registration
        const accessToken = generateAccessToken({ id: user.id, fullName: user.fullName, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id, role: user.role });
        // Set the refresh token in an HttpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });

        // Send the access token in the JSON response
        res.status(201).json({ user, accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in registration.');
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password,rememberMe } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            //return res.status(400).send('Invalid email or password.');
            return res.status(401).json({"success":false,"message":"Incorrect password.","error":"Password mismatch"});
        }

        // Check password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
//            return res.status(400).send('Invalid email or password.');
            return res.status(401).json({"success":false,"message":"Incorrect password.","error":"Password mismatch"});

        }

        // Generate Tokens
        const accessToken = generateAccessToken({ id: user.id, fullName: user.fullName, role: user.role });
        const refreshToken = generateRefreshToken({ id: user.id, role: user.role });
        // Set the refresh token in an HttpOnly cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            sameSite: 'strict',
            maxAge: rememberMe ? 24 * 60 * 60 * 1000 : null
        });

        // Send the access token in the JSON response
        res.json({
            user: {
              id: user.id,
              fullName: user.fullName,
              role: user.role
            },
            accessToken
          });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error in logging in user.');
    }
};

export const refreshAccessToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    console.log('cookies are :', refreshToken);
    
    if (!refreshToken) return res.status(401).json({ message: "Refresh Token is required!" });

    try {
        // Verify the refresh token
        const userData = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
        // Generate a new access token
        const newAccessToken = generateAccessToken({ id: userData.id, fullName: userData.fullName, role: userData.role });
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error(error);
        // Clear the refreshToken cookie
       // res.clearCookie('refreshToken');
        res.status(401).json({ message: "Invalid Refresh Token" });
    }
};


export const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true, secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        res.status(200).json({ message: 'Logged out successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to log out', error: 'Internal Server Error' })
    }
}

export const changePassword = async (req, res) => {
    const userId = req.user.id; // Ensured by authentication middleware
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const passwordIsValid = await bcrypt.compare(currentPassword, user.password);
        if (!passwordIsValid) {
            return res.status(403).send('Current password is incorrect');
        }

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedNewPassword;
        await user.save();

        res.send('Password updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// Additional endpoint for refreshing tokens can be added here.
