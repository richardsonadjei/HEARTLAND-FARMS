// unsortedEggInventoryModel.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the UnsortedEggInventory schema
const unsortedEggInventorySchema = new Schema({
  currentStock: {
    type: Number,
    required: true,
  },
 
},
{
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the UnsortedEggInventory model
const UnsortedEggInventory = mongoose.model('UnsortedEggInventory', unsortedEggInventorySchema);

export default UnsortedEggInventory;
