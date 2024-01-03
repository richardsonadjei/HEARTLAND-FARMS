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
import vaccinationRouter from './routes/vaccination.router.js';
import medCategoryRouter from './routes/medicationCategory.router.js';
import drugsRouter from './routes/drugs.router.js';
import notificationsRouter from './routes/notifications.router.js';
import birdVaccinationRouter from './routes/birdVaccinationRouter.js';
import dewormingRouter from './routes/deworming.router.js';
import healthConditionRouter from './routes/healthCondtion.router.js';
import treatmentRouter from './routes/treatment.router.js';
import eggRouter from './routes/eggs.router.js';
import incomeRouter from './routes/income.router.js';
import birdMortalityRouter from './routes/birdMortality.router.js';
import guineaFowlRouter from './routes/guineafowl.router.js';
import guineaFowlNotificationRouter from './routes/guineaFowlNotification.router.js';
import guineaFowlVaccinationRouter from './routes/guineaFowlVaccination.router.js';





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
app.use('/api/', vaccinationRouter);                  
app.use('/api/', medCategoryRouter);    
app.use('/api/', drugsRouter);    
app.use('/api/', notificationsRouter);    
app.use('/api/', birdVaccinationRouter);    
app.use('/api/', dewormingRouter);    
app.use('/api/', healthConditionRouter);    
app.use('/api/', treatmentRouter);    
app.use('/api/', eggRouter);     
app.use('/api/', incomeRouter);    
app.use('/api/', birdMortalityRouter);    
app.use('/api/', guineaFowlRouter);    
app.use('/api/', guineaFowlNotificationRouter);    
app.use('/api/', guineaFowlVaccinationRouter);    




app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});