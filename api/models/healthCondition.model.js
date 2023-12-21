// models/healthCondition.model.js
import mongoose from 'mongoose';

const healthConditionSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
    required: true,
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
  recordedBy:{
    type: String,
    required: true,
  }
  
});

const HealthCondition = mongoose.model('HealthCondition', healthConditionSchema);

export default HealthCondition;
