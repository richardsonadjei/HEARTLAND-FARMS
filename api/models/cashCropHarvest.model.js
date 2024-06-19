// models/cashCropHarvest.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cashCropHarvestSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  harvestedQuantity: {
    type: String,
    required: true,
  },
  harvestedSpace: {
    type: String,
    required: true,
  },
  recordedBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const CashCropHarvest = model('CashCropHarvest', cashCropHarvestSchema);

export default CashCropHarvest;
