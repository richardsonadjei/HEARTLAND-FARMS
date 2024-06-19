import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cashCropWeedicideApplicationSchema = new Schema({
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
  weedicideName: {
    type: String,
    required: true,
  },
  weedicideDescription: {
    type: String,
    required: true,
  },
  spaceApplied: {
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
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const CashCropWeedicideApplication = model('CashCropWeedicideApplication', cashCropWeedicideApplicationSchema);

export default CashCropWeedicideApplication;
