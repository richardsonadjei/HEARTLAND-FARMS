import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const birdFarmSectionSchema = new Schema({
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
    
    },
    bulbCount: {
      type: Number,
  
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

const BirdFarmSection = model('BirdFarmSection', birdFarmSectionSchema);

export default BirdFarmSection;
