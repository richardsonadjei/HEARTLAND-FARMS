import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the SortedEgg schema
const sortedEggSchema = new Schema({
  farmSection: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large', 'extraLarge'], // Added size categorization
    required: true,
  },
  crates: {
    type: Number,
    default: 0,
  },
  loose: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    default: 'sorted', // Updated default category to 'sorted'
  },
  grading: {
    type: String,
    enum: ['good-condition', 'deformed', 'cracked'],
    default: 'good-condition',
  },
  pickedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true // Add timestamps (createdAt, updatedAt)
});

// Create the SortedEgg model
const SortedEgg = mongoose.model('SortedEgg', sortedEggSchema);

export default SortedEgg;
