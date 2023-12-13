// medicationCategoryModel.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the schema for the Medication Category
const medicationCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
});

// Create the Medication Category model
const MedicationCategory = mongoose.model('MedicationCategory', medicationCategorySchema);

// Export the model
export default MedicationCategory;
