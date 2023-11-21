import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const farmSectionSchema = new Schema({
  sectionName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
  },
  lighting: {
    bulbType: {
      type: String,
      required: true,
    },
    bulbCount: {
      type: Number,
      required: true,
    },
    bulbWattage: {
      type: Number,
    },
  },
  layingPoints: {
    layingPointType: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  feeders: {
    feederType: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  drinkers: {
    drinkerType: {
      type: String,
    },
    quantity: {
      type: Number,
    },
  },
  // Add more fields as needed for specific location details
}, {
  timestamps: true,
});

const FarmSection = model('FarmSection', farmSectionSchema);

export default FarmSection;
