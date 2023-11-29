// Import required modules
import mongoose from 'mongoose';

// Define the FeedName schema
const feedNameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // Add any other properties related to feedName
  },
  {
    timestamps: true, // Add timestamps
  }
);

// Create FeedName model
const FeedName = mongoose.model('FeedName', feedNameSchema);

// Export the model
export default FeedName;
