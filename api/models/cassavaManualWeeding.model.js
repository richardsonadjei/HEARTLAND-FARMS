// models/cassavaManualWeeding.model.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cassavaManualWeedingSchema = new Schema({
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
  spaceWeeded: {
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

const CassavaManualWeeding = model('CassavaManualWeeding', cassavaManualWeedingSchema);

export default CassavaManualWeeding;
