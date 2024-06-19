import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cashCropPestAndDiseaseControlSchema = new Schema({
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
  pestOrDiseaseName: {
    type: String,
    required: true,
  },
  controlMethod: {
    type: String,
    required: true,
  },
  controlAgentUsed: {
    type: String,
    required: true,
  },
  quantityUsed: {
    type: String,
    required: true,
  },
  spaceAffected: {
    type: String,
    required: true,
  },
  applicationMethod: {
    type: String,
    default: 'Spraying',
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

const CashCropPestAndDiseaseControl = model('CashCropPestAndDiseaseControl', cashCropPestAndDiseaseControlSchema);

export default CashCropPestAndDiseaseControl;
