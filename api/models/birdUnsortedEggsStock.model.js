import mongoose from 'mongoose';
import cron from 'node-cron';

const { Schema } = mongoose;

const birdUnsortedEggStockSchema = new Schema({
  type: {
    type: String,
  },
  crates: {
    type: Number,
    default: 0,
  },
  loose: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});

// Add a pre-save hook to convert excess loose eggs to crates
birdUnsortedEggStockSchema.pre('save', function (next) {
  const eggsPerCrate = 30;

  // Calculate the number of full crates and remaining loose eggs
  const fullCrates = Math.floor(this.loose / eggsPerCrate);
  const remainingLoose = this.loose % eggsPerCrate;

  // Update the values in the schema
  this.crates += fullCrates;
  this.loose = remainingLoose;

  // Ensure that the number of loose eggs is always less than a crate's worth
  if (this.loose >= eggsPerCrate) {
    this.crates += 1;
    this.loose -= eggsPerCrate;
  }

  next();
});

const BirdUnsortedEggStock = mongoose.model('BirdUnsortedEggStock', birdUnsortedEggStockSchema);

// Define the cron job to run every minute
cron.schedule('* * * * *', async () => {
  try {
    const eggsPerCrate = 30;

    // Find all documents in the BirdUnsortedEggStock collection
    const eggStocks = await BirdUnsortedEggStock.find();

    // Iterate through each document and convert excess loose eggs to crates
    eggStocks.forEach(async (stock) => {
      const fullCrates = Math.floor((stock.loose + stock.crates * eggsPerCrate) / eggsPerCrate);
      const remainingLoose = (stock.loose + stock.crates * eggsPerCrate) % eggsPerCrate;

      // Update the values in the schema
      stock.crates = fullCrates;
      stock.loose = remainingLoose;

      // Save the updated document
      await stock.save();
    });

   
  } catch (error) {
    console.error('Error occurred during conversion:', error);
  }
});

export default BirdUnsortedEggStock;
