import mongoose from 'mongoose';

// Define the schema
const sowBirthSchema = new mongoose.Schema({
  sowIdentityNumber: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  numberOfMalePiglets: {
    type: Number,
    required: true,
  },
  numberOfFemalePiglets: {
    type: Number,
    required: true,
  },
  totalNumberOfPiglets: {
    type: Number,
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

// Pre-save middleware to calculate totalNumberOfPiglets
sowBirthSchema.pre('save', function (next) {
  this.totalNumberOfPiglets = this.numberOfMalePiglets + this.numberOfFemalePiglets;
  next();
});

// Create the model
const SowBirth = mongoose.model('SowBirth', sowBirthSchema);

export default SowBirth;
