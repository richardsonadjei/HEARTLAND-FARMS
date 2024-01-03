// Import necessary dependencies
import mongoose from 'mongoose';

// Define the guineaFowlStockUpdate schema
const guineaFowlStockUpdateSchema = new mongoose.Schema({
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

// Create the guineaFowlStockUpdate model
const GuineaFowlStockUpdate = mongoose.model('GuineaFowlStockUpdate', guineaFowlStockUpdateSchema);

// Export the guineaFowlStockUpdate model
export default GuineaFowlStockUpdate;
