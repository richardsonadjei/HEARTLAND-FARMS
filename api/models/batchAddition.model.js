// models/batchAddition.model.js
import mongoose from 'mongoose';

const batchAdditionSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  addedQuantity: {
    type: Number,
    required: true,
  },
  newQuantity: {
    type: Number,
    required: true,
},
  addedBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BatchAddition = mongoose.model('BatchAddition', batchAdditionSchema);

export default BatchAddition;
