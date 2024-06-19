import mongoose from 'mongoose';

// Define the schema for vaccination
const vaccinationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  animalId: {
    type: String,
    required: true
  },
  vaccineDetails: {
    type: String,
    required: true
  },
  methodOfAdministration: {
    type: String,
    required: true
  },
  dateAdministered: {
    type: Date,
    required: true
  },
  administeredBy: {
    type: String,
    required: true
  },
  nextDueDate: {
    type: Date,
    required: true
  },
  notes: String
}, { timestamps: true }); // Adding timestamps option

// Define the model for animalVaccination
const AnimalVaccination = mongoose.model('AnimalVaccination', vaccinationSchema);

export default AnimalVaccination;
