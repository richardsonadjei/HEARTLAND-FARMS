import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vegeTransplantingSchema = new Schema({
  vegetable: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  quantityTransplanted: {
    type: String,
    required: true,
  },
  transplantingDate: {
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

const VegeTransplanting = model('VegeTransplanting', vegeTransplantingSchema);

export default VegeTransplanting; // Exporting the model
