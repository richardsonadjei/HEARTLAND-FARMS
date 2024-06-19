import mongoose from 'mongoose';
import cron from 'node-cron';

const birdBatchesCounterSchema = new mongoose.Schema({
  type: { type: String, required: true },
  counter: { type: Number, default: 0 },
});

const BirdBatchesCounter = mongoose.model('BirdBatchesCounter', birdBatchesCounterSchema);

const birdBatchSchema = new mongoose.Schema({
  type: { type: String, required: true },
  batchNumber: { type: String, unique: true },
  breed: { type: String,required: true },
  birthDate: { type: Date,required: true },
  currentAge: { type: String },
  ageCategory: { type: String },
  batchDetails: [
    {
      gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
      },
      healthStatus: {
        type: String,
        enum: ['Healthy', 'Sick', 'Recovered'],
        default: 'Healthy',
      },
      quantity: { type: Number },
    },
  ],
  farmHouseLocation: { type: String },
  totalQuantity: { type: Number, default: 0 },
  additionalDetails: { type: String },
  isActive: { type: Boolean, default: true },
  recordedBy: { type: String },
}, { timestamps: true });

birdBatchSchema.pre('save', async function (next) {
  try {
    if (!this.batchNumber) {
      const counterDoc = await BirdBatchesCounter.findOneAndUpdate(
        { type: this.type },
        { $inc: { counter: 1 } },
        { new: true, upsert: true }
      );

      const nextCounter = counterDoc.counter;
      const formattedCounter = String(nextCounter).padStart(4, '0');
      this.batchNumber = `${this.type.slice(0, 3).toUpperCase()}${formattedCounter}`;
    }

    this.totalQuantity = this.batchDetails.reduce((acc, detail) => acc + detail.quantity, 0);

    this.updateCurrentAge();
    this.updateAgeCategory();

    next();
  } catch (error) {
    next(error);
  }
});

birdBatchSchema.methods.updateCurrentAge = function() {
  const diffInMs = Date.now() - this.birthDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffInDays / 30);
  const remainingDays = diffInDays % 30;
  const weeks = Math.floor(remainingDays / 7);
  const days = remainingDays % 7;
  // Adjust months if there are weeks
  const adjustedMonths = months + Math.floor(weeks / 4);
  // Calculate remaining weeks after adjusting months
  const adjustedWeeks = weeks % 4;
  this.currentAge = `${adjustedMonths ? adjustedMonths + ' month' + (adjustedMonths > 1 ? 's ' : ' ') : ''}${adjustedWeeks ? adjustedWeeks + ' week' + (adjustedWeeks > 1 ? 's ' : ' ') : ''}${days ? days + ' day' + (days > 1 ? 's' : '') : ''}`;
};


birdBatchSchema.methods.updateAgeCategory = function() {
  const diffInMs = Date.now() - this.birthDate.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  if (diffInDays <= 7) { // 0-1 week
    this.ageCategory = 'Day-old Chick';
  } else if (diffInDays <= 56) { // 0-8 weeks
    this.ageCategory = 'Chick';
  } else if (diffInDays <= 140) { // 9-20 weeks
    this.ageCategory = this.gender === 'male' ? 'Cockerel' : 'Pullet';
  } else if (diffInDays <= 504) { // 21-72 weeks
    this.ageCategory = this.gender === 'male' ? 'Cock' : 'Hen';
  } else { // 72+ weeks
    this.ageCategory = this.gender === 'male' ? 'Old Cock' : 'Old Hen';
  }
};

// Schedule a cron job to update currentAge and ageCategory every minute
cron.schedule('* * * * *', async () => {
  try {
    const batches = await BirdBatches.find({});
    for (let batch of batches) {
      batch.updateCurrentAge();
      batch.updateAgeCategory();
      await batch.save();
    }
  } catch (error) {
    console.error('Error updating ages:', error);
  }
});

const BirdBatches = mongoose.model('BirdBatches', birdBatchSchema);

export default BirdBatches;
