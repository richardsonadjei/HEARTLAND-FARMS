import PigStock from '../models/pigStock.model.js';

// Controller function to record a new stock of pig
const recordNewPigStock = async (req, res) => {
  try {
    const {
      identityTag,
      breed,
      quantity,
      arrivalDate,
      farmSection,
      createdBy,
      gender,
    } = req.body;

    // Create a new PigStock instance
    const newPigStock = new PigStock({
      identityTag,
      breed,
      quantity,
      arrivalDate,
      farmSection,
      createdBy,
      gender,
    });

    // Save the new pig stock to the database
    await newPigStock.save();

    return res.status(201).json({ success: true, message: 'New pig stock recorded successfully.' });
  } catch (error) {
    console.error('Error recording new pig stock:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export default {
  recordNewPigStock,
};

// CALCULATE AGE
const calculateAge = (arrivalDate) => {
  const today = new Date();
  const arrival = new Date(arrivalDate);
  const ageInMilliseconds = today - arrival;
  const ageInDays = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));
  const ageInWeeks = Math.floor(ageInDays / 7);
  const daysRemaining = ageInDays % 7;

  return `${ageInWeeks} weeks ${daysRemaining} days`;
};


// Controller function to update the currentAge for all pigs
export const updatePigCurrentAge = async (req, res) => {
  try {
    // Find all pigs in the database
    const pigs = await PigStock.find();

    // Update the currentAge for each pig
    pigs.forEach(async (pig) => {
      pig.currentAge = calculateAge(pig.arrivalDate);
      await pig.save();
    });

    res.status(200).json({ success: true, message: 'Updated currentAge for all pigs now' });
  } catch (error) {
    console.error('Error updating currentAge:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


// PIG BREED CONGROLLERS
import PigBreed from '../models/pigBreed.model.js'; // Adjust the path based on your project structure

// Controller to create a new pig breed
export const createPigBreed = async (req, res) => {
  try {
    const { name, description, origin, averageWeight } = req.body;

    // Check if the pig breed with the same name already exists
    const existingBreed = await PigBreed.findOne({ name });

    if (existingBreed) {
      return res.status(400).json({ message: 'Pig breed with this name already exists' });
    }

    // Create a new pig breed
    const newPigBreed = new PigBreed({
      name,
      description,
      origin,
      averageWeight,
    });

    // Save the pig breed to the database
    await newPigBreed.save();

    res.status(201).json(newPigBreed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get all pig breeds
export const getPigBreeds = async (req, res) => {
  try {
    const pigBreeds = await PigBreed.find();

    res.status(200).json(pigBreeds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
