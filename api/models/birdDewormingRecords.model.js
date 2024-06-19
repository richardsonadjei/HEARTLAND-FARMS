import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const dewormingSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
  },
  dewormingDate: {
    type: Date,
    required: true,
  },
  dewormerName: {
    type: String,
    required: true,
  },
  dosage: {
    type: String,
  },
  administrationMethod: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Done', 'Not Done'],
    default: 'Not Done',
  },
  comments: {
    type: String,
  },
});

const BirdDewormingRecords = model('BirdDewormingRecords', dewormingSchema);

export default BirdDewormingRecords;
