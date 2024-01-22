import express from 'express';
import { calculateCassavaFarmProfitLoss, getAllCassavaSalesForBatch, getAllExpensesForCassavaBatch, recordCassavaFertilizerApplicationAndExpense, recordCassavaFertilizerPurchase, recordCassavaHarvestAndExpenditure, recordCassavaManualWeedingAndExpense, recordCassavaMiscellaneousExpenditure, recordCassavaSale, recordCassavaWeedicideApplicationAndExpense, recordCassavaWeedicidePurchase, recordNewCassavaSeason,  saveCassavaLandPreparationAndExpenditure,  saveCassavaPlantingAndExpenditure,  viewAllCassavaLandPreparationRecords,  viewAllCassavaPlantings,  viewAllCassavaSeasons, viewCassavaFertilizerApplicationByBatch, viewCassavaHarvestByBatch, viewCassavaManualWeedingByBatch, viewCassavaWeedicideApplicationByBatch, } from '../controllers/cassava.controller.js';

const cassavaRouter = express.Router();


// Route for recording a new CassavaSeason
cassavaRouter.post('/new-cassava-season', recordNewCassavaSeason);
cassavaRouter.get('/all-cassava-seasons', viewAllCassavaSeasons);
cassavaRouter.post('/save-cassava-land-preparation', saveCassavaLandPreparationAndExpenditure);
cassavaRouter.post('/plant-cassava', saveCassavaPlantingAndExpenditure );
cassavaRouter.post('/record-cassava-fertilizer-application-and-expense', recordCassavaFertilizerApplicationAndExpense);
cassavaRouter.post('/record-manual-weeding-and-expense', recordCassavaManualWeedingAndExpense);
cassavaRouter.post('/record-weedicide-application-and-expense', recordCassavaWeedicideApplicationAndExpense);
cassavaRouter.post('/record-cassava-harvest-and-expense',  recordCassavaHarvestAndExpenditure);
cassavaRouter.get('/view-all-cassava-land-preparations/:batchNumber', viewAllCassavaLandPreparationRecords);
cassavaRouter.get('/view-all-plantings/:batchNumber', viewAllCassavaPlantings);
cassavaRouter.get('/view-all-manual-weeding/:batchNumber', viewCassavaManualWeedingByBatch);
cassavaRouter.get('/view-all-weedicide-application/:batchNumber', viewCassavaWeedicideApplicationByBatch);
cassavaRouter.get('/view-all-fertilizer-application/:batchNumber', viewCassavaFertilizerApplicationByBatch);
cassavaRouter.get('/view-all-cassava-harvests/:batchNumber', viewCassavaHarvestByBatch);
// CASSAVA EFINANCIAL REPORT ROUTERS
cassavaRouter.get('/view-all-cassava-expense/:batchNumber', getAllExpensesForCassavaBatch);
cassavaRouter.post('/record-cassava-sale', recordCassavaSale);
cassavaRouter.get('/all-cassava-sales/:batchNumber', getAllCassavaSalesForBatch);
cassavaRouter.post('/record-cassava-fertilizer-purchase', recordCassavaFertilizerPurchase);
cassavaRouter.post('/record-cassava-weedicide-purchase', recordCassavaWeedicidePurchase);
cassavaRouter.post('/record-cassava-misc-expense', recordCassavaMiscellaneousExpenditure);
cassavaRouter.get('/calculate-cassava-farm-profit-loss', calculateCassavaFarmProfitLoss);


export default cassavaRouter;
