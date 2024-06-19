import mongoose from 'mongoose';

const otherPaymentsSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  }
});

const OtherPayments = mongoose.model('OtherPayments', otherPaymentsSchema);

export default OtherPayments;
