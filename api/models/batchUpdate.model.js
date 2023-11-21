// Import necessary dependencies
import mongoose from 'mongoose';

// Define the BatchUpdate schema
const batchUpdateSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  previousQuantity: {
    type: Number,
    required: true,
  },
  newQuantity: {
    type: Number,
    required: true,
  },
  updatedBy: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the BatchUpdate model
const BatchUpdate = mongoose.model('BatchUpdate', batchUpdateSchema);

// Export the BatchUpdate model
export default BatchUpdate;
