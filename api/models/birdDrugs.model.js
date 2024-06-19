import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const BirdDrugsSchema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  dosage: { type: String },
  usageInstructions: { type: String },
  warnings: { type: String },
  precautions: { type: String },
});

const BirdDrugs = model('BirdDrugs', BirdDrugsSchema);

export default BirdDrugs;
