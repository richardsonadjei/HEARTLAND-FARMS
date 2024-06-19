import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vegeHarvestingSchema = new Schema({
  vegetable: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  quantityHarvested: {
    type: String,
    required: true,
  },
  harvestDate: {
    type: Date,
    required: true,
  },
  additionalDetails: {
    type: String,
  },
}, {
  timestamps: true,
});

const VegeHarvesting = model('VegeHarvesting', vegeHarvestingSchema);

export default VegeHarvesting;
