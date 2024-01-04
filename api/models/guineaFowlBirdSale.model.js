import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define the GuineaFowlBirdSale schema
const guineaFowlBirdSaleSchema = new Schema({
  salesNumber: {
    type: String,
    unique: true,
  },
  sales: [
    {
      batch: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      unitPricePerBird: {
        type: Number,
        required: true,
      },
      totalAmount: {
        type: Number,
      },
    },
  ],
  soldBy: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // Add timestamps (createdAt, updatedAt)
});

// Pre-save middleware to calculate totalAmount for each batch
guineaFowlBirdSaleSchema.pre('save', async function (next) {
  try {
    // Calculate totalAmount for each batch
    for (const sale of this.sales) {
      sale.totalAmount = sale.unitPricePerBird * sale.quantity;
    }

    // If salesNumber is not provided, generate a new one
    if (!this.salesNumber) {
      const count = await mongoose.model('GuineaFowlBirdSale').countDocuments();
      this.salesNumber = `GFBS${String(count + 1).padStart(4, '0')}`;
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Create the GuineaFowlBirdSale model
const GuineaFowlBirdSale = mongoose.model('GuineaFowlBirdSale', guineaFowlBirdSaleSchema);

export default GuineaFowlBirdSale;
