import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the BirdSale schema
const birdSaleSchema = new Schema({
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  customerName: {
    type: String,
  },
  type: {
    type: String,
    required: true
  },
  batchNumber: {
    type: String,
  },
  salesNumber: {
    type: String,
  
  },
  batchDetails: [
    {
      gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
      },
      quantity: {
        type: Number,
      },
      pricePerBird: {
        type: Number,
        required: true,
        min: 0
      },
      subTotalAmount: {
        type: Number,
        min: 0
      },
    }
  ],
  totalAmount: {
    type: Number,
    min: 0
  },
  additionalDetails: {
    type: String
  }
});

// Pre-save middleware to generate unique sales number and calculate amounts
birdSaleSchema.pre('save', async function(next) {
  // Generate a unique sales number if it doesn't exist
  if (!this.salesNumber) {
    const latestSale = await BirdSale.findOne({}, {}, { sort: { 'createdAt' : -1 } }); // Get the latest sale
    const lastSalesNumber = latestSale ? parseInt(latestSale.salesNumber.substr(1)) : 0; // Extract the number part and convert to integer
    this.salesNumber = 'S' + (lastSalesNumber + 1); // Construct the new sales number
  }

  // Calculate subTotalAmount for each batch detail and totalAmount
  let totalAmount = 0;
  this.batchDetails.forEach(batch => {
    batch.subTotalAmount = batch.quantity * batch.pricePerBird;
    totalAmount += batch.subTotalAmount;
  });

  this.totalAmount = totalAmount;
  next();
});

// Create the BirdSale model
const BirdSale = mongoose.model('BirdSale', birdSaleSchema);

export default BirdSale;
