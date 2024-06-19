import mongoose from 'mongoose';

const { Schema } = mongoose;

const animalSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
});

export default mongoose.model('NewAnimal', animalSchema);
