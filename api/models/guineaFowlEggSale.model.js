import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the GuineaFowlEggSale schema
const guineaFowlEggSaleSchema = new Schema({
  salesNumber: {
    type: String,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  crates: {
    type: Number,
    required: true,
  },
  unitPricePerCrate: {
    type: Number,
    required: true,
  },
  totalAmount: {
    type: Number,
  },
  category: {
    type: String,
    enum: ['sorted', 'unsorted'],
    required: true,
  },
  // Fields for sorted eggs
  size: {
    type: String,
    enum: ['small', 'medium', 'large', 'extraLarge'],
  },
  salesMadeBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Add timestamps (createdAt, updatedAt)
});

// Pre-save middleware to calculate salesNumber and totalAmount
guineaFowlEggSaleSchema.pre('save', async function (next) {
  try {
    // Calculate totalAmount based on unitPricePerCrate and crates
    this.totalAmount = this.unitPricePerCrate * this.crates;

    // Use await to get the count asynchronously
    const count = await mongoose.model('GuineaFowlEggSale').countDocuments();

    // Calculate salesNumber
    this.salesNumber = `GFES${String(count + 1).padStart(4, '0')}`;

    next();
  } catch (error) {
    next(error);
  }
});

// Create the GuineaFowlEggSale model
const GuineaFowlEggSale = mongoose.model('GuineaFowlEggSale', guineaFowlEggSaleSchema);

export default GuineaFowlEggSale;
