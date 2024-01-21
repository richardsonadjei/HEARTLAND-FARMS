// models/MaizeFarmMiscellaneousExpenditure.js

import mongoose from 'mongoose';

const expenditureSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  category: {
    type: String,
    default: 'Miscellaneous Expenditures',
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

const MaizeFarmMiscellaneousExpenditure = mongoose.model('MaizeFarmMiscellaneousExpenditure', expenditureSchema);

export default MaizeFarmMiscellaneousExpenditure;
