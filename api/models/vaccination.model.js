// vaccinationModel.js
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vaccinationSchema = new Schema({
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

const Vaccination = model('Vaccination', vaccinationSchema);

export default Vaccination;
