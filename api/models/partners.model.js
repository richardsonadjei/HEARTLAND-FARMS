import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const partnerSchema = new Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
        type: String,
        required: true,
      },
    phone: {
      type: String,
      required: true,
    },
    nextOfKin:{
        type: String,
        required: true,
    },
    partnershipDate: {
      type: Date,
      required: true,
    },
    additionalInformation: {
      type: String,
    },
  }, {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  });
  
  const Partner = model('Partner', partnerSchema);

  export default Partner;
