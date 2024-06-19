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

// Pre-save middleware to calculate totalAmount for batch details and overall total amount
birdSaleSchema.pre('save', function(next) {
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
