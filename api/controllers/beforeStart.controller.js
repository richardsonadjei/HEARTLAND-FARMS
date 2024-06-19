// controllers/beforeStartExpensesController.js

import BeforeStartExpenses from '../models/beforeStartExpenses.model.js';

// Create a new BeforeStartExpenses entry
const createBeforeStartExpense = async (req, res) => {
  try {
    const { date, description, amountSpent, recordedBy } = req.body;
    const newBeforeStartExpense = new BeforeStartExpenses({
      date,
      description,
      amountSpent,
      recordedBy,
    });
    const savedBeforeStartExpense = await newBeforeStartExpense.save();
    res.status(201).json(savedBeforeStartExpense);
  } catch (error) {
    console.error('Error creating BeforeStartExpense:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get all BeforeStartExpenses entries
const getAllBeforeStartExpenses = async (req, res) => {
  try {
    const beforeStartExpenses = await BeforeStartExpenses.find();
    res.status(200).json(beforeStartExpenses);
  } catch (error) {
    console.error('Error getting BeforeStartExpenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get a specific BeforeStartExpense by ID
const getBeforeStartExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const beforeStartExpense = await BeforeStartExpenses.findById(id);
    if (!beforeStartExpense) {
      return res.status(404).json({ error: 'BeforeStartExpense not found' });
    }
    res.status(200).json(beforeStartExpense);
  } catch (error) {
    console.error('Error getting BeforeStartExpense by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update a BeforeStartExpense by ID
const updateBeforeStartExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBeforeStartExpense = await BeforeStartExpenses.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (!updatedBeforeStartExpense) {
      return res.status(404).json({ error: 'BeforeStartExpense not found' });
    }
    res.status(200).json(updatedBeforeStartExpense);
  } catch (error) {
    console.error('Error updating BeforeStartExpense by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a BeforeStartExpense by ID
const deleteBeforeStartExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBeforeStartExpense = await BeforeStartExpenses.findByIdAndDelete(id);
    if (!deletedBeforeStartExpense) {
      return res.status(404).json({ error: 'BeforeStartExpense not found' });
    }
    res.status(200).json(deletedBeforeStartExpense);
  } catch (error) {
    console.error('Error deleting BeforeStartExpense by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {
  createBeforeStartExpense,
  getAllBeforeStartExpenses,
  getBeforeStartExpenseById,
  updateBeforeStartExpenseById,
  deleteBeforeStartExpenseById,
};
