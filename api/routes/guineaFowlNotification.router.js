// routes/guineaFowlRoutes.js
import express from 'express';
import { fetchGuineaFowlsWithVaccinationDue, convertAgeToDays } from '../controllers/guineaFowlNotificationController.js';

const guineaFowlNotificationRouter = express.Router();

guineaFowlNotificationRouter.get('/guinea-fowls-due-for-vaccination', async (req, res) => {
  try {
    // Call the controller function to fetch guinea fowls with vaccination due
    const guineaFowlsWithVaccinationDue = await fetchGuineaFowlsWithVaccinationDue();

    // Create notifications with age in days and breed
    const notifications = guineaFowlsWithVaccinationDue.map((notification) => {
      const guineaFowlAgeInDays = convertAgeToDays(notification.guineaFowl.currentAge);
      return {
        batchNumber: notification.guineaFowl.batchNumber,
        vaccinationDue: notification.vaccinationDue,
        ageInDays: guineaFowlAgeInDays,
        category: notification.category,
        // Add other guinea fowl details as needed
      };
    });

    res.json({
      notifications,
    });
  } catch (error) {
    console.error('Error fetching guinea fowls with vaccination due:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default guineaFowlNotificationRouter;
