// hatchedEggsModel.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

// Schema for recording hatched eggs
const HatchedEggsSchema = new Schema({
  type: { type: String, required: true }, // New field for type of eggs (e.g., "Guinea Fowl")
  batchNumber: { type: String, required: true },
  numberOfEggsHatched: { type: Number, required: true },
  hatchingDate: { type: Date, default: Date.now },
  notes: { type: String },
  numberOfEggs: { type: Number, required: true },
  percentageHatched: { type: Number, default: 0 }, // Percentage of eggs hatched
}, { timestamps: true });

// Pre-save hook to calculate percentageHatched
HatchedEggsSchema.pre('save', function(next) {
  if (this.numberOfEggs === 0) {
    this.percentageHatched = 0;
  } else {
    this.percentageHatched = (this.numberOfEggsHatched / this.numberOfEggs) * 100;
  }
  next();
});

// Model for recording hatched eggs
const HatchedEggs = mongoose.model('HatchedEggs', HatchedEggsSchema);

export default HatchedEggs;
