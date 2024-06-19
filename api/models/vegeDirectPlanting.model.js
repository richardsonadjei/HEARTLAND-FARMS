import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vegeDirectPlantingSchema = new Schema({
  vegetable: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  quantityDirectPlanted: { // Changed from quantityTransplanted to quantityPlanted
    type: String,
    required: true,
  },
  plantingDate: { // Changed from transplantingDate to plantingDate
    type: Date,
    required: true,
  },
  expectedHarvestDate: {
    type: Date,
    required: true,
  },
  numberOfBeds: {
    type: Number,
    required: true,
  },
  additionalDetails: {
    type: String,
  },
}, {
  timestamps: true,
});

const VegeDirectPlanting = model('VegeDirectPlanting', vegeDirectPlantingSchema); // Changed model name to VegeDirectPlanting

export default VegeDirectPlanting;
