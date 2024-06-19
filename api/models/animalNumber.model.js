import mongoose from 'mongoose';
import cron from 'node-cron';

const counterSchema = new mongoose.Schema({
  type: { type: String, required: true },
  counter: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

const animalBatchSchema = new mongoose.Schema({
  type: { type: String, required: true },
  identityNumber: { type: String, unique: true },
  specie: { type: String, required: true },
  breed: { type: String },
  identityTag: { type: String, enum: ['Red', 'Blue', 'White', 'Orange', 'Green', 'Yellow'] },
  birthDate: { type: Date },
  currentAge: { type: String },
  gender: { type: String, enum: ['male', 'female'], required: true },
  farmHouseLocation: { type: String },
  total: { type: Number, default: 1 },
  additionalDetails: { type: String },
  isActive: { type: Boolean, default: true },
  recordedBy: { type: String },
}, { timestamps: true });

animalBatchSchema.pre('save', async function (next) {
  try {
    if (!this.identityNumber) {
      const counterDoc = await Counter.findOneAndUpdate(
        { type: this.type },
        { $inc: { counter: 1 } },
        { new: true, upsert: true }
      );

      const nextCounter = counterDoc.counter;
      const formattedCounter = String(nextCounter).padStart(4, '0');
      const genderInitial = this.gender.charAt(0).toUpperCase();
      this.identityNumber = `${this.type.slice(0, 3).toUpperCase()}${formattedCounter}${genderInitial}`;
    }

    this.updateCurrentAge();

    next();
  } catch (error) {
    next(error);
  }
});

animalBatchSchema.methods.updateCurrentAge = function() {
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


// Schedule a cron job to update currentAge every minute
cron.schedule('* * * * *', async () => {
  try {
    const batches = await AnimalIdentities.find({});
    for (let batch of batches) {
      batch.updateCurrentAge();
      await batch.save();
    }
  } catch (error) {
    console.error('Error updating ages:', error);
  }
});

const AnimalIdentities = mongoose.model('AnimalIdentities', animalBatchSchema);

export default AnimalIdentities;
