import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const PigMedicationSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  dosage: { type: String },
  usageInstructions: { type: String},
  warnings: { type: String},
  precautions: { type: String},
});

const PigMedication = model('PigMedication', PigMedicationSchema);

export default PigMedication;
