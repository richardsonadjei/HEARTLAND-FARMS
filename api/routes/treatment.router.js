import express from 'express';
const treatmentRouter = express.Router();

import birdTreatmentController from '../controllers/treatment.controller.js';

// Create a new bird treatment record
treatmentRouter.post('/add-bird-treatment', birdTreatmentController.createBirdTreatment);

// Get all bird treatment records
treatmentRouter.get('/all-bird-treatments', birdTreatmentController.getAllBirdTreatments);

// Get a specific bird treatment record by ID
treatmentRouter.get('/bird-treatment/:id', birdTreatmentController.getBirdTreatmentById);

// Update a bird treatment record by ID
treatmentRouter.put('/update-bird-treatment/:id', birdTreatmentController.updateBirdTreatmentById);

// Delete a bird treatment record by ID
treatmentRouter.delete('/delete-bird-treatment/:id', birdTreatmentController.deleteBirdTreatmentById);

treatmentRouter.get('/bird-treatments/batch/:batchNumber', birdTreatmentController.getBirdTreatmentsByBatch);
export default treatmentRouter;
