import express from 'express';
import { changePassword, loginUser, logout, refreshAccessToken, registerUser } from '../controllers/authController';
import { getUserProfile, updateUserProfile } from '../controllers/userController';
import verifyToken from '../middlwares/authmiddlware';


const router = express.Router();

router.post('/supplier/register', registerUser);

router.post('/user/signin', loginUser);

router.post('/user/refresh-token', refreshAccessToken); 

router.get('/user/profile', verifyToken, getUserProfile);

router.put('/user/profile', verifyToken, updateUserProfile);

router.post('/user/logout', logout);

router.post('/user/change-password',verifyToken, changePassword);





export default router;
