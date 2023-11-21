// Import required modules
import mongoose from 'mongoose';

// Define the FeedPurchase schema
const feedPurchaseSchema = new mongoose.Schema({
  feedName: {
    type: String,
    required: true,
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
    // Bank transaction details schema
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
    // Bank transaction details schema
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
});

// Define virtual for totalWeight
feedPurchaseSchema.virtual('totalWeight').get(function () {
  return this.quantityPurchased * parseFloat(this.weightPerBag);
});

// Define virtual for totalCost
feedPurchaseSchema.virtual('totalCost').get(function () {
  return this.costPerBag * this.quantityPurchased;
});

// Apply virtuals to JSON output
feedPurchaseSchema.set('toJSON', { getters: true });

// Create FeedPurchase model
const FeedPurchase = mongoose.model('FeedPurchase', feedPurchaseSchema);

// Export the model
export default FeedPurchase;
