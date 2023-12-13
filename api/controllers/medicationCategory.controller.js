// medicationCategoryController.js

import MedicationCategory from '../models/medicationCategory.model.js';

const getAllMedicactionCategories = async (req, res) => {
    try {
      const categories = await MedicationCategory.find();
      res.json(categories);
    } catch (error) {
      console.error(`Error fetching categories: ${error.message}`);
      res.status(500).json({ error: 'Failed to fetch medication categories' });
    }
  };
  

const getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await MedicationCategory.findById(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new MedicationCategory({ name, description });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const updatedCategory = await MedicationCategory.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (updatedCategory) {
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await MedicationCategory.findByIdAndDelete(id);
    if (deletedCategory) {
      res.json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ message: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
    getAllMedicactionCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
