// models/BirdHealthDiagnosis.model.js
import mongoose from 'mongoose';

const birdHealthDiagnosisSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
      },
  batchNumber: {
    type: String,
  },
  observationDate: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  provisionalDiagnosis: {
    type: String,
    required: true,
  },
  recordedBy: {
    type: String,
    required: true,
  },
 
});

const BirdHealthDiagnosis = mongoose.model('BirdHealthDiagnosis', birdHealthDiagnosisSchema);

export default BirdHealthDiagnosis;
