import mongoose from 'mongoose';

const validCategories = [
  'Land Preparation',
  'Planting',
  'Fertilizer Application',
  'Pest and Disease Control',
  'Manual Weeding',
  'Weedicide Application',
  'Harvesting',
  'Storage',
  'Equipment Purchase',
  'Weedicide Purchase',
  'Fertilizer Purchase',
  'Other Expenses'
];

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
    enum: validCategories,
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

const CassavaFarmExpenditure = mongoose.model('CassavaFarmExpenditure', expenditureSchema);

export default CassavaFarmExpenditure;
