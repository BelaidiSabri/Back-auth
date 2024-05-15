import express from 'express';
import { changePassword, loginUser, logout, refreshAccessToken, registerUser } from '../controllers/authController';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import verifyToken from '../middlwares/authmiddlware';


const router = express.Router();

router.post('/register', registerUser);

router.post('/signin', loginUser);

router.post('/refresh-token', refreshAccessToken); 

router.get('/profile', verifyToken, getUserProfile);

router.put('/profile', verifyToken, updateUserProfile);

router.post('/logout', logout);

router.post('/change-password',verifyToken, changePassword);





export default router;
