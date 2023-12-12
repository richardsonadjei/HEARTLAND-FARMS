// medicationRouter.js
import express from 'express';
import {
  getAllMedications,
  getMedicationById,
  createMedication,
  updateMedication,
  deleteMedication,
} from '../controllers/medication.controller.js';

const medicationRouter = express.Router();

medicationRouter.get('/all-vaccines', getAllMedications);
medicationRouter.get('/:id', getMedicationById);
medicationRouter.post('/add-medication', createMedication);
medicationRouter.put('/:id', updateMedication);
medicationRouter.delete('/:id', deleteMedication);

export default medicationRouter;
