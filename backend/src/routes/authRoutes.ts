import express from 'express';
import { loginUserController, createUserController } from '../controllers/auth.controller';

const authRouter = express.Router();

authRouter.post('/login', loginUserController );
authRouter.post('/signup', createUserController);

export default authRouter;