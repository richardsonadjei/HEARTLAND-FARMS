// models/CassavaSeason.js

import mongoose from 'mongoose';

const cassavaSeasonSchema = new mongoose.Schema({
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
cassavaSeasonSchema.pre('save', async function (next) {
  try {
    if (!this.batchNumber) {
      // Find the maximum batchNumber in the collection
      const latestCassavaSeason = await mongoose.model('CassavaSeason').findOne({}, {}, { sort: { 'batchNumber': -1 } });

      // Generate the batch number
      const latestCounter = latestCassavaSeason ? parseInt(latestCassavaSeason.batchNumber.slice(3), 10) : 0;
      const nextCounter = latestCounter + 1;
      const formattedCounter = String(nextCounter).padStart(3, '0');
      this.batchNumber = `CFS${formattedCounter}`;
    }

    // Calculate endDate based on startDate and fixed durations
    const startDateTime = new Date(this.startDate).getTime();
    const duration240 = 240 * 24 * 60 * 60 * 1000;
    const duration360 = 360 * 24 * 60 * 60 * 1000;

    // Calculate end dates
    const endDateTime240 = startDateTime + duration240;
    const endDateTime360 = startDateTime + duration360;

    // Format endDate as a string in the specified range
    const formattedStartDate = this.startDate.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const formattedEndDate240 = new Date(endDateTime240).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const formattedEndDate360 = new Date(endDateTime360).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });

    this.endDate = `Between ${formattedEndDate240} and ${formattedEndDate360}`;

    next();
  } catch (error) {
    next(error);
  }
});

const CassavaSeason = mongoose.model('CassavaSeason', cassavaSeasonSchema);

export default CassavaSeason;
