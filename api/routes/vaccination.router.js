import express from 'express';
import {
  getAllVaccinations,
  getVaccinationById,
  createVaccination,
  updateVaccination,
  deleteVaccination,
} from '../controllers/vaccination.controller.js';

const vaccinationRouter = express.Router();


// Routes for Vaccinations
vaccinationRouter.get('/all-vaccinations', getAllVaccinations);
vaccinationRouter.get('/vaccinations/:id', getVaccinationById);
vaccinationRouter.post('/add-vaccination', createVaccination);
vaccinationRouter.put('/vaccinations/:id', updateVaccination);
vaccinationRouter.delete('/vaccinations/:id', deleteVaccination);

export default vaccinationRouter;
