import express from 'express';
import { loginUser, logout, refreshAccessToken, registerUser } from '../controllers/authController';
import { getUserProfile } from '../controllers/userController';
import verifyToken from '../middlwares/authmiddlware';


const router = express.Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/refresh_token', refreshAccessToken); 

router.get('/profile', verifyToken, getUserProfile);

router.post('/logout', logout);




export default router;
