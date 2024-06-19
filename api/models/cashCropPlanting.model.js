import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cashCropPlantingSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  datePlanted: {
    type: Date,
    required: true,
  },
  areaPlanted: {
    type: String,
    required: true,
  },
  expectedMaturityDate: {
    type: String,
    required: true,
  },
  recordedBy: {
    type: String,
    required: true,
  },
  numberPlanted: {
    type: Number,
    required: false,
  },
  additionalInformation: {
    type: String,
    required: false,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const CashCropPlanting = model('CashCropPlanting', cashCropPlantingSchema);

export default CashCropPlanting;
