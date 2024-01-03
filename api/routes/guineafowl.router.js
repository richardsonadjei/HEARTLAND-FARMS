import express from 'express';
// Change the import statement to use a relative path
import * as guineaFowlController from '../controllers/guineafowl.controller.js';


const guineaFowlRouter = express.Router();

guineaFowlRouter.post('/add-guinea-fowl', guineaFowlController.createGuineaFowl);
guineaFowlRouter.get('/all-guinea-fowl', guineaFowlController.getAllGuineaFowls);
guineaFowlRouter.put('/:batchNumber/update-quantity', guineaFowlController.updateGuineaFowlQuantity);
guineaFowlRouter.get('/batch-updates', guineaFowlController.viewBatchUpdatesWithinPeriod);
guineaFowlRouter.get('/update-all-guinea-ages', guineaFowlController.updateGuineaFowlCurrentAge);
guineaFowlRouter.post('/move-guinea-batch', guineaFowlController.moveGuineaFowlBatch);
guineaFowlRouter.get('/guinea-fowls/:batchNumber', guineaFowlController.viewGuineaFowlBatchByNumber);

// HEALTH RECORDS ROUTERS

guineaFowlRouter.post('/add-guinea-fowl-health-record', guineaFowlController.createHealthRecord);

// Get all health records
guineaFowlRouter.get('/view-health-records', guineaFowlController.getAllHealthRecords);

// Get a specific health record by ID
guineaFowlRouter.get('/health-records/:id', guineaFowlController.getHealthRecordById);

// Update a health record by ID
guineaFowlRouter.put('/health-records/:id', guineaFowlController.updateHealthRecord);

// Delete a health record by ID
guineaFowlRouter.delete('/health-records/:id', guineaFowlController.deleteHealthRecord);

// TREATMENT ROUTERS

// Route to create a new GuineaFowlTreatment record
guineaFowlRouter.post('/add-guineaFowlTreatments', guineaFowlController.createGuineaFowlTreatment);

// Route to get all GuineaFowlTreatment records
guineaFowlRouter.get('/view-guineaFowlTreatments', guineaFowlController.getAllGuineaFowlTreatments);

// Route to get a single GuineaFowlTreatment record by ID
guineaFowlRouter.get('/guineaFowlTreatments/:id', guineaFowlController.getGuineaFowlTreatmentById);

// Route to update a GuineaFowlTreatment record by ID
guineaFowlRouter.put('/guineaFowlTreatments/:id', guineaFowlController.updateGuineaFowlTreatment);

// Route to delete a GuineaFowlTreatment record by ID
guineaFowlRouter.delete('/guineaFowlTreatments/:id', guineaFowlController.deleteGuineaFowlTreatment);


export default guineaFowlRouter;



