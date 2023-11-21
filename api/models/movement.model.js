// Import necessary modules from mongoose
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the Movement Schema
const movementSchema = new Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  breed:{
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
  movementBy:{
    type: String,
    required: true,
},
movementReason: {
    type: String,
    required: true,
},
  movementDate: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Movement model
const Movement = mongoose.model('Movement', movementSchema);
export default Movement;
