// Asset.js

import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define Asset schema
const AssetSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  
  acquisitionDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  value: {
    type: Number,
    required: true,
    min: 0,
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

// Create and export the Asset model
export default model('Asset', AssetSchema);
