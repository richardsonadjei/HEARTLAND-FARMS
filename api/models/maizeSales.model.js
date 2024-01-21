// models/MaizeSale.js

import mongoose from 'mongoose';

const maizeSaleSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  saleDate: {
    type: Date,
    required: true,
  },
  unitPricePerCup: {
    type: Number,
    required: true,
    min: 0,
  },
  quantityOfCupsSold: {
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
maizeSaleSchema.pre('save', function (next) {
  this.saleAmount = this.unitPricePerCup * this.quantityOfCupsSold;
  next();
});

const MaizeSale = mongoose.model('MaizeSale', maizeSaleSchema);

export default MaizeSale;
