import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/auth.router.js';
import profileRouter from './routes/user.router.js';
import cookieParser from 'cookie-parser';
import poultryRouter from './routes/poultry.router.js';
import sectionRouter from './routes/farmSection.router.js';
import breedRouter from './routes/breed.router.js';
import movementRouter from './routes/movement.router.js';
import supplierRouter from './routes/supplier.router.js';
import expenseRouter from './routes/expense.router.js';
import feedRequestRouter from './routes/feedRequest.Issue.router.js';
import feedRouter from './routes/feed.router.js';
import medicationRouter from './routes/medication.router.js';




dotenv.config();


mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();


app.use(express.json());
app.use(cookieParser());




app.listen(3000, () => {
    console.log('Server is running on port 3000!');
    }
)

app.use('/api/auth', authRouter);
app.use('/api/user', profileRouter); 
app.use('/api/', poultryRouter); 
app.use('/api/', sectionRouter);  
app.use('/api/', breedRouter); 
app.use('/api/', movementRouter);                  
app.use('/api/', supplierRouter);                  
app.use('/api/', expenseRouter);                  
app.use('/api/', feedRequestRouter);                  
app.use('/api/', feedRouter);                  
app.use('/api/', medicationRouter);                  

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});