import express from 'express';
import { createAnimalExpenseCategory, createAnimalFarmExpense, deleteAnimalExpenseCategory, deleteAnimalFarmExpense, getAllAnimalExpenseCategories, getAllAnimalFarmExpenses, getAnimalExpenseCategoryById, getAnimalFarmExpenseById, updateAnimalExpenseCategory, updateAnimalFarmExpense } from '../controllers/animalFinance.controller.js';


const animalFinanceRouter = express.Router(); // Changed the router name to animalFinanceRouter

// Create a new AnimalExpenseCategory
animalFinanceRouter.post('/add-expense-category', createAnimalExpenseCategory);

// Get all AnimalExpenseCategories
animalFinanceRouter.get('/all-animal-expense-categories', getAllAnimalExpenseCategories);

// Get a single AnimalExpenseCategory by ID
animalFinanceRouter.get('/animal-expense-category/:id', getAnimalExpenseCategoryById);

// Update a AnimalExpenseCategory by ID
animalFinanceRouter.put('/animal-expense-category/:id', updateAnimalExpenseCategory);

// Delete a AnimalExpenseCategory by ID
animalFinanceRouter.delete('/animal-expense-category/:id', deleteAnimalExpenseCategory);

// Create a new expense
animalFinanceRouter.post('/add-animal-expenses', createAnimalFarmExpense);

// Get all expenses
animalFinanceRouter.get('/all-animal-farm-expenses', getAllAnimalFarmExpenses);

// Get a single expense by ID
animalFinanceRouter.get('/animal-farm-expenses/:id', getAnimalFarmExpenseById);

// Update an expense by ID
animalFinanceRouter.put('/animal-farm-expenses/:id', updateAnimalFarmExpense);

// Delete an expense by ID
animalFinanceRouter.delete('/animal-farm-expenses/:id', deleteAnimalFarmExpense);


export default animalFinanceRouter;
