// controllers/healthConditionController.js
import HealthCondition from '../models/healthCondition.model.js';

// Create a new health condition record
export const createHealthCondition = async (req, res) => {
  try {
    const healthConditionData = req.body;
    const newHealthCondition = new HealthCondition(healthConditionData);
    const savedHealthCondition = await newHealthCondition.save();
    res.status(201).json({ success: true, data: savedHealthCondition });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all health conditions
export const getAllHealthConditions = async (req, res) => {
  try {
    const healthConditions = await HealthCondition.find();
    res.json({ success: true, data: healthConditions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get a health condition by ID
export const getHealthConditionById = async (req, res) => {
  try {
    const healthConditionId = req.params.id;
    const healthCondition = await HealthCondition.findById(healthConditionId);
    if (!healthCondition) {
      return res.status(404).json({ success: false, error: 'Health condition not found' });
    }
    res.json({ success: true, data: healthCondition });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Update a health condition by ID
export const updateHealthCondition = async (req, res) => {
  try {
    const healthConditionId = req.params.id;
    const updatedHealthCondition = await HealthCondition.findByIdAndUpdate(
      healthConditionId,
      req.body,
      { new: true }
    );
    if (!updatedHealthCondition) {
      return res.status(404).json({ success: false, error: 'Health condition not found' });
    }
    res.json({ success: true, data: updatedHealthCondition });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete a health condition by ID
export const deleteHealthCondition = async (req, res) => {
  try {
    const healthConditionId = req.params.id;
    const deletedHealthCondition = await HealthCondition.findByIdAndDelete(healthConditionId);
    if (!deletedHealthCondition) {
      return res.status(404).json({ success: false, error: 'Health condition not found' });
    }
    res.json({ success: true, data: deletedHealthCondition });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
