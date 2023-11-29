// Import required modules
import express from 'express';
import { searchFeedByName, viewAllBatches, viewFeedById } from '../controllers/feed.controller.js'; // Assuming this path is correct

// Create an Express router
const feedRouter = express.Router();

// Route to view all batches
feedRouter.get('/batches', viewAllBatches);
feedRouter.get('/search-feed-name', searchFeedByName);
feedRouter.get('/feed/:id', viewFeedById);

// Export the router
export default feedRouter;
