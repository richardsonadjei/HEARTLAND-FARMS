import mongoose from 'mongoose';

// Define the BirdTreatment Schema
const birdTreatmentSchema = new mongoose.Schema({
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

// Create and export the BirdTreatment model
const BirdTreatment = mongoose.model('BirdTreatment', birdTreatmentSchema);

export default BirdTreatment;
