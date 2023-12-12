// medicationModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const medicationSchema = new Schema({
  name: {
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

const Medication = model('Medication', medicationSchema);

export default Medication;
