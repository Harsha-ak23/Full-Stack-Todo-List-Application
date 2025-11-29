import express from 'express';
import { createTodoController, deleteTodoController, getTodoController, isCompletedTodoController, updateTodoController } from '../controllers/todo.controller';
import authMiddleware from '../middlewares/authMiddleware';

const todoRoutes = express.Router();

todoRoutes.get('/get',authMiddleware, getTodoController);
todoRoutes.post('/create', authMiddleware, createTodoController);
todoRoutes.put('/update/:id', authMiddleware, updateTodoController);
todoRoutes.put('/isCompleted/:id', authMiddleware, isCompletedTodoController);
todoRoutes.delete('/delete/:id', authMiddleware, deleteTodoController);


export default todoRoutes;