// Import required dependencies
import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  telephoneNumber: {
    type: String,
    required: true
  },
  ghanaCardNumber: {
    type: String,
    required: true
  },
  bankBranch: {
    type: String,
    required: true
  },
  nextOfKin: {
    name: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    ghanaCardNumber: {
      type: String,
      required: true
    }
  },
  witness: {
    name: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    enum: ['admin', 'manager', 'employee'],
    default: 'employee'
  },
},
{ timestamps: true }
);

// Create and export the User model
export default mongoose.model('User', userSchema);