import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vegePestAndWeedControlSchema = new Schema({
  vegetable: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  pestAndWeedControlDetails: {
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

const VegePestAndWeedControl = model('VegePestAndWeedControl', vegePestAndWeedControlSchema);

export default VegePestAndWeedControl;
