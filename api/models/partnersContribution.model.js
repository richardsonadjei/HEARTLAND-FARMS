import mongoose from 'mongoose';

// Define the schema for partner's financial contributions
const partnerContributionSchema = new mongoose.Schema({
  contributions: {
    type: [
      {
        partnerName: { type: String, required: true },
        amount: { type: Number, required: true }
      }
    ],
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // You can add more fields as per your requirements
});

// Create a Mongoose model based on the schema
const PartnerContribution = mongoose.model('PartnerContribution', partnerContributionSchema);

export default PartnerContribution;
