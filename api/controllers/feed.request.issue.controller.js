// controllers/feedController.js
import FeedRequest from '../models/feedRequest.model.js';
import FeedIssue from '../models/feedIssue.model.js';
import FeedStock from '../models/feedStock.model.js';


export const createFeedRequest = async (req, res) => {
  try {
    const { employeeName, feedCategory, feedName,quantityRequested } = req.body;
    const newRequest = await FeedRequest.create({
      employeeName,
      feedCategory,
      feedName,
      quantityRequested,
    });
    res.status(201).json({ success: true, data: newRequest });
  } catch (error) {
    console.error('Error creating feed request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const viewFeedRequests = async (req, res) => {
  try {
    const pendingRequests = await FeedRequest.find({ status: 'Pending' });
    res.status(200).json({ success: true, data: pendingRequests });
  } catch (error) {
    console.error('Error fetching pending feed requests:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



export const issueFeed = async (req, res) => {
  try {
    const { requestId, quantityIssued } = req.body;
  

    // Fetch the corresponding FeedRequest
    const feedRequest = await FeedRequest.findById(requestId);
   

    // Ensure the request is 'Approved' before proceeding
    if (!feedRequest) {
      console.log('Invalid request. FeedRequest not found.');
      return res.status(400).json({ success: false, message: 'Invalid request' });
    }

    if (feedRequest.status !== 'Approved') {
     
      feedRequest.status = 'Approved';
      try {
        await feedRequest.save();
        console.log('Status updated successfully.');
      } catch (error) {
        console.error('Error updating status:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    }

    // Create a new FeedIssue document
    const issuedFeed = await FeedIssue.create({ requestId, quantityIssued });

    // Deduct the approved quantity from the quantity in stock of the corresponding FeedStock
    const feedStock = await FeedStock.findOne({
      feedName: feedRequest.feedName,
      feedCategory: feedRequest.feedCategory,
    });

    if (feedStock) {
      feedStock.quantityInStock -= parseInt(quantityIssued, 10); // Ensure it's an integer
      await feedStock.save();
     
    }

    res.status(201).json({ success: true, data: issuedFeed });
  } catch (error) {
    console.error('Error issuing feed:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



