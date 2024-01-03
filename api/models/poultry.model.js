import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';


const { Schema, model } = mongoose;

// Counter schema to store the batch number counter
const counterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    default: 1,
  },
});

const Counter = model('Counter', counterSchema);

const autoIncrement = AutoIncrementFactory(mongoose);

const birdSchema = new Schema({
  quantity: {
    type: Number,
    required: true,
  },
  breed: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  currentAge: {
    type: String,  
    required: true,
  },
  color: {
    type: String,
  },
  arrivalDate: {
    type: Date,
  },
  createdBy: {
    type: String,
    required: true,
  },
  batchNumber: {
    type: String,
  },
  farmSection: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'poultry',
   
  },
 
}, 
{
  timestamps: true,
});

// Pre-save hook to generate the alphanumeric batchNumber
birdSchema.pre('save', async function (next) {
  try {
    if (!this.batchNumber) {
      // Find the counter for the batch
      const counter = await Counter.findOneAndUpdate(
        { name: 'batchNumber' },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );

      // Generate the batch number
      const [letter, number] = counter.value.toString().padStart(2, '0').split('');
      this.batchNumber = `A${letter}${number}`;
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Bird = model('Bird', birdSchema);

export default Bird;
