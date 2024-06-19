import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const vegeOtherActivitiesSchema = new Schema({
  vegetable: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
    required: true,
  },
 
  activityDetails: {
    type: String,
    required: true,
  },
  activityDate: {
    type: Date,
    required: true,
  },
  additionalDetails: {
    type: String,
  },
}, {
  timestamps: true,
});

const VegeOtherActivities = model('VegeOtherActivities', vegeOtherActivitiesSchema);

export default VegeOtherActivities;
