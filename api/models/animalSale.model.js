import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define AnimalSale schema
const animalSaleSchema = new Schema({
  animalId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  saleDate: {
    type: Date,
    required: true
  },
  buyerName: {
    type: String,
    required: true
  },
  buyerContact: {
    type: String,
    required: true
  },
  salePrice: {
    type: Number,
    required: true
  },
  salesNumber: {
    type: String,
    unique: true
  },
  recordedBy: {
    type: String,
    required: true
  },
  notes: String
}, { timestamps: true });

animalSaleSchema.pre('save', async function (next) {
  if (this.isNew) {
    const lastSale = await this.constructor.findOne().sort({ createdAt: -1 });
    const lastSalesNumber = lastSale ? parseInt(lastSale.salesNumber, 10) : 0;
    this.salesNumber = String(lastSalesNumber + 1).padStart(6, '0'); 
  }
  next();
});

// Create AnimalSale model
const AnimalSale = mongoose.model('AnimalSale', animalSaleSchema);

export default AnimalSale;
