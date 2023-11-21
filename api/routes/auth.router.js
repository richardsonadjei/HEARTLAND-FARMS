import express from 'express';
import { signin, signout, signup } from '../controllers/auth.controller.js';
import { verifyAdminToken } from '../utils/verifyAdmin.js';

const authRouter = express.Router();

authRouter.post("/signup",verifyAdminToken, signup);
authRouter.post("/signin", signin);
authRouter.post('/signout', signout);

export default authRouter;