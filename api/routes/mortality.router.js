import express from 'express';
import { recordMortality, viewMortalitiesByPeriod, viewMortalitiesByBatch } from '../controllers/mortality.controller.js';

const mortalityRouter = express.Router();

// Route to record mortality
mortalityRouter.post('/record-mortality', recordMortality);

// Route to view mortalities by period
mortalityRouter.get('/view-mortalities-by-period', viewMortalitiesByPeriod);

// Route to view mortalities for a specific batch
mortalityRouter.get('/view-mortalities-by-batch/:batchNumber', viewMortalitiesByBatch);

export default mortalityRouter;
