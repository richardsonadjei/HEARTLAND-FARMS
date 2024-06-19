import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cashCropManualWeedingSchema = new Schema({
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

const CashCropManualWeeding = model('CashCropManualWeeding', cashCropManualWeedingSchema);

export default CashCropManualWeeding;
