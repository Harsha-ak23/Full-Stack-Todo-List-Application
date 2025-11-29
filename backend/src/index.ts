import express from 'express';
import dotenv from 'dotenv';
import morgan from "morgan";
import connectDB from './config/db';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';
import errorHandler from './middlewares/errorHandler';
import todoRoutes from './routes/todoRoutes';
import cors from 'cors';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({origin: 'http://localhost:5173',
  credentials: true,}));

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', todoRoutes);


app.use(errorHandler);

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  });