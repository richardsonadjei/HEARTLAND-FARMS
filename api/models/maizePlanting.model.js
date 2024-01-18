import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const maizePlantingSchema = new Schema({
  batchNumber: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  areaPlanted: {
    type: String,
    required: true,
  },
  maizeVariety: {
    type: String,
    required: true,
  },
  expectedMaturityDate: {
    type: String,
  },
  recordedBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

// Pre-save hook to calculate expectedMaturityDate based on date and fixed duration
maizePlantingSchema.pre('save', async function (next) {
  try {
    if (!this.expectedMaturityDate) {
      // Set a fixed maturity duration range between 100 and 120 days
      const minMaturityDuration = 100 * 24 * 60 * 60 * 1000; // 100 days in milliseconds
      const maxMaturityDuration = 120 * 24 * 60 * 60 * 1000; // 120 days in milliseconds

      // Calculate maturity duration within the specified range
      const maturityDuration = Math.floor(Math.random() * (maxMaturityDuration - minMaturityDuration + 1)) + minMaturityDuration;

      const startDateTime = this.date.getTime();
      const maturityDateTime = startDateTime + maturityDuration;

      const formattedStartDate = this.date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const formattedMaturityDate = new Date(maturityDateTime).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      this.expectedMaturityDate = `Between ${formattedStartDate} and ${formattedMaturityDate}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});

const MaizePlanting = model('MaizePlanting', maizePlantingSchema);

export default MaizePlanting;
