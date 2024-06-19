import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define BirdFarmExpense schema
const birdFarmExpenseSchema = new Schema({
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
  },
  batchNumber: {
    type: String,
  },
  additionalDetails: {
    type: String,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  recordedBy: {
    type: String,
   
  }
}, { timestamps: true }); // Add timestamps option here

// Create BirdFarmExpense model
const BirdFarmExpense = mongoose.model('BirdFarmExpense', birdFarmExpenseSchema);

export default BirdFarmExpense;
