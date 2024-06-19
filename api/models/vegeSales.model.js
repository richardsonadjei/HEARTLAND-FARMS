import mongoose from 'mongoose';

// Define the schema for vegetable sales
const vegetableSalesSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  batchNumber: {
    type: String,
    required: true
  },
  vegetable: {
    type: String,
    required: true,
  },
  quantitySold: {
    type: Number,
    required: true
  },
  pricePerBag: {
    type: Number,
    required: true
  },
  totalIncome: {
    type: Number,
    required: true
  },
  additionalInformation: {
    type: String
  }
}, { timestamps: true });

// Pre-save hook to calculate totalIncome
vegetableSalesSchema.pre('save', function (next) {
  this.totalIncome = this.quantitySold * this.pricePerBag;
  next();
});

// Define the VegetableSales model
const VegetableSales = mongoose.model('VegetableSales', vegetableSalesSchema);

export default VegetableSales;
