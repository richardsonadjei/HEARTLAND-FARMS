import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRouter from './routes/user.routes.js';

import router from './routes/beforeStart.router.js';

import extrasRouter from './routes/extras.routes.js';
import vegeRouter from './routes/veges.routes.js';
import cashCropRouter from './routes/cashCrops.routes.js';
import animalRouter from './routes/animal.routes.js';
import animalFinanceRouter from './routes/animalFinance.routes.js';
import birdRouter from './routes/birds.routes.js';
import HumanResourceRouter from './routes/hrRouter.routes.js';


dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

  const __dirname = path.resolve();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
  console.log('Server is running on port 3000!');
});

app.use('/api/', userRouter);
app.use('/api/', extrasRouter);
app.use('/api/', vegeRouter);
app.use('/api/', cashCropRouter);
app.use('/api/', animalRouter);
app.use('/api/', animalFinanceRouter);
app.use('/api/', birdRouter);
app.use('/api/', HumanResourceRouter);


app.use('/api/', router);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});