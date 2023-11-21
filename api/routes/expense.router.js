// Import required modules
import express from 'express';


import { createExpenseCategory, createFeedPurchaseAndExpenseTransaction, getAllCategories } from '../controllers/expense.controller.js';




// Create an Express router
const expenseRouter = express.Router();

// Route to create a new expense category
expenseRouter.post('/expense-categories', createExpenseCategory);
expenseRouter.get('/all-categories', getAllCategories);
expenseRouter.post('/feed-purchase', createFeedPurchaseAndExpenseTransaction);

// Export the router
export default expenseRouter;
