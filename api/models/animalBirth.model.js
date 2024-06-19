import mongoose from 'mongoose';

const { Schema } = mongoose;

const AnimalBirthsSchema = new Schema({

  type: {
    type: String,
    required: true
  },
  animalId: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  numberOfKids: {
    type: Number,
    required: true
  },
  birthDetails: [
    {
      gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
      },
      weight: {
        type: String,
       
      },
      healthStatus: {
        type: String,
       
      }
    }
  ],
  notes: {
    type: String
  }
}, { timestamps: true });

const AnimalBirths = mongoose.model('AnimalBirths', AnimalBirthsSchema);

export default AnimalBirths;
