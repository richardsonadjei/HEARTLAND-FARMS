// models/CassavaSale.js

import mongoose from 'mongoose';

const cassavaSaleSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  saleDate: {
    type: Date,
    required: true,
  },
  unitPricePerSack: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityOfSacksSold: {
    type: Number,
    required: true,
    min: 0,
  },
  saleAmount: {
    type: Number,
  },
  soldBy: {
    type: String,
    required: true,
  },
  // other sale-related fields
});

// Add a pre-save middleware to calculate saleAmount
cassavaSaleSchema.pre('save', function (next) {
  this.saleAmount = this.unitPricePerSack * this.quantityOfSacksSold;
  next();
});

const CassavaSale = mongoose.model('CassavaSale', cassavaSaleSchema);

export default CassavaSale;
