import mongoose from 'mongoose';

// Define the BirdFeedIssuance schema
const birdFeedIssuanceSchema = new mongoose.Schema({
  feedName: {
    type: String,
    required: true,
  },
  issuedDate: {
    type: Date,
    default: Date.now,
  },
  quantityIssued: {
    type: Number,
    required: true,
  },
  // You can add more fields here as needed
});

// Create the BirdFeedIssuance model
const BirdFeedIssuance = mongoose.model('BirdFeedIssuance', birdFeedIssuanceSchema);

export default BirdFeedIssuance;
