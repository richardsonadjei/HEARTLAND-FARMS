// medicationCategoryRouter.js

import express from 'express';
import {
    getAllMedicactionCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/medicationCategory.controller.js';

const medCategoryRouter = express.Router();

// Routes for CRUD operations
medCategoryRouter.get('/view-medication-categories', getAllMedicactionCategories);

medCategoryRouter.get('/categories/:id', getCategoryById);
medCategoryRouter.post('/add-categories', createCategory);
medCategoryRouter.put('/update-categories/:id', updateCategory);
medCategoryRouter.delete('/categories/:id', deleteCategory);

export default medCategoryRouter;
