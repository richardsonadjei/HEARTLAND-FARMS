// Importing mongoose library
import mongoose from 'mongoose';

// Define the schema for bird mortality
const birdMortalitySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
  },
  mortalityDate: {
    type: Date,
    required: true
  },
  causeOfDeath: {
    type: String,
    required: true
  },
  batchDetails: [
    {
      gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
      },
      quantity: { type: Number },
    },
  ],
  notes: String,
});

// Create a model for bird mortality
const BirdMortality = mongoose.model('BirdMortality', birdMortalitySchema);

export default BirdMortality;
