// Import the required modules
import mongoose from 'mongoose';

// Define the feed category schema
const feedCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the FeedCategory model
const FeedCategory = mongoose.model('FeedCategory', feedCategorySchema);

// Export the model
export default FeedCategory;
