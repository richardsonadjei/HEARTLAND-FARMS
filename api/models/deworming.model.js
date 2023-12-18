// models/Deworming.js
import mongoose from 'mongoose';

const dewormingSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  dewormingDate: {
    type: Date,
    required: true,
  },
  dewormerName: {
    type: String,
    required: true,
  },
  dewormedBy: {
    type: String,
    required: true,
  },
});

const Deworming = mongoose.model('Deworming', dewormingSchema);

export default Deworming;
