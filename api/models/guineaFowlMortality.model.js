import mongoose from 'mongoose';

const guineaFowlMortalitySchema = new mongoose.Schema(
  {
    batchNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    quantity: {
      type: Number,
      required: true,
    },
    cause: {
      type: String,
      required: true,
    },
    recordedBy: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

const GuineaFowlMortality = mongoose.model('GuineaFowlMortality', guineaFowlMortalitySchema);

export default GuineaFowlMortality;
