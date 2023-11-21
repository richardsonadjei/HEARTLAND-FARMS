import express from 'express';
import { createBirdBatch, getAllBirdBatches, generateAgeReport, getAllBirdBatchesNoDates, getBatchByNumber, updateBatchQuantity, getBatchUpdatesWithinPeriod, addBirdsToBatch, getAdditionsByDateRange, updateCurrentAge, createFeedCategory, getAllFeedCategories } from '../controllers/poultry.controller.js';

const poultryRouter = express.Router();

// Define routes
poultryRouter.post('/create-birds', createBirdBatch);
poultryRouter.get('/all-batches', getAllBirdBatches);
poultryRouter.get('/age-report', generateAgeReport);
poultryRouter.get('/all-batchesNoDates', getAllBirdBatchesNoDates);
poultryRouter.get('/batch/:batchNumber', getBatchByNumber); 
poultryRouter.post('/update-batch-quantity', updateBatchQuantity);
poultryRouter.get('/update-history', getBatchUpdatesWithinPeriod);
poultryRouter.post('/add-birds', addBirdsToBatch);
poultryRouter.get('/add-birds-history', getAdditionsByDateRange);
poultryRouter.get('/update-current-age', updateCurrentAge);
poultryRouter.post('/create-feed-category', createFeedCategory);
poultryRouter.get('/all-feed-category', getAllFeedCategories);

export default poultryRouter;
