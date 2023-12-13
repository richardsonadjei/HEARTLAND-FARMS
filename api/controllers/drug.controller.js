// controllers/medicationController.js

import Medication from '../models/drugs.model.js';

// Create a new medication
const createMedication = async (req, res) => {
  try {
    const newMedication = new Medication(req.body);
    const savedMedication = await newMedication.save();
    res.status(201).json(savedMedication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all medications
const getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.status(200).json(medications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific medication by ID
const getMedicationById = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    if (medication) {
      res.status(200).json(medication);
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a specific medication by ID
const updateMedicationById = async (req, res) => {
  try {
    const updatedMedication = await Medication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedMedication) {
      res.status(200).json(updatedMedication);
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a specific medication by ID
const deleteMedicationById = async (req, res) => {
  try {
    const deletedMedication = await Medication.findByIdAndDelete(req.params.id);
    if (deletedMedication) {
      res.status(200).json({ message: 'Medication deleted successfully' });
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createMedication,
  getAllMedications,
  getMedicationById,
  updateMedicationById,
  deleteMedicationById,
};
