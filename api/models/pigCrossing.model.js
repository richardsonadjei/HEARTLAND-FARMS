import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const pigCrossingSchema = new Schema(
  {
    sowIdentityNumber: {
      type: String,
      required: true,
    },
    boarBreed: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    expectedDayOfDelivery: {
      type: Date,
    },
    notes: {
      type: String,
    },
    // Add more fields as needed
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to calculate and set expectedDayOfDelivery before saving
pigCrossingSchema.pre('save', function (next) {
  // Calculate expected day of delivery as 105 days after the date of crossing
  const dateOfCrossing = this.date;
  const expectedDeliveryDate = new Date(dateOfCrossing);
  expectedDeliveryDate.setDate(dateOfCrossing.getDate() + 105);

  // Set the calculated value to expectedDayOfDelivery
  this.expectedDayOfDelivery = expectedDeliveryDate;

  // Continue with the save operation
  next();
});

const PigCrossing = model('PigCrossing', pigCrossingSchema);

export default PigCrossing;
