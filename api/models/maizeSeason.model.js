// models/MaizeSeason.js

import mongoose from 'mongoose';

const maizeSeasonSchema = new mongoose.Schema({
  batchNumber: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: String,
   
  },
  additionalDetails: {
    type: String,
  },
}, {
  timestamps: true,
});

// Pre-save hook to generate the alphanumeric batchNumber and calculate endDate
maizeSeasonSchema.pre('save', async function (next) {
  try {
    if (!this.batchNumber) {
      // Find the maximum batchNumber in the collection
      const latestMaizeSeason = await mongoose.model('MaizeSeason').findOne({}, {}, { sort: { 'batchNumber': -1 } });

      // Generate the batch number
      const latestCounter = latestMaizeSeason ? parseInt(latestMaizeSeason.batchNumber.slice(3), 10) : 0;
      const nextCounter = latestCounter + 1;
      const formattedCounter = String(nextCounter).padStart(3, '0');
      this.batchNumber = `MFS${formattedCounter}`;
    }

    // Calculate endDate based on startDate and fixed durations
    const startDateTime = new Date(this.startDate).getTime();
    const duration70 = 70 * 24 * 60 * 60 * 1000;
    const duration100 = 100 * 24 * 60 * 60 * 1000;

    // Calculate end dates
    const endDateTime70 = startDateTime + duration70;
    const endDateTime100 = startDateTime + duration100;

    // Format endDate as a string in the specified range
    const formattedStartDate = this.startDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const formattedEndDate70 = new Date(endDateTime70).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const formattedEndDate100 = new Date(endDateTime100).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    this.endDate = `Between ${formattedEndDate70} and ${formattedEndDate100}`;

    next();
  } catch (error) {
    next(error);
  }
});

const MaizeSeason = mongoose.model('MaizeSeason', maizeSeasonSchema);

export default MaizeSeason;
