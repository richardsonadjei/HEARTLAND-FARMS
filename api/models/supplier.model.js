// Import necessary dependencies
import mongoose from 'mongoose';

// Define the Supplier schema
const supplierSchema = new mongoose.Schema({
  SupplierName: {
    type: String,
    required: true,
  },
  StreetAddress: {
    type: String,
    required: true,
  },
  City: {
    type: String,
    required: true,
  },
  Region: {
    type: String,
    required: true,
  },
  GhanaPostGPS: {
    type: String,
  },
  Country: {
    type: String,
    required: true,
  },
  PhoneNumber: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  SalesRepName: {
    type: String,
    required: true,
  },
  SalesRepPhoneNumber: {
    type: String,
    required: true,
  },
});

// Create the Supplier model
const Supplier = mongoose.model('Supplier', supplierSchema);

// Export the Supplier model
export default Supplier;
