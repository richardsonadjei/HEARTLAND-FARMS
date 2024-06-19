import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define AnimalMortality schema
const animalMortalitySchema = new Schema({
  type: {
    type: String,
    required: true
  },
  animalId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  cause: {
    type: String,
    required: true
  },
  recordedBy: {
    type: String,
    required: true
  },
  notes: String
}, { timestamps: true }); // Add timestamps option to automatically manage createdAt and updatedAt fields

// Create AnimalMortality model
const AnimalMortality = mongoose.model('AnimalMortality', animalMortalitySchema);

export default AnimalMortality;
