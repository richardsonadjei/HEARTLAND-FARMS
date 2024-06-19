import mongoose from 'mongoose';

// Define vegetable schema
const vegetableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define vegetable model
const Vegetable = mongoose.model('Vegetable', vegetableSchema);

export default Vegetable;
