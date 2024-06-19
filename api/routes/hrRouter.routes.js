import express from 'express';
import { createDepartment, createEmployee, createFinanceCategory, createOtherPayment, createPayroll, createPosition, deleteDepartment, deleteEmployee, deleteFinanceCategory, deleteOtherPayment, deletePayroll, deletePosition, getAllOtherPayments, getDepartmentById, getDepartments, getEmployeeById, getEmployees, getFinanceCategories, getFinanceCategoryById, getOtherPaymentById, getPayrollById, getPayrolls, getPositions, updateDepartment, updateEmployee, updateFinanceCategory, updateOtherPayment, updatePayroll, updatePosition } from '../controllers/hr.controller.js';


const HumanResourceRouter = express.Router();

HumanResourceRouter.post('/employees', createEmployee);
HumanResourceRouter.get('/employees', getEmployees);
HumanResourceRouter.get('/employees/:id', getEmployeeById);
HumanResourceRouter.put('/employees/:id', updateEmployee);
HumanResourceRouter.delete('/employees/:id', deleteEmployee);

HumanResourceRouter.post('/departments', createDepartment);
HumanResourceRouter.get('/departments', getDepartments);
HumanResourceRouter.get('/departments/:id', getDepartmentById);
HumanResourceRouter.put('/departments/:id', updateDepartment);
HumanResourceRouter.delete('/departments/:id', deleteDepartment);

// Route to create a new position
HumanResourceRouter.post('/positions', createPosition);

// Route to get all positions
HumanResourceRouter.get('/positions', getPositions);

// Route to update a position by ID
HumanResourceRouter.put('/positions/:id', updatePosition);

// Route to delete a position by ID
HumanResourceRouter.delete('/positions/:id', deletePosition);

HumanResourceRouter.post('/finance-categories', createFinanceCategory);

// Route to get all finance categories
HumanResourceRouter.get('/finance-categories', getFinanceCategories);

// Route to get a single finance category by ID
HumanResourceRouter.get('/finance-categories/:id', getFinanceCategoryById);

// Route to update a finance category
HumanResourceRouter.put('/finance-categories/:id', updateFinanceCategory);

// Route to delete a finance category
HumanResourceRouter.delete('/finance-categories/:id', deleteFinanceCategory);

// Route to create a new payroll record
HumanResourceRouter.post('/payrolls', createPayroll);

// Route to get all payroll records
HumanResourceRouter.get('/payrolls', getPayrolls);

// Route to get a single payroll record by ID
HumanResourceRouter.get('/payrolls/:id', getPayrollById);

// Route to update a payroll record by ID
HumanResourceRouter.put('/payrolls/:id', updatePayroll);

// Route to delete a payroll record by ID
HumanResourceRouter.delete('/payrolls/:id', deletePayroll);

HumanResourceRouter.post('/other-payments', createOtherPayment); // Create a new other payment record
HumanResourceRouter.get('/other-payments', getAllOtherPayments); // Get all other payments
HumanResourceRouter.get('/other-payments/:id', getOtherPaymentById); // Get a single other payment by ID
HumanResourceRouter.put('/other-payments/:id', updateOtherPayment); // Update an existing other payment record
HumanResourceRouter.delete('/other-payments/:id', deleteOtherPayment); // Delete an existing other payment record



export default HumanResourceRouter;
