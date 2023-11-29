// routes/feedRoutes.js
import express from 'express';
const feedRequestRouter = express.Router();
import { createFeedRequest, viewFeedRequests, issueFeed } from '../controllers/feed.request.issue.controller.js';

// Endpoint for employees to create feed requests
feedRequestRouter.post('/request-feed', createFeedRequest);

// Endpoint for managers to view and approve/reject feed requests
feedRequestRouter.get('/view-feed-requests', viewFeedRequests);

// Endpoint for managers to issue feed quantities based on approved requests
feedRequestRouter.post('/issue-feed', issueFeed);

export default feedRequestRouter;
