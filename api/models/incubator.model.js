import mongoose from 'mongoose';

// Helper function to generate the next ID in the sequence
const generateIncubatorId = async () => {
  const lastIncubator = await Incubator.findOne().sort({ createdAt: -1 }).exec();
  if (!lastIncubator || !lastIncubator.incubatorId) {
    return 'HLFI001';
  }
  const lastIdNumber = parseInt(lastIncubator.incubatorId.replace('HLFI', ''));
  const nextIdNumber = lastIdNumber + 1;
  return `HLFI${String(nextIdNumber).padStart(3, '0')}`;
};

const incubatorSchema = new mongoose.Schema({
  incubatorId: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'maintenance'],
    default: 'active'
  },
  notes: {
    type: String
  },
  yearPurchased: {
    type: Number,
    required: true
  },
  amountPurchased: {
    type: Number,
    required: true
  },
  supplierDetails: {
    name: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

// Pre-save hook to generate the incubatorId
incubatorSchema.pre('save', async function (next) {
  if (!this.incubatorId) {
    this.incubatorId = await generateIncubatorId();
  }
  next();
});

const Incubator = mongoose.model('Incubator', incubatorSchema);

export default Incubator;
