// routes/landPreparationRoutes.js

import express from 'express';
import recordLandPreparationAndExpense, {  calculateMaizeFarmProfitLoss, getAllExpensesForMaizeBatch, getAllMaizeFertilizerApplicationsForBatch, getAllMaizeHarvestsForBatch, getAllMaizeSalesForBatch, getAllManualWeedingsByBatch, getAllWeedicideApplicationsByBatch, recordHarvestAndExpenditure, recordMaizeFertilizerApplicationAndExpense, recordMaizeFertilizerPurchase, recordMaizeManualWeedingAndExpense, recordMaizeMiscellaneousExpenditure, recordMaizeSale, recordMaizeWeedicideApplicationAndExpense, recordMaizeWeedicidePurchase, recordNewMaizeSeason, saveMaizePlantingAndExpenditure, viewAllMaizeSeasons, viewLandPreparationsByBatchNumber, viewMaizePlantingByBatchNumber } from '../controllers/maize.controller.js';

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


// MANUAL WEEDING
maizeRouter.post('/record-maize-manual-weeding', recordMaizeManualWeedingAndExpense);
maizeRouter.post('/record-maize-weedicide-application', recordMaizeWeedicideApplicationAndExpense);

// WEED CONTROL REPORTS ROUTER
maizeRouter.get('/maize-manual-weeding-report/:batchNumber', getAllManualWeedingsByBatch);
maizeRouter.get('/maize-weedicide-application-report/:batchNumber', getAllWeedicideApplicationsByBatch);

// HARVEST
maizeRouter.post('/harvest-maize', recordHarvestAndExpenditure);
maizeRouter.get('/maize-harvest-report/:batchNumber', getAllMaizeHarvestsForBatch);
maizeRouter.get('/maize-fertilizer-application-report/:batchNumber', getAllMaizeFertilizerApplicationsForBatch);
maizeRouter.get('/maize-seasonal-expense-report/:batchNumber', getAllExpensesForMaizeBatch);
maizeRouter.post('/record-maize-sale', recordMaizeSale);
maizeRouter.get('/maize-sales/:batchNumber', getAllMaizeSalesForBatch);
maizeRouter.get('/calculate-maize-ProfitLoss', calculateMaizeFarmProfitLoss);
maizeRouter.post('/record-maize-fertilizer-purchase', recordMaizeFertilizerPurchase);
maizeRouter.post('/record-maize-weedicide-purchase', recordMaizeWeedicidePurchase);
maizeRouter.post('/record-maize-misc-expense', recordMaizeMiscellaneousExpenditure);
export default maizeRouter;
