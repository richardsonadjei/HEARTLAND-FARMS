// Import required modules
import express from 'express';


import { createExpenseCategory, createFeedName, createFeedPurchaseAndExpenseTransaction, getAllCategories, getAllFeedNames,getFeedPurchaseTransactionsByDate } from '../controllers/expense.controller.js';




// Create an Express router
const expenseRouter = express.Router();

// Route to create a new expense category
expenseRouter.post('/expense-categories', createExpenseCategory);
expenseRouter.get('/all-expense-categories', getAllCategories);
expenseRouter.post('/feed-purchase', createFeedPurchaseAndExpenseTransaction);
expenseRouter.post('/new-feedName', createFeedName);
expenseRouter.get('/all-feed-names', getAllFeedNames);
expenseRouter.get('/feed-purchase-transactions', getFeedPurchaseTransactionsByDate);


// Export the router
export default expenseRouter;
