import express from 'express';
import { generateMortalityReport, recordBirdMortality, viewBatchMortality } from '../controllers/birdMortality.controller.js';

const birdMortalityRouter = express.Router();

// Route to record bird mortality
birdMortalityRouter.post('/recordBirdMortality', recordBirdMortality);
birdMortalityRouter.get('/birds-mortality-report', generateMortalityReport);
birdMortalityRouter.get('/view-batch-mortality/:batchNumber', viewBatchMortality);

export default birdMortalityRouter;
