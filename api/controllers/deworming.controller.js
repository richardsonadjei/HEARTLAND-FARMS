// controllers/dewormingController.js
import Deworming from '../models/deworming.model.js';

export const createDeworming = async (req, res) => {
  try {
    const deworming = new Deworming(req.body);
    await deworming.save();
    res.status(201).json({ success: true, data: deworming });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getDewormingByBatch = async (req, res) => {
  try {
    const batchNumber = req.params.batchNumber;
    const dewormings = await Deworming.find({ batchNumber });
    res.json({ success: true, data: dewormings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Add update, delete, and other controllers as needed...

export const getDewormingByDateRange = async (req, res) => {
  try {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    const dewormings = await Deworming.find({
      dewormingDate: { $gte: parsedStartDate, $lte: parsedEndDate }
    });

    res.json({ success: true, data: dewormings });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

