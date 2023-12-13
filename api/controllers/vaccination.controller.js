// vaccinationController.js
import Vaccination from '../models/vaccination.model.js';

export const getAllVaccinations = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find();
    res.status(200).json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVaccinationById = async (req, res) => {
  try {
    const { id } = req.params;
    const vaccination = await Vaccination.findById(id);
    if (vaccination) {
      res.status(200).json(vaccination);
    } else {
      res.status(404).json({ message: 'Vaccination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVaccination = async (req, res) => {
  try {
    const newVaccination = new Vaccination(req.body);
    const savedVaccination = await newVaccination.save();
    res.status(201).json(savedVaccination);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVaccination = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVaccination = await Vaccination.findByIdAndUpdate(id, req.body, { new: true });
    if (updatedVaccination) {
      res.status(200).json(updatedVaccination);
    } else {
      res.status(404).json({ message: 'Vaccination not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVaccination = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVaccination = await Vaccination.findByIdAndDelete(id);
    if (deletedVaccination) {
      res.status(200).json(deletedVaccination);
    } else {
      res.status(404).json({ message: 'Vaccination not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
