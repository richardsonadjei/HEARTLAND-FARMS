import mongoose from 'mongoose';

const birdMortalitySchema = new mongoose.Schema(
  {
    batchNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cause: {
      type: String,
      required: true,
    },
    recordedBy: {
      type: String,
      required: true,
    },
    // Add any additional fields related to mortality information
  },
  {
    timestamps: true,
  }
);

const BirdMortality = mongoose.model('BirdMortality', birdMortalitySchema);

export default BirdMortality;
