// Import necessary dependencies
import express from 'express';
import { createSupplier, getAllSuppliers, updateSupplier } from '../controllers/supplier.controller.js'; // Adjust the path based on your file structure

// Create an instance of the Express router
const supplierRouter = express.Router();

// Define the route to create a new supplier
supplierRouter.post('/create-supplier', createSupplier);
supplierRouter.get('/suppliers', getAllSuppliers);
supplierRouter.put('/update-supplier/:SupplierName', updateSupplier);

// Export the router
export default supplierRouter;
