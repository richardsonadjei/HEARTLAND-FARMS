import mongoose from 'mongoose';

const cashCropSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  additionalDetails: {
    type: String,
  },
}, {
  timestamps: true,
});

cashCropSchema.pre('save', async function (next) {
  try {
    if (!this.batchNumber) {
      // Find the maximum batchNumber with the same initials in the collection
      const latestBatch = await mongoose.model('CashCropsBatches').findOne({ type: this.type }, {}, { sort: { 'batchNumber': -1 } });

      // Generate the batch number
      const latestCounter = latestBatch ? parseInt(latestBatch.batchNumber.slice(3), 10) : 0;
      const nextCounter = latestCounter + 1;
      const formattedCounter = String(nextCounter).padStart(3, '0');
      this.batchNumber = `${this.type.slice(0, 3).toUpperCase()}${formattedCounter}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const CashCropsBatches = mongoose.model('CashCropsBatches', cashCropSchema);

export default CashCropsBatches;
