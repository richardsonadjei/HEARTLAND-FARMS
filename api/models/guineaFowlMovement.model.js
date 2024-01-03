// Import necessary modules from mongoose
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the GuineaFowlMovement Schema
const guineaFowlMovementSchema = new Schema({
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
  movementBy: {
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
}, { timestamps: true }); // Adding timestamps to the schema

// Create and export the GuineaFowlMovement model
const GuineaFowlMovement = mongoose.model('GuineaFowlMovement', guineaFowlMovementSchema);
export default GuineaFowlMovement;
