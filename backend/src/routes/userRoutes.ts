import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { getUserController, updateUserController, logOutController } from '../controllers/user.controller';

const userRouter = express.Router();

userRouter.get('/get', authMiddleware, getUserController );
userRouter.put('/update', authMiddleware,updateUserController );
userRouter.post('/logout', authMiddleware, logOutController )

export default userRouter;