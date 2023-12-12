// medicationController.js
import Medication from '../models/medication.model.js';

export const getAllMedications = async (req, res) => {
  try {
    const medications = await Medication.find();
    res.status(200).json(medications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const medication = await Medication.findById(id);
    if (medication) {
      res.status(200).json(medication);
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMedication = async (req, res) => {
  try {
    const newMedication = new Medication(req.body);
    const savedMedication = await newMedication.save();
    res.status(201).json(savedMedication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMedication = await Medication.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedMedication) {
      res.status(200).json(updatedMedication);
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMedication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMedication = await Medication.findByIdAndDelete(id);
    if (deletedMedication) {
      res.status(200).json(deletedMedication);
    } else {
      res.status(404).json({ message: 'Medication not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
