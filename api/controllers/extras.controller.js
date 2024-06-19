
import ExpenseCategory from '../models/expenseCategory.model.js';

// Controller to create a new expense category
const createExpenseCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const expenseCategory = new ExpenseCategory({ name, description });
    const newExpenseCategory = await expenseCategory.save();
    res.status(201).json(newExpenseCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all expense categories
const getAllExpenseCategories = async (req, res) => {
  try {
    const expenseCategories = await ExpenseCategory.find();
    res.status(200).json(expenseCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single expense category by ID
const getExpenseCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const expenseCategory = await ExpenseCategory.findById(id);
    if (!expenseCategory) {
      return res.status(404).json({ message: 'Expense category not found' });
    }
    res.status(200).json(expenseCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update an expense category
const updateExpenseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedExpenseCategory = await ExpenseCategory.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res.status(200).json(updatedExpenseCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete an expense category
const deleteExpenseCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpenseCategory = await ExpenseCategory.findByIdAndDelete(id);
    if (!deletedExpenseCategory) {
      return res.status(404).json({ message: 'Expense category not found' });
    }
    res.status(200).json({ message: 'Expense category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createExpenseCategory,
  getAllExpenseCategories,
  getExpenseCategoryById,
  updateExpenseCategory,
  deleteExpenseCategory
};
