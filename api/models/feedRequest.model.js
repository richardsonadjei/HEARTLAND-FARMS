import mongoose from 'mongoose';

const feedRequestSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  feedCategory: { type: String, required: true },
  feedName: { type: String, required: true },
  quantityRequested: { type: Number, required: true },
  status: { type: String, default: 'Pending' }, // 'Pending', 'Approved', 'Rejected'
});

const FeedRequest = mongoose.model('FeedRequest', feedRequestSchema);

export default FeedRequest;