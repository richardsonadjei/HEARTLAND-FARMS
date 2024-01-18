// routes/landPreparationRoutes.js

import express from 'express';
import recordLandPreparationAndExpense, {  recordMaizeFertilizerApplicationAndExpense, recordNewMaizeSeason, saveMaizePlantingAndExpenditure, viewAllMaizeSeasons, viewLandPreparationsByBatchNumber, viewMaizePlantingByBatchNumber } from '../controllers/maize.controller.js';

const maizeRouter = express.Router();

// Endpoint for recording land preparation and expense
maizeRouter.post('/record-land-preparation-and-expense', recordLandPreparationAndExpense);
maizeRouter.get('/maizelandPreparations/:batchNumber', viewLandPreparationsByBatchNumber);

// NEW SEASON
maizeRouter.post('/start-maize-season', recordNewMaizeSeason);
maizeRouter.get('/all-maize-seasons', viewAllMaizeSeasons);

// PLANTING RECORDS
maizeRouter.post('/plant-maize', saveMaizePlantingAndExpenditure);
maizeRouter.get('/view-maize-planted/:batchNumber', viewMaizePlantingByBatchNumber);

//FERTILIZER APPLICATION
maizeRouter.post('/record-maize-fertilizer-application', recordMaizeFertilizerApplicationAndExpense); 

export default maizeRouter;
