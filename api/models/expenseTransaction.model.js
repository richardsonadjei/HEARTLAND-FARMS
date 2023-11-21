// Import required modules
import mongoose from 'mongoose';

// Define the ExpenseTransaction schema
const expenseTransactionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
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
    transactionID: {
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

// Create ExpenseTransaction model
const ExpenseTransaction = mongoose.model('ExpenseTransaction', expenseTransactionSchema);

// Export the model
export default ExpenseTransaction;
