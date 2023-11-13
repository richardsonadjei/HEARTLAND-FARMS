import express from 'express';
import {  getAllUsers, updateProfile, updateUserDetails } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { verifyAdminToken } from '../utils/verifyAdmin.js';


const profileRouter = express.Router();

// Update user profile (userName and email)
profileRouter.put('/update/:id', verifyToken, updateProfile);

profileRouter.get('/users', verifyAdminToken, getAllUsers);
profileRouter.put('/users/:id', verifyAdminToken, updateUserDetails);

export default profileRouter;
