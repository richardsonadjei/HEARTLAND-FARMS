// Import necessary modules from mongoose
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the BirdRelocation Schema
const birdRelocationSchema = new Schema({
    type: {
        type: String,
        required: true,
      },
  batchNumber: {
    type: String,
    required: true,
  },
  fromFarmSection: {
    type: String,
    required: true,
  },
  toFarmSection: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  relocationBy: {
    type: String,
    required: true,
  },
  relocationReason: {
    type: String,
    required: true,
  },
  relocationDate: {
    type: Date,
    default: Date.now,
  },
 
});

// Create and export the BirdRelocation model
const BirdRelocation = mongoose.model('BirdRelocation', birdRelocationSchema);
export default BirdRelocation;
