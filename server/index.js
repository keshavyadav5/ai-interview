import express from 'express';
import dotenv from 'dotenv';
dotenv.config();   
import connectDb from './config/db.js';
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import interviewRouter from './routes/interview.routes.js'
import pricing from './routes/payment.route.js'

import cookieParser from 'cookie-parser';
import cors from 'cors'


const app = express();

app.use(cors({
  origin: "https://ai-interview-1clinet.onrender.com",
  credentials: true
}))


app.use((req, res, next) => {
  if (req.originalUrl === "/api/pricing/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use(cookieParser())

app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/interview', interviewRouter)
app.use('/api/pricing',pricing)

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  connectDb()
});
