import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const pigBreedSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    origin: {
      type: String,
    },
    averageWeight: {
      type: Number,
    },
    // You can add more fields based on your requirements
  },
  {
    timestamps: true,
  }
);

const PigBreed = model('PigBreed', pigBreedSchema);

export default PigBreed;
