// Import Mongoose
import mongoose from 'mongoose';

// Define the schema for positions
const positionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true, // Active by default
  },
});

// Create the model based on the schema
const Position = mongoose.model('Position', positionSchema);

// Export the model to be used in other parts of the application
export default Position;
