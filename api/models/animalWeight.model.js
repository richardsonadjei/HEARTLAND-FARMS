import mongoose from 'mongoose';

// Define the schema for animal weight records
const animalWeightSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
  animalId: {
    type: String,
    required: true
  },
  weight: {
    type: Number,
    required: true,
    min: 0 // Ensure weight is not negative
  },
  dateRecorded: {
    type: Date,
    required: true
  },
  recordedBy: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    trim: true
  }
}, { timestamps: true }); // Adding timestamps option

// Define the model for AnimalWeight
const AnimalWeight = mongoose.model('AnimalWeight', animalWeightSchema);

export default AnimalWeight;
