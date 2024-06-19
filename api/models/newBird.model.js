import mongoose from 'mongoose';

const { Schema } = mongoose;

const birdSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
});

export default mongoose.model('NewBird', birdSchema);


