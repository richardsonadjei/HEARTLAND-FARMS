import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define VegeExpense schema
const vegeExpenseSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  vegetable: {
    type: String
  },
  batchNumber: {
    type: String
  },
  description: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
 
}, { timestamps: true }); // Add timestamps option here

// Create VegeExpense model
const VegeExpense = mongoose.model('VegeExpense', vegeExpenseSchema);

export default VegeExpense;
