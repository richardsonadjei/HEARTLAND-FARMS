import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define AnimalFarmExpense schema
const animalFarmExpenseSchema = new Schema({
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
  identityNumber: {
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
    required: true
  }
}, { timestamps: true }); // Add timestamps option here

// Create AnimalFarmExpense model
const AnimalFarmExpense = mongoose.model('AnimalFarmExpense', animalFarmExpenseSchema);

export default AnimalFarmExpense;
