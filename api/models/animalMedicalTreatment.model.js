// Import necessary modules
import mongoose from 'mongoose';

// Define the medical treatment schema
const medicalTreatmentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    animalId: {
        type: String,
        required: true
    },
    treatmentType: {
        type: String,
        required: true
    },
    treatmentDate: {
        type: Date,
        required: true
    },
    medicationAndDosage: {
        type: String,
        required: true
    },
    veterinarian: {
        type: String,
        required: true
    },
    notes: String,
    recordedBy: {
        type: String,
        required: true
    }
}, { timestamps: true });

// Create the medical treatment model with the name 'AnimalMedicalTreatmentRecord'
const AnimalMedicalTreatmentRecord = mongoose.model('AnimalMedicalTreatmentRecord', medicalTreatmentSchema);

// Export the model
export default AnimalMedicalTreatmentRecord;
