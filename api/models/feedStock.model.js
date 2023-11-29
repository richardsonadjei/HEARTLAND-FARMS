// Import required modules
import mongoose from 'mongoose';

// Define the FeedStock schema
const feedStockSchema = new mongoose.Schema({
  feedPurchaseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FeedPurchase',
    required: true,
  },
  feedName: {
    type: String,
    required: true,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  feedCategory: {
    type: String,
    required: true,
  },
  quantityInStock: {
    type: Number,
    required: true,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

// Create FeedStock model
const FeedStock = mongoose.model('FeedStock', feedStockSchema);

// Export the model
export default FeedStock;
