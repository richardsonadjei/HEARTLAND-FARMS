import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the bird breed schema
const birdBreedSchema = new Schema({
  breedName: {
    type: String,
    required: true,
    unique: true, // Ensures no duplicate breed names
  },
  origin: {
    type: String,
    required: true,
  },
  characteristics: {
    type: String,
  },
  purpose: {
    type: String,
    enum: ['Egg Production', 'Meat Production', 'Dual Purpose', 'Ornamental', 'Other'],
    required: true,
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

// Create and export the bird breed model
export default mongoose.model('BirdBreed', birdBreedSchema);
