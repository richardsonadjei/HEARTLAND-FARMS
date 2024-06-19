import mongoose from 'mongoose';

// Define the schema for bird additions
const birdAdditionSchema = new mongoose.Schema({
  gender: { type: String, enum: ['male', 'female'] }, // Gender of the bird
  healthStatus: { type: String, enum: ['Healthy', 'Sick', 'Recovered'], default: 'Healthy' }, // Health status of the bird
  quantity: { type: Number, required: true }, // Quantity of birds added
  addedAt: { type: Date, default: Date.now } // Timestamp of when the birds were added
});

// Define the batch schema which includes the array of bird additions
const batchSchema = new mongoose.Schema({
  type: { type: String,required: true }, // Type of the bird
  batchNumber: { type: String, required: true }, // Batch number
  birdAdditions: [birdAdditionSchema] // Array of bird additions
});

// Define the model for batches
const BirdBatchAdditions = mongoose.model('BirdBatchAdditions', batchSchema);

export default BirdBatchAdditions;
