import mongoose from 'mongoose';

// Define the HR finance category schema
const hrFinanceCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to update the updatedAt field
hrFinanceCategorySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create the model from the schema
const HRFinanceCategory = mongoose.model('HRFinanceCategory', hrFinanceCategorySchema);

export default HRFinanceCategory;
