// Import necessary modules
import express from 'express';
const userRouter = express.Router();

// Import controllers
import { deleteUser, getAllUsers, signin, signout, signup, updateUser, updateUsernamePassword } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

// Define routes
userRouter.post('/signup', signup);
userRouter.post('/signin', signin);
userRouter.post('/signout', signout);
userRouter.get('/users', getAllUsers);
// Route to update a specific user
userRouter.put('/users/:id', updateUser);

// Route to delete a specific user
userRouter.delete('/users/:id', deleteUser);
// PUT update username and password (authenticated)
userRouter.put('/update-username-password', verifyToken, updateUsernamePassword);


// Export the router
export default userRouter;
