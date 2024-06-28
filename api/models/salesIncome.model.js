import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define SalesIncome schema
const salesIncomeSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  incomeCategory: {
    type: String,
    default: 'Sales'
  },
  farmCategory: {
    type: String,
    required: true,
    enum: ['CashCrop', 'Vegetables', 'Farm-Animals', 'Birds']
  },
  type: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    trim: true
  },
  
  recordedBy: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true }); // Add timestamps option here

// Create SalesIncome model
const SalesIncome = mongoose.model('SalesIncome', salesIncomeSchema);

export default SalesIncome;
