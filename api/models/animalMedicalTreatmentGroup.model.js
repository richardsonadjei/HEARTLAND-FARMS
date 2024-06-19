// Import necessary modules
import mongoose from 'mongoose';

// Define the animal medical treatment group schema
const animalMedicalTreatmentGroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  }
}, { timestamps: true });

// Create the animal medical treatment group model
const AnimalMedicalTreatmentGroup = mongoose.model('AnimalMedicalTreatmentGroup', animalMedicalTreatmentGroupSchema);

// Export the model
export default AnimalMedicalTreatmentGroup;
