// models/cassavaWeedicideApplication.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cassavaWeedicideApplicationSchema = new Schema({
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
    default: 'Spraying',
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

const CassavaWeedicideApplication = model('CassavaWeedicideApplication', cassavaWeedicideApplicationSchema);

export default CassavaWeedicideApplication;
