// routes/medicationRoutes.js

import express from 'express';
import {
  createMedication,
  getAllMedications,
  getMedicationById,
  updateMedicationById,
  deleteMedicationById,
} from '../controllers/drug.controller.js';

const drugsRouter = express.Router();

// CRUD operations
drugsRouter.post('/create-drugs', createMedication);
drugsRouter.get('/all-drugs', getAllMedications);
drugsRouter.get('/medications/:id', getMedicationById);
drugsRouter.put('/medications/:id', updateMedicationById);
drugsRouter.delete('/delete-medications/:id', deleteMedicationById);

export default drugsRouter;
