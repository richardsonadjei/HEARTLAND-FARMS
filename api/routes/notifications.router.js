// routes/birdRoutes.js
import express from 'express';
import { fetchBirdsWithVaccinationDue, convertAgeToDays } from '../controllers/notifications.controller.js';

const notificationsRouter = express.Router();

notificationsRouter.get('/birds-due-for-vaccination', async (req, res) => {
    try {
      // Call the controller function to fetch birds with vaccination due
      const birdsWithVaccinationDue = await fetchBirdsWithVaccinationDue();
  
      // Create notifications with age in days and breed
      const notifications = birdsWithVaccinationDue.map((notification) => {
        const birdAgeInDays = convertAgeToDays(notification.bird.currentAge);
        return {
          batchNumber: notification.bird.batchNumber,
          vaccinationDue: notification.vaccinationDue,
          ageInDays: birdAgeInDays,
          breed: notification.bird.breed, // Add the breed to the response
        };
      });
  
      res.json({
        notifications,
      });
    } catch (error) {
      console.error('Error fetching birds with vaccination due:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  export default notificationsRouter;

