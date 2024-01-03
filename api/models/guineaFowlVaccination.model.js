// Import required modules
import mongoose from 'mongoose';

// Define the GuineaFowlVaccination schema
const guineaFowlVaccinationSchema = new mongoose.Schema(
  {
    batchNumber: {
      type: String,
      required: true,
    },
    vaccinationDate: {
      type: Date,
      required: true,
    },
    vaccine: {
      type: String,
      required: true,
    },
    ageInDays: {
      type: Number,
      required: true,
    },
    vaccinatedBy: {
      type: String,
      required: true,
    },
    // Add any other properties related to guinea fowl vaccination
  },
  {
    timestamps: true, // Add timestamps
  }
);

// Create GuineaFowlVaccination model
const GuineaFowlVaccination = mongoose.model('GuineaFowlVaccination', guineaFowlVaccinationSchema);

// Drop the index on batchNumber if it exists
GuineaFowlVaccination.collection.dropIndex({ batchNumber: 1 }, (err, result) => {
  if (err) {
    console.error('Error dropping index:', err);
  } else {
    console.log('Index dropped successfully:', result);
  }
});

// Export the model
export default GuineaFowlVaccination;
