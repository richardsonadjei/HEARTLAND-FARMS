import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the PoultryIncome schema
const poultryIncomeSchema = new Schema({
  category: {
    type: String,
    enum: ['poultry egg sales', 'bird sales'],
    default: 'poultry egg sales',
  },
  totalAmount: {
    type: Number,
  },
  salesNumber: {
    type: String,
    unique: true,
  },
}, {
  timestamps: true, // Add timestamps (createdAt, updatedAt)
});

// Create the PoultryIncome model
const PoultryIncome = mongoose.model('PoultryIncome', poultryIncomeSchema);

export default PoultryIncome;
