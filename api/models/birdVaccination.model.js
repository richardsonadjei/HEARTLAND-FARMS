// Import required modules
import mongoose from 'mongoose';

// Define the BirdVaccination schema
const birdVaccinationSchema = new mongoose.Schema(
  {
    batchNumber: {
      type: String,
      required: true,
    },
    breed: {
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
    // Add any other properties related to bird vaccination
  },
  {
    timestamps: true, // Add timestamps
  }
);

// Create BirdVaccination model
const BirdVaccination = mongoose.model('BirdVaccination', birdVaccinationSchema);

// Drop the index on batchNumber if it exists
BirdVaccination.collection.dropIndex({ batchNumber: 1 }, (err, result) => {
  if (err) {
    console.error('Error dropping index:', err);
  } else {
    console.log('Index dropped successfully:', result);
  }
});

// Export the model
export default BirdVaccination;
