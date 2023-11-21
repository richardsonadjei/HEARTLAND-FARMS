// Import required modules
import mongoose from 'mongoose';

// Define the ExpenseCategory schema
const expenseCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create ExpenseCategory model
const ExpenseCategory = mongoose.model('ExpenseCategory', expenseCategorySchema);

// Export the model
export default ExpenseCategory;
