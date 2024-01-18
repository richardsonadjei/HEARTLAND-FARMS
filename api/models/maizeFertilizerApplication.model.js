// models/maizeFertilizerApplication.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const maizeFertilizerApplicationSchema = new Schema({
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
  spaceApplied: {
    type: String,
    required: true,
  },
  fertilizerName: {
    type: String,
    required: true,
  },
  fertilizerDescription: {
    type: String,
    required: true,
  },
  applicationMethod: {
    type: String,
    required: true,
  },
  amountApplied: {
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

const MaizeFertilizerApplication = model('MaizeFertilizerApplication', maizeFertilizerApplicationSchema);

export default MaizeFertilizerApplication;
