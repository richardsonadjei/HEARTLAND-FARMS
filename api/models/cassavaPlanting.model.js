import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cassavaPlantingSchema = new Schema({
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
  cassavaVariety: {
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
cassavaPlantingSchema.pre('save', async function (next) {
  try {
    if (!this.expectedMaturityDate) {
      const minMaturityDays = 240;
      const maxMaturityDays = 360;

      const startDate = new Date(this.date);
      
      // Calculate maturity dates based on fixed range
      const minMaturityDate = new Date(startDate);
      const maxMaturityDate = new Date(startDate);
      
      minMaturityDate.setDate(startDate.getDate() + minMaturityDays);
      maxMaturityDate.setDate(startDate.getDate() + maxMaturityDays);

      // Format dates for display
      const formattedStartDate = startDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const formattedMinMaturityDate = minMaturityDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const formattedMaxMaturityDate = maxMaturityDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      this.expectedMaturityDate = `Between ${formattedMinMaturityDate} and ${formattedMaxMaturityDate}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});


const CassavaPlanting = model('CassavaPlanting', cassavaPlantingSchema);

export default CassavaPlanting;
