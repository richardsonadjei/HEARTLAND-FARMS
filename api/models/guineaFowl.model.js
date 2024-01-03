import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema, model } = mongoose;

const autoIncrement = AutoIncrementFactory(mongoose);

const guineaFowlSchema = new Schema(
  {
    batchNumber: {
      type: String,
    },
    quantity: {
      type: Number,
      required: true,
    },
    arrivalDate: {
      type: Date,
    },
    currentAge: {
      type: String,
    
    },
    farmSection: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'guineaFowl',
     
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate the alphanumeric batchNumber
guineaFowlSchema.pre('save', async function (next) {
  try {
    if (!this.batchNumber) {
      // Find the maximum batchNumber in the collection
      const latestGuineaFowl = await model('GuineaFowlStock').findOne({}, {}, { sort: { 'batchNumber': -1 } });

      // Generate the batch number
      const latestCounter = latestGuineaFowl ? parseInt(latestGuineaFowl.batchNumber.slice(2), 10) : 0;
      const nextCounter = latestCounter + 1;
      const formattedCounter = String(nextCounter).padStart(3, '0');
      this.batchNumber = `GF${formattedCounter}`;
    }

    // Calculate current age in months and days
    const currentDate = new Date();
    const arrivalDate = new Date(this.arrivalDate);
    const ageInMilliseconds = currentDate - arrivalDate;
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    const ageInMonths = Math.floor(ageInDays / 30);
    const daysRemaining = ageInDays % 30;

    // Set the currentAge property in the format "X months Y days"
    this.currentAge = `${ageInMonths} month${ageInMonths !== 1 ? 's' : ''} ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`;

    next();
  } catch (error) {
    next(error);
  }
});

const GuineaFowlStock = model('GuineaFowlStock', guineaFowlSchema);

export default GuineaFowlStock;
