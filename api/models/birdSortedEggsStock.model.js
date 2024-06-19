import mongoose from 'mongoose';
import cron from 'node-cron';

const { Schema } = mongoose;

const birdSortedEggsStockSchema = new Schema(
  {
    type: {
      type: String,
    },
    sizes: {
      small: {
        crates: {
          type: Number,
          default: 0,
        },
        loose: {
          type: Number,
          default: 0,
        },
      },
      medium: {
        crates: {
          type: Number,
          default: 0,
        },
        loose: {
          type: Number,
          default: 0,
        },
      },
      large: {
        crates: {
          type: Number,
          default: 0,
        },
        loose: {
          type: Number,
          default: 0,
        },
      },
      extraLarge: {
        crates: {
          type: Number,
          default: 0,
        },
        loose: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Function to convert excess loose eggs to crates
const convertExcessLooseEggs = (birdStock) => {
  const eggsPerCrate = 30;

  // Loop through each size and convert excess loose eggs to crates
  Object.keys(birdStock.sizes).forEach((size) => {
    const sizeData = birdStock.sizes[size];
    
    // Calculate the number of full crates and remaining loose eggs
    const fullCrates = Math.floor(sizeData.loose / eggsPerCrate);
    const remainingLoose = sizeData.loose % eggsPerCrate;

    // Update the values for the current size
    sizeData.crates += fullCrates;
    sizeData.loose = remainingLoose;
  });

  return birdStock;
};

// Cron job to convert excess loose eggs to crates every minute
cron.schedule('* * * * *', async () => {
  try {
    const birdStock = await BirdSortedEggsStock.findOne();
    if (birdStock) {
      const updatedBirdStock = convertExcessLooseEggs(birdStock);
      await updatedBirdStock.save();
    }
  } catch (error) {
    console.error('Error converting excess loose eggs to crates:', error);
  }
});

const BirdSortedEggsStock = mongoose.model('BirdSortedEggsStock', birdSortedEggsStockSchema);

export default BirdSortedEggsStock;
