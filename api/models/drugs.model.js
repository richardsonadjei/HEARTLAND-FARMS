import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const MedicationSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  dosage: { type: String },
  usageInstructions: { type: String},
  warnings: { type: String},
  precautions: { type: String},
 
});

const Medication = model('Medication', MedicationSchema);

export default Medication;
