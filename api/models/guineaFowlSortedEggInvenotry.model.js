import mongoose from 'mongoose';

const { Schema } = mongoose;

const guineaFowlSortedEggInventorySchema = new Schema(
  {
    sizes: {
      small: {
        crates: {
          type: Number,
          default: 0,
        },
        loose: {
          type: Number,
          default: 0,
        },
      },
      medium: {
        crates: {
          type: Number,
          default: 0,
        },
        loose: {
          type: Number,
          default: 0,
        },
      },
      large: {
        crates: {
          type: Number,
          default: 0,
        },
        loose: {
          type: Number,
          default: 0,
        },
      },
      extraLarge: {
        crates: {
          type: Number,
          default: 0,
        },
        loose: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

// Add a pre-save hook to convert excess loose eggs to crates
guineaFowlSortedEggInventorySchema.pre('save', function (next) {
  const eggsPerCrate = 30;

  // Loop through each size and convert excess loose eggs to crates
  Object.keys(this.sizes).forEach((size) => {
    const sizeData = this.sizes[size];
    
    // Calculate the number of full crates and remaining loose eggs
    const fullCrates = Math.floor(sizeData.loose / eggsPerCrate);
    const remainingLoose = sizeData.loose % eggsPerCrate;

    // Update the values for the current size
    sizeData.crates += fullCrates;
    sizeData.loose = remainingLoose;
  });

  next();
});

const GuineaFowlSortedEggInventory = mongoose.model('GuineaFowlSortedEggInventory', guineaFowlSortedEggInventorySchema);

export default GuineaFowlSortedEggInventory;
