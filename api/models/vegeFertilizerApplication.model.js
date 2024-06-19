import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vegeFertilizerApplicationSchema = new Schema({
  vegetable: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  fertilizerDetails: {
    type: String,
    required: true,
  },
  quantityApplied: {
    type: String,
    required: true,
  },
  applicationDate: {
    type: Date,
    required: true,
  },
  additionalDetails: {
    type: String,
  },
}, {
  timestamps: true,
});

const VegeFertilizerApplication = model('VegeFertilizerApplication', vegeFertilizerApplicationSchema);

export default VegeFertilizerApplication;
