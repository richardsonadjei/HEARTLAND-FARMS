// routes/seasonRoutes.js

import express from 'express';
import { createExpenseCategory, deleteExpenseCategory,  getAllExpenseCategories,getExpenseCategoryById, updateExpenseCategory } from '../controllers/extras.controller.js';

const extrasRouter = express.Router();

// Create a new expense category
extrasRouter.post('/add-expense-categories', createExpenseCategory);

// Get all expense categories
extrasRouter.get('/all-expense-categories', getAllExpenseCategories);

// Get a single expense category by ID
extrasRouter.get('/expense-categories/:id', getExpenseCategoryById);

// Update an expense category
extrasRouter.put('/edit-expense-categories/:id', updateExpenseCategory);

// Delete an expense category
extrasRouter.delete('/delete-expense-categories/:id', deleteExpenseCategory);

export default extrasRouter;
