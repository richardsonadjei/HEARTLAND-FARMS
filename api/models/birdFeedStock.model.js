// birdFeedStockModel.mjs

import mongoose from 'mongoose';

// Define the schema for bird feed stock
const birdFeedStockSchema = new mongoose.Schema({
  feedName: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema
const BirdFeedStock = mongoose.model('BirdFeedStock', birdFeedStockSchema);

export default BirdFeedStock;
