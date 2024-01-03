import mongoose from 'mongoose';

// Define the GuineaFowlTreatment Schema
const guineaFowlTreatmentSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  treatmentDate: {
    type: Date,
    default: Date.now,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  medications: [
    {
      medication: {
        type: String,
        required: true,
      },
      dosage: {
        type: String,
        required: true,
      },
    },
  ],
  notes: String,
  treatmentDoneBy: {
    type: String,
    required: true,
  },
});

// Create and export the GuineaFowlTreatment model
const GuineaFowlTreatment = mongoose.model('GuineaFowlTreatment', guineaFowlTreatmentSchema);

export default GuineaFowlTreatment;
