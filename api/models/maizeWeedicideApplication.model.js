// models/maizeWeedicideApplication.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const maizeWeedicideApplicationSchema = new Schema({
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
  weedicideName: {
    type: String,
    required: true,
  },
  weedicideDescription: {
    type: String,
    required: true,
  },
  applicationMethod: {
    type: String,
   default:'Spraying'
  },
  quantityApplied: {
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

const MaizeWeedicideApplication = model('MaizeWeedicideApplication', maizeWeedicideApplicationSchema);

export default MaizeWeedicideApplication;
