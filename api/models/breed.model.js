import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const poultryBreedSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  averageLifespan: {
    type: Number,
   
  },
  averageEggsPerYear: {
    type: Number,
 
  },
  colorVarieties: {
    type: [String],
  },
  origin: {
    type: String,
  },
  size: {
    type: String,
  },
  // Add any other properties specific to poultry breeds
}, {
  timestamps: true,
});

const PoultryBreed = model('PoultryBreed', poultryBreedSchema);

export default PoultryBreed;
