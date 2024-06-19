import mongoose from 'mongoose';

// Define BirdExpenseCategory schema
const birdExpenseCategorySchema = new mongoose.Schema({
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

// Create BirdExpenseCategory model
const BirdExpenseCategory = mongoose.model('BirdExpenseCategory', birdExpenseCategorySchema);

export default BirdExpenseCategory;
