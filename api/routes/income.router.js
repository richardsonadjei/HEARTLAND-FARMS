// Import necessary modules
import express from 'express';
import { makeEggSale, recordBirdSale, viewBirdSalesWithinPeriod, viewEggSalesWithinPeriod} from '../controllers/income.controller.js';

// Create an Express router
const incomeRouter = express.Router();

// Define routes for egg sale operations
incomeRouter.post('/sell-eggs', makeEggSale );
incomeRouter.get('/egg-sales-report', viewEggSalesWithinPeriod);
incomeRouter.post('/sell-birds', recordBirdSale);
incomeRouter.get('/viewBirdSales', viewBirdSalesWithinPeriod);

// Export the router
export default incomeRouter;
