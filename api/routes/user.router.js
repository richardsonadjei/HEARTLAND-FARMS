import express from 'express';
import {  updateProfile } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const profileRouter = express.Router();

// Update user profile (userName and email)
profileRouter.put('/update/:id', verifyToken, updateProfile);

export default profileRouter;
