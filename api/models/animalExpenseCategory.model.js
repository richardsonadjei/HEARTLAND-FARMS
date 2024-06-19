import mongoose from 'mongoose';

// Define AnimalExpenseCategory schema
const animalExpenseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // Add timestamps option here

// Create AnimalExpenseCategory model
const AnimalExpenseCategory = mongoose.model('AnimalExpenseCategory', animalExpenseCategorySchema);

export default AnimalExpenseCategory;
