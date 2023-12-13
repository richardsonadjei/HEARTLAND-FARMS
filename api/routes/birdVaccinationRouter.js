// Import required modules
import express from 'express';
import {
  createBirdVaccination,
  getAllBirdVaccinations,
  getBirdVaccinationById,
  updateBirdVaccinationById,
  deleteBirdVaccinationById,
} from '../controllers/birdVaccination.controller.js';

// Create an Express router
const birdVaccinationRouter = express.Router();

// Route to create a new bird vaccination record
birdVaccinationRouter.post('/add-bird-vaccinations', createBirdVaccination);

// Route to get all bird vaccination records
birdVaccinationRouter.get('/bird-vaccinations', getAllBirdVaccinations);

// Route to get a single bird vaccination record by ID
birdVaccinationRouter.get('/bird-vaccinations/:id', getBirdVaccinationById);

// Route to update a bird vaccination record by ID
birdVaccinationRouter.put('/update-bird-vaccinations/:id', updateBirdVaccinationById);

// Route to delete a bird vaccination record by ID
birdVaccinationRouter.delete('/delete-bird-vaccinations/:id', deleteBirdVaccinationById);

// Export the router
export default birdVaccinationRouter;
