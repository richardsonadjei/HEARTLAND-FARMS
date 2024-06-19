// vaccinationModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vaccinationSchema = new Schema({
  drugName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ageRangeStart: {
    type: Number,
    required: true,
  },
  ageRangeEnd: {
    type: Number,
    required: true,
  },
});

const BirdVaccinationChart = model('BirdVaccinationChart', vaccinationSchema);

export default BirdVaccinationChart;
