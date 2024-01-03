// Import required modules
import GuineaFowlVaccination from '../models/guineaFowlVaccination.model.js'; // Assuming the model file is in the same directory

// Create a new GuineaFowlVaccination record
export const createGuineaFowlVaccination = async (req, res) => {
  try {
    const guineaFowlVaccination = new GuineaFowlVaccination(req.body);
    const savedVaccination = await guineaFowlVaccination.save();
    res.json(savedVaccination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all GuineaFowlVaccination records
export const getAllGuineaFowlVaccinations = async (req, res) => {
  try {
    const vaccinations = await GuineaFowlVaccination.find();
    res.json(vaccinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single GuineaFowlVaccination record by ID
export const getGuineaFowlVaccinationById = async (req, res) => {
  try {
    const vaccination = await GuineaFowlVaccination.findById(req.params.id);
    if (!vaccination) {
      res.status(404).json({ error: 'Vaccination not found' });
      return;
    }
    res.json(vaccination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all GuineaFowlVaccination records for a particular batch
export const getGuineaFowlVaccinationsByBatch = async (req, res) => {
  try {
    const batchNumber = req.params.batchNumber;

    // Find all vaccination records for the specified batch number
    const vaccinations = await GuineaFowlVaccination.find({ batchNumber });

    if (vaccinations.length === 0) {
      // No records found for the specified batch number
      res.status(404).json({ error: 'No vaccination records found for the specified batch' });
      return;
    }

    // Return the vaccination records for the specified batch number
    res.json(vaccinations);
  } catch (error) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: error.message });
  }
};
