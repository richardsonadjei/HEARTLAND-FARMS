import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the UnsortedEgg schema
const unsortedEggSchema = new Schema({
  farmSection: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    default: 'unsorted',
  },
  grading: {
    type: String,
    enum: ['good-condition','deformed', 'cracked'],
    default: 'good-condition',
  },
  pickedBy: {
    type: String,
    required: true,
  }
}, {
  timestamps: true // Add timestamps (createdAt, updatedAt)
});

// Create the UnsortedEgg model
const UnsortedEgg = mongoose.model('UnsortedEgg', unsortedEggSchema);

export default UnsortedEgg;
