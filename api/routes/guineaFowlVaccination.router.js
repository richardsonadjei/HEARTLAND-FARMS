import express from 'express';
import {
  createGuineaFowlVaccination,
  getAllGuineaFowlVaccinations,
  getGuineaFowlVaccinationById,
  getGuineaFowlVaccinationsByBatch,
  
} from '../controllers/guineafowlVaccination.controller.js';

const guineaFowlVaccinationRouter = express.Router();

// Create a new GuineaFowlVaccination record
guineaFowlVaccinationRouter.post('/add-guineaFowlVaccinations', createGuineaFowlVaccination);

// Get all GuineaFowlVaccination records
guineaFowlVaccinationRouter.get('/view-guineaFowlVaccinations', getAllGuineaFowlVaccinations);

// Get a single GuineaFowlVaccination record by ID
guineaFowlVaccinationRouter.get('/guineaFowlVaccinations/:id', getGuineaFowlVaccinationById);
guineaFowlVaccinationRouter.get('/guineaFowlVaccinations/batch/:batchNumber', getGuineaFowlVaccinationsByBatch);





export default guineaFowlVaccinationRouter;
