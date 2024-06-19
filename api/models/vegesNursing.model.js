import mongoose from 'mongoose';

const vegeNursingSchema = new mongoose.Schema({
  vegetable: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
  quantityNursed: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  expectedTransplantingDate: {
    type: Date,
    required: true,
  },
  
  additionalDetails: {
    type: String,
  },
}, {
  timestamps: true,
});

const VegeNursing = mongoose.model('VegeNursing', vegeNursingSchema);

export default VegeNursing;
