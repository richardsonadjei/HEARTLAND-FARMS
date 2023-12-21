import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the SortedEggInventory schema
const sortedEggInventorySchema = new Schema({
  sizes: {
    small: {
      type: Number,
      default: 0,
    },
    medium: {
      type: Number,
      default: 0,
    },
    large: {
      type: Number,
      default: 0,
    },
    extraLarge: {
      type: Number,
      default: 0,
    },
  },
},
{
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the SortedEggInventory model
const SortedEggInventory = mongoose.model('SortedEggInventory', sortedEggInventorySchema);

export default SortedEggInventory;
