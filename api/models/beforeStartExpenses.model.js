// models/BeforeStartExpenses.js

import mongoose from 'mongoose';

const expenditureSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    default: 'Before Start Expenditures',
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amountSpent: {
    type: Number,
    required: true,
  },
  recordedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const BeforeStartExpenses = mongoose.model('BeforeStartExpenses', expenditureSchema);

export default BeforeStartExpenses;
