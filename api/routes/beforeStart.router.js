// routes/beforeStartExpensesRoutes.js

import express from 'express';
import {
  createBeforeStartExpense,
  getAllBeforeStartExpenses,
  getBeforeStartExpenseById,
  updateBeforeStartExpenseById,
  deleteBeforeStartExpenseById,
} from '../controllers/beforeStart.controller.js';

const router = express.Router();

// Create a new BeforeStartExpense
router.post('/add-beforeStartExpenses', createBeforeStartExpense);

// Get all BeforeStartExpenses
router.get('/all-before-start-expenses', getAllBeforeStartExpenses);

// Get a specific BeforeStartExpense by ID
router.get('/beforeStartExpenses/:id', getBeforeStartExpenseById);

// Update a BeforeStartExpense by ID
router.put('/update-before-start-expense/:id', updateBeforeStartExpenseById);

// Delete a BeforeStartExpense by ID
router.delete('/delete-before-start-expense/:id', deleteBeforeStartExpenseById);

export default router;
