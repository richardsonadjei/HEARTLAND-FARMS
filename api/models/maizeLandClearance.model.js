import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema, model } = mongoose;

const autoIncrement = AutoIncrementFactory(mongoose);

const maizeLandPreparationSchema = new Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  areaCleared: {
    type: String,
    required: true,
  },
  machineryUsed: {
    type: String,
    default: 'cutlass',
  },
  recordedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});



const MaizeLandPreparation = model('MaizeLandPreparation', maizeLandPreparationSchema);

export default MaizeLandPreparation;
