import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'
import rewardsRoutes from './routes/rewardRoutes.js';
import configRoutes from './routes/configRoutes.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import cors from 'cors';
import seedTransactions from "./seed/seedTransactions.js"


dotenv.config()
const port = process.env.PORT || 5000;

connectDB();
// seedTransactions();
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/rewards', rewardsRoutes);
app.use('/api/config', configRoutes)

app.get('/', (req, res) => res.send("server is ready"));

app.use(notFound);
app.use(errorHandler);

app.listen(port, ()=> console.log("server started on port: "+ port));