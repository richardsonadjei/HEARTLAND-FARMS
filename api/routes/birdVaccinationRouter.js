// Import required modules
import express from 'express';
import {
  createBirdVaccination,

  updateBirdVaccinationById,
  deleteBirdVaccinationById,
  getBirdVaccinationsByBatchNumber,
  getBirdVaccinationsByPeriod,
  getBirdVaccinationByBatchNumber,
} from '../controllers/birdVaccination.controller.js';

// Create an Express router
const birdVaccinationRouter = express.Router();

// Route to create a new bird vaccination record
birdVaccinationRouter.post('/add-bird-vaccinations', createBirdVaccination);

// Route to get all bird vaccination records
birdVaccinationRouter.get('/all-bird-vaccinations', getBirdVaccinationsByPeriod);

// Route to get a single bird vaccination record by ID
birdVaccinationRouter.get('/bird-vaccinations/:batchNumber', getBirdVaccinationByBatchNumber);

// Route to update a bird vaccination record by ID
birdVaccinationRouter.put('/update-bird-vaccinations/:id', updateBirdVaccinationById);

// Route to delete a bird vaccination record by ID
birdVaccinationRouter.delete('/delete-bird-vaccinations/:id', deleteBirdVaccinationById);
birdVaccinationRouter.get('/birdVaccinations/batch/:batchNumber', getBirdVaccinationsByBatchNumber);

// Export the router
export default birdVaccinationRouter;
