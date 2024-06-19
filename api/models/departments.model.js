// Import Mongoose
import mongoose from 'mongoose';

// Define the schema
const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
   
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Create the model
const Department = mongoose.model('Department', departmentSchema);

// Export the model
export default Department;
