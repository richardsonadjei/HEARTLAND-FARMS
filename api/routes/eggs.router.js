// eggRouter.js

import express from 'express';
import {
  addUnsortedEgg,
  getCurrentSortedEggStockInCrates ,  getCurrentUnsortedEggStockInCrates,  recordSortedEggs, viewDailySortedEggs, viewDailyUnsortedEggs,
  
} from '../controllers/eggs.controller.js';

const eggRouter = express.Router();

// Create a new egg
eggRouter.post('/add-unsorted-eggs', addUnsortedEgg);

eggRouter.get('/view-daily-unsorted-eggs', viewDailyUnsortedEggs);

// Record sorted eggs and update inventory
eggRouter.post('/add-sorted-eggs', recordSortedEggs);

eggRouter.get('/view-daily-sorted-eggs', viewDailySortedEggs);

eggRouter.get('/current-unsorted-egg-stock', getCurrentUnsortedEggStockInCrates);

// Create a route for fetching current stock of sorted eggs by sizes
eggRouter.get('/current-sorted-egg-stock', getCurrentSortedEggStockInCrates);



export default eggRouter;
