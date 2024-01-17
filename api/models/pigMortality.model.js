import mongoose from 'mongoose';

// Define the schema
const pigMortalitySchema = new mongoose.Schema({
  pigIdentityNumber: {
    type: String,
    required: true,
  },
  dateOfDeath: {
    type: Date,
    required: true,
  },
  causeOfDeath: {
    type: String,
    required: true,
  },
  recordedBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model
const PigMortality = mongoose.model('PigMortality', pigMortalitySchema);

export default PigMortality;
