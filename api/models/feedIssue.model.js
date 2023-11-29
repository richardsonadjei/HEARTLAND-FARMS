// models/FeedIssue.js
import mongoose from 'mongoose';

const feedIssueSchema = new mongoose.Schema({
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: 'FeedRequest', required: true },
  quantityIssued: { type: Number, required: true },
});

const FeedIssue = mongoose.model('FeedIssue', feedIssueSchema);

export default FeedIssue;