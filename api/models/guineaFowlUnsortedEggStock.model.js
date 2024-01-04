import mongoose from 'mongoose';

const { Schema } = mongoose;

const guineaFowlUnsortedEggInventorySchema = new Schema({
  crates: {
    type: Number,
    default: 0,
  },
  loose: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});

// Add a pre-save hook to convert excess loose eggs to crates
guineaFowlUnsortedEggInventorySchema.pre('save', function (next) {
  const eggsPerCrate = 30;

  // Calculate the number of full crates and remaining loose eggs
  const fullCrates = Math.floor(this.loose / eggsPerCrate);
  const remainingLoose = this.loose % eggsPerCrate;

  // Update the values in the schema
  this.crates += fullCrates;
  this.loose = remainingLoose;

  next();
});

const GuineaFowlUnsortedEggInventory = mongoose.model('GuineaFowlUnsortedEggInventory', guineaFowlUnsortedEggInventorySchema);

export default GuineaFowlUnsortedEggInventory;
