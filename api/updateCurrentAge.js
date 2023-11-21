// scripts/updateCurrentAge.js

// Import necessary modules
import mongoose from 'mongoose';
import cron from 'node-cron';
import Bird from './models/poultry.model.js'; // Adjust the path based on your file structure

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((err) => {
    console.log(err);
  });

// Function to calculate age based on arrival date
const calculateAge = (arrivalDate) => {
  const currentDate = new Date();
  const parsedArrivalDate = new Date(arrivalDate);
  
  const ageInMilliseconds = currentDate - parsedArrivalDate;
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

  const months = Math.floor(ageInDays / 30);
  const days = ageInDays % 30;

  return `${months} months ${days} days`;
};

cron.schedule('0 0 * * *', async () => { // '0 0 * * *' means every day at midnight
  try {
    // Find all birds in the database
    const birds = await Bird.find();

    // Update the currentAge for each bird
    for (const bird of birds) {
      bird.currentAge = calculateAge(bird.arrivalDate);
      await bird.save();
    }

    console.log('Updated currentAge for all birds every 24 hours.');
  } catch (error) {
    console.error('Error updating currentAge:', error);
  }
});

// Keep the script running to allow the scheduler to work
process.stdin.resume();
