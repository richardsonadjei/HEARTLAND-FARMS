// Import required modules
import FeedStock from '../models/feedStock.model.js'; // Assuming this path is correct

// Controller to view all batches
const viewAllBatches = async (req, res) => {
  try {
    // Fetch all batches from the FeedStock model
    const batches = await FeedStock.find();

    // Send the batches as a JSON response
    res.json(batches);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Controller to search for feed based on feed name
const searchFeedByName = async (req, res) => {
  try {
    // Extract the search term from the request query
    const searchTerm = req.query.feedName;

    // Perform a case-insensitive search for feed names containing the search term
    const searchResults = await FeedStock.find({
      feedName: { $regex: new RegExp(searchTerm, 'i') },
    });

    // Send the search results as a JSON response
    res.json(searchResults);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const viewFeedById = async (req, res) => {
  try {
    // Extract the feed ID from the request parameters
    const feedId = req.params.id;

    // Find the feed in the database by its ID
    const feed = await FeedStock.findById(feedId);

    // If the feed is not found, return a 404 Not Found response
    if (!feed) {
      return res.status(404).json({ message: 'Feed not found' });
    }

    // Send the feed details as a JSON response
    res.json(feed);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Export the controller functions
export { viewAllBatches, searchFeedByName, viewFeedById };



