// Import necessary modules
import express from 'express';
const userRouter = express.Router();

// Import controllers
import { signin, signout, signup } from '../controllers/user.controller.js';

// Define routes
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.post('/signout', signout);

// Export the router
export default userRouter;
