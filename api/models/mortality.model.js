import mongoose from 'mongoose';

const MortalitySchema = new mongoose.Schema(
  {
    batchNumber: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    count: {
      type: Number,
      required: true,
      min: 1,
    },
    cause: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
    },
    recordedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const MortalityModel = mongoose.model('Mortality', MortalitySchema);

export default MortalityModel;
