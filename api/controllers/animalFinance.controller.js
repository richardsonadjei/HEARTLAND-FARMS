import AnimalExpenseCategory from '../models/animalExpenseCategory.model.js';
import AnimalFarmExpense from '../models/animalFarmExpense.model.js';

// Create a new AnimalExpenseCategory
const createAnimalExpenseCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const animalExpenseCategory = new AnimalExpenseCategory({ name, description });
    const savedCategory = await animalExpenseCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all AnimalExpenseCategories
const getAllAnimalExpenseCategories = async (req, res) => {
  try {
    const animalExpenseCategories = await AnimalExpenseCategory.find();
    res.json(animalExpenseCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single AnimalExpenseCategory by ID
const getAnimalExpenseCategoryById = async (req, res) => {
  try {
    const animalExpenseCategory = await AnimalExpenseCategory.findById(req.params.id);
    if (!animalExpenseCategory) {
      return res.status(404).json({ message: 'AnimalExpenseCategory not found' });
    }
    res.json(animalExpenseCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a AnimalExpenseCategory by ID
const updateAnimalExpenseCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const animalExpenseCategory = await AnimalExpenseCategory.findById(req.params.id);
    if (!animalExpenseCategory) {
      return res.status(404).json({ message: 'AnimalExpenseCategory not found' });
    }
    animalExpenseCategory.name = name;
    animalExpenseCategory.description = description;
    const updatedCategory = await animalExpenseCategory.save();
    res.json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a AnimalExpenseCategory by ID
const deleteAnimalExpenseCategory = async (req, res) => {
  try {
    const animalExpenseCategory = await AnimalExpenseCategory.findById(req.params.id);
    if (!animalExpenseCategory) {
      return res.status(404).json({ message: 'AnimalExpenseCategory not found' });
    }
    await animalExpenseCategory.remove();
    res.json({ message: 'AnimalExpenseCategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createAnimalExpenseCategory,
  getAllAnimalExpenseCategories,
  getAnimalExpenseCategoryById,
  updateAnimalExpenseCategory,
  deleteAnimalExpenseCategory,
};




// Controller to create a new expense
const createAnimalFarmExpense = async (req, res) => {
  try {
    const {
      date,
      category,
      type,
      identityNumber,
      additionalDetails,
      amount,
      recordedBy
    } = req.body;

    const newExpense = new AnimalFarmExpense({
      date,
      category,
      type,
      identityNumber,
      additionalDetails,
      amount,
      recordedBy
    });

    const savedExpense = await newExpense.save();

    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all expenses
const getAllAnimalFarmExpenses = async (req, res) => {
  try {
    const expenses = await AnimalFarmExpense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a single expense by ID
const getAnimalFarmExpenseById = async (req, res) => {
  try {
    const expense = await AnimalFarmExpense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update an expense by ID
const updateAnimalFarmExpense = async (req, res) => {
  try {
    const {
      date,
      category,
      type,
      batchNumber,
      description,
      amount,
      recordedBy
    } = req.body;

    const updatedExpense = await AnimalFarmExpense.findByIdAndUpdate(
      req.params.id,
      {
        date,
        category,
        type,
        batchNumber,
        description,
        amount,
        recordedBy
      },
      { new: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete an expense by ID
const deleteAnimalFarmExpense = async (req, res) => {
  try {
    const deletedExpense = await AnimalFarmExpense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createAnimalFarmExpense,
  getAllAnimalFarmExpenses,
  getAnimalFarmExpenseById,
  updateAnimalFarmExpense,
  deleteAnimalFarmExpense
};
