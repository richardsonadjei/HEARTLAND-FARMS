// Import required modules
import mongoose from 'mongoose';

// Define the FeedPurchase schema
const feedPurchaseSchema = new mongoose.Schema({
  feedName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  supplier: {
    type: String,
  },
  manufactureDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  weightPerBag: {
    type: String,
    required: true,
  },
  quantityPurchased: {
    type: Number,
    required: true,
  },
  costPerBag: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Bank Transaction', 'Momo'],
    required: true,
  },
  bankTransactionDetails: {
    bankName: {
      type: String,
    },
    paidInBy: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    transactionId: {
      type: String,
    },
  },
  momoTransactionDetails: {
    recipientName: {
      type: String,
    },
    momoNumber: {
      type: String,
    },
    transactionId: {
      type: String,
    },
  },
  purchasedBy: {
    type: String,
    required: true,
  },
  totalWeight: {
    type: Number,
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
});

// Pre-save hook to calculate totalWeight and totalCost
feedPurchaseSchema.pre('save', function (next) {
  this.totalWeight = this.quantityPurchased * parseFloat(this.weightPerBag);
  this.totalCost = this.costPerBag * this.quantityPurchased;
  next();
});

// Create BirdFeedPurchase model
const BirdFeedPurchase = mongoose.model('BirdFeedPurchase', feedPurchaseSchema);

// Export the model
export default BirdFeedPurchase;
