// Import the BirdVaccination model
import BirdVaccination from '../models/birdVaccination.model.js';

// Controller to create a new bird vaccination record
export const createBirdVaccination = async (req, res) => {
  try {
    const { batchNumber, breed, vaccinationDate, vaccine, ageInDays, vaccinatedBy } = req.body;

    // Create a new bird vaccination instance
    const newBirdVaccination = new BirdVaccination({
      batchNumber,
      breed,
      vaccinationDate,
      vaccine, // Updated property name
      ageInDays,
      vaccinatedBy,
    });

    // Save the new bird vaccination record to the database
    const savedBirdVaccination = await newBirdVaccination.save();

    res.status(201).json(savedBirdVaccination);
  } catch (error) {
    console.error('Error creating bird vaccination record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller to get all bird vaccination records
export const getAllBirdVaccinations = async (req, res) => {
  try {
    const birdVaccinations = await BirdVaccination.find();
    res.status(200).json(birdVaccinations);
  } catch (error) {
    console.error('Error getting bird vaccination records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to get a single bird vaccination record by ID
export const getBirdVaccinationById = async (req, res) => {
  try {
    const birdVaccination = await BirdVaccination.findById(req.params.id);

    if (!birdVaccination) {
      return res.status(404).json({ error: 'Bird vaccination record not found' });
    }

    res.status(200).json(birdVaccination);
  } catch (error) {
    console.error('Error getting bird vaccination record by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to update a bird vaccination record by ID
export const updateBirdVaccinationById = async (req, res) => {
  try {
    const updatedBirdVaccination = await BirdVaccination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedBirdVaccination) {
      return res.status(404).json({ error: 'Bird vaccination record not found' });
    }

    res.status(200).json(updatedBirdVaccination);
  } catch (error) {
    console.error('Error updating bird vaccination record by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller to delete a bird vaccination record by ID
export const deleteBirdVaccinationById = async (req, res) => {
  try {
    const deletedBirdVaccination = await BirdVaccination.findByIdAndDelete(req.params.id);

    if (!deletedBirdVaccination) {
      return res.status(404).json({ error: 'Bird vaccination record not found' });
    }

    res.status(200).json(deletedBirdVaccination);
  } catch (error) {
    console.error('Error deleting bird vaccination record by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
