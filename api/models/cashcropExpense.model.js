import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define CashCropExpense schema
const cashCropExpenseSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
  },
  description: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  }
}, { timestamps: true }); // Add timestamps option here

// Create CashCropExpense model
const CashCropExpense = mongoose.model('CashCropExpense', cashCropExpenseSchema);

export default CashCropExpense;
