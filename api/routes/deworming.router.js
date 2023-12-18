// routes/dewormingRoutes.js
import express from 'express';
const dewormingRouter = express.Router();
import * as dewormingController from '../controllers/deworming.controller.js';

// Create a deworming
dewormingRouter.post('/add-deworming', dewormingController.createDeworming);

// Get deworming records by batch number
dewormingRouter.get('/deworming/batch/:batchNumber', dewormingController.getDewormingByBatch);

dewormingRouter.get('/deworming/date-range/:startDate/:endDate', dewormingController.getDewormingByDateRange);

// Add routes for update, delete, and other operations as needed...

export default dewormingRouter;
