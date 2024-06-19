import mongoose from 'mongoose';
import cron from 'node-cron';

const { Schema } = mongoose;

const BirdEggsIncubatorLoadingSchema = new Schema({
  type: { type: String, required: true },
  batchNumber: { type: String },
  dateLoaded: { type: Date, required: true },
  numberOfEggs: { type: Number, required: true },
  incubatorId: { type: String, required: true },
  notes: { type: String },
  currentAge: { type: String },
  expectedHatchDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['active', 'due', 'overdue', 'hatched'],
    default: 'active',
  },
  statusImmutable: { type: Boolean, default: false }, // New field to track immutable status
}, { timestamps: true });

// Autogenerate batchNumber based on type
BirdEggsIncubatorLoadingSchema.pre('save', async function (next) {
  // Generate the batchNumber only if it's a new document (not updating)
  if (!this.isNew) {
    return next();
  }

  try {
    // Extract first two letters of the type and convert to uppercase
    const prefix = this.type.substring(0, 2).toUpperCase();

    // Find the latest document with the same prefix to determine the next sequence number
    const latest = await this.constructor.findOne({ type: this.type }).sort('-createdAt').exec();

    // Determine the next sequence number
    let sequenceNumber = 1;
    if (latest && latest.batchNumber) {
      const lastSequence = parseInt(latest.batchNumber.slice(-4), 10);
      sequenceNumber = lastSequence + 1;
    }

    // Format the sequence number with leading zeros
    const paddedSequenceNumber = sequenceNumber.toString().padStart(4, '0');

    // Construct the batchNumber in the format: POHatch0001
    this.batchNumber = `${prefix}Hatch${paddedSequenceNumber}`;

    // Ensure incubatorId is not null
    if (!this.incubatorId) {
      throw new Error('incubatorId is required');
    }
    
    next();
  } catch (error) {
    next(error);
  }
});

// Ensure statusImmutable is set to true when status is 'hatched'
BirdEggsIncubatorLoadingSchema.pre('save', function (next) {
  if (this.status === 'hatched') {
    this.statusImmutable = true;
  }
  next();
});

// Schedule cron job to update currentAge and status
cron.schedule('* * * * *', async () => { // Runs every day at midnight
  try {
    const batches = await BirdEggsIncubatorLoading.find({ statusImmutable: false });

    for (let batch of batches) {
      // Update currentAge based on dateLoaded
      const diffInMs = Date.now() - batch.dateLoaded.getTime();
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      batch.currentAge = `${diffInDays} days`;

      // Update status based on expectedHatchDate
      if (batch.expectedHatchDate) {
        const currentDate = new Date();

        // Calculate days until expected hatch date
        const daysUntilExpectedHatch = Math.floor((batch.expectedHatchDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

        if (daysUntilExpectedHatch < 0) {
          // overdue
          batch.status = 'overdue';
        } else if (daysUntilExpectedHatch === 0) {
          // due
          batch.status = 'due';
        } else if (currentDate >= batch.expectedHatchDate) {
          // hatched
          batch.status = 'hatched';
          batch.statusImmutable = true; // Set statusImmutable to true once status is 'hatched'
        } else {
          // active (if none of the above conditions match)
          batch.status = 'active';
        }
      }

      await batch.save();
    }
  } catch (error) {
    console.error('Error updating currentAge and status:', error);
  }
});

const BirdEggsIncubatorLoading = mongoose.model('BirdEggsIncubatorLoading', BirdEggsIncubatorLoadingSchema);

export default BirdEggsIncubatorLoading;
