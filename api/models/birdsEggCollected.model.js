import mongoose from 'mongoose';
import cron from 'node-cron';

const { Schema } = mongoose;

// Define the BirdEggsCollected schema
const birdEggsCollectedSchema = new Schema(
  {
    type: {
      type: String,
    },
    farmSection: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    size: {
      type: String,
      enum: ['small', 'medium', 'large', 'extraLarge', ''],
    },
    crates: {
      type: Number,
      default: 0,
    },
    loose: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ['sorted', 'unsorted'],
      default: 'unsorted',
    },
    grading: {
      type: String,
      enum: ['good-condition', 'deformed', 'cracked'],
      default: 'good-condition',
    },
    recordedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add timestamps (createdAt, updatedAt)
  }
);

// Function to convert excess loose eggs to crates
const convertExcessLooseEggs = (birdStock) => {
  const eggsPerCrate = 30;

  // Calculate the number of full crates and remaining loose eggs
  const fullCrates = Math.floor(birdStock.loose / eggsPerCrate);
  const remainingLoose = birdStock.loose % eggsPerCrate;

  // Update the values
  birdStock.crates += fullCrates;
  birdStock.loose = remainingLoose;

  return birdStock;
};

// Cron job to convert excess loose eggs to crates every minute
cron.schedule('* * * * *', async () => {
  try {
    const birdStocks = await BirdEggsCollected.find({});

    birdStocks.forEach(async (stock) => {
      const updatedBirdStock = convertExcessLooseEggs(stock);
      await updatedBirdStock.save();
    });


  } catch (error) {
    console.error('Error converting excess loose eggs to crates:', error);
  }
});

// Create the BirdEggsCollected model
const BirdEggsCollected = mongoose.model('BirdEggsCollected', birdEggsCollectedSchema);

export default BirdEggsCollected;
