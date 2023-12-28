// Import necessary modules
import express from 'express';
import { makeEggSale, recordBirdSale, viewEggSalesWithinPeriod, viewPoultryIncomeSales } from '../controllers/income.controller.js';

// Create an Express router
const incomeRouter = express.Router();

// Define routes for egg sale operations
incomeRouter.post('/sell-eggs', makeEggSale );
incomeRouter.get('/egg-income-report', viewPoultryIncomeSales);
incomeRouter.get('/egg-sales-report', viewEggSalesWithinPeriod);
incomeRouter.post('/sell-birds', recordBirdSale);

// Export the router
export default incomeRouter;
