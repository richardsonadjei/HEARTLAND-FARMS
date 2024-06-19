import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vaccinationSchema = new Schema({
  type: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
  },
  vaccinationDate: {
    type: Date,
    required: true,
  },
  vaccineName: {
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

const BirdVaccinationRecords = model('BirdVaccinationRecords', vaccinationSchema);

export default BirdVaccinationRecords;
