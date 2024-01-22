// models/CassavaFarmMiscellaneousExpenditure.js

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

const CassavaFarmMiscellaneousExpenditure = mongoose.model('CassavaFarmMiscellaneousExpenditure', expenditureSchema);

export default CassavaFarmMiscellaneousExpenditure;
