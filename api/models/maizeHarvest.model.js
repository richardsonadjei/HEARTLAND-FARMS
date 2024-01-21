// models/maizeHarvest.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const maizeHarvestSchema = new Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
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
});

const MaizeHarvest = model('MaizeHarvest', maizeHarvestSchema);

export default MaizeHarvest;
