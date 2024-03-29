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


// Controller to get bird vaccination records within a period
export const getBirdVaccinationsByPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    const birdVaccinations = await BirdVaccination.find({
      vaccinationDate: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json(birdVaccinations);
  } catch (error) {
    console.error('Error getting bird vaccination records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Controller to get a single bird vaccination record by batchNumber
export const getBirdVaccinationByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const birdVaccination = await BirdVaccination.findOne({ batchNumber });

    if (!birdVaccination) {
      return res.status(404).json({ error: 'Bird vaccination record not found' });
    }

    res.status(200).json(birdVaccination);
  } catch (error) {
    console.error('Error getting bird vaccination record by batchNumber:', error);
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


// Controller to get all bird vaccinations for a particular batchNumber
export const getBirdVaccinationsByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Find all bird vaccinations with the specified batchNumber
    const birdVaccinations = await BirdVaccination.find({ batchNumber });

    if (birdVaccinations.length === 0) {
      return res.status(404).json({ error: `No bird vaccinations found for batchNumber ${batchNumber}` });
    }

    res.status(200).json(birdVaccinations);
  } catch (error) {
    console.error('Error getting bird vaccinations by batchNumber:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
