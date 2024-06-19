import mongoose from 'mongoose';

// Define cash crop schema
const cashCropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  }
}, { timestamps: true });

// Define cash crop model
const CashCrops = mongoose.model('CashCrops', cashCropSchema);

export default CashCrops;
