import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema, model } = mongoose;

const autoIncrement = AutoIncrementFactory(mongoose);

const pigStockSchema = new Schema(
  {
    identityNumber: {
      type: String,
    },
    identityTag: {
      type: String,
      enum: ['Red', 'Blue', 'White', 'Orange', 'Green', 'Yellow'],
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
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
      default: 'pigfarm',
    },
    gender: {
      type: String,
      enum: ['sow', 'boar'],
      required: true,
    },
    classification: {
      type: String,
      enum: ['Neonatal/Suckling Piglets', 'Weaner Pigs', 'Grower Pigs', 'Finisher Pigs'],
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

// Pre-save hook to generate the alphanumeric identityNumber and update classification
pigStockSchema.pre('save', async function (next) {
  try {
    if (!this.identityNumber) {
      const prefix = this.gender === 'sow' ? 'S' : 'B';
      const latestPigStock = await model('PigStock').findOne(
        { gender: this.gender },
        {},
        { sort: { 'identityNumber': -1 } }
      );
      const latestCounter = latestPigStock ? parseInt(latestPigStock.identityNumber.slice(1), 10) : 0;
      const nextCounter = latestCounter + 1;
      const formattedCounter = String(nextCounter).padStart(4, '0');
      this.identityNumber = `${prefix}${formattedCounter}`;
    }

    const currentDate = new Date();
    const arrivalDate = new Date(this.arrivalDate);
    const ageInMilliseconds = currentDate - arrivalDate;
    const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));
    const ageInWeeks = Math.floor(ageInDays / 7);
    const daysRemaining = ageInDays % 7;

    this.currentAge = `${ageInWeeks} week${ageInWeeks !== 1 ? 's' : ''} ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`;

    // Update classification based on current age
    if (ageInWeeks >= 0 && ageInWeeks <= 3) {
      this.classification = 'Neonatal/Suckling Piglets';
    } else if (ageInWeeks >= 4 && ageInWeeks <= 8) {
      this.classification = 'Weaner Pigs';
    } else if (ageInWeeks >= 9 && ageInWeeks <= 12) {
      this.classification = 'Grower Pigs';
    } else if (ageInWeeks >= 13 && ageInWeeks <= 24) {
      this.classification = 'Finisher Pigs';
    }

    next();
  } catch (error) {
    next(error);
  }
});

const PigStock = model('PigStock', pigStockSchema);

export default PigStock;
