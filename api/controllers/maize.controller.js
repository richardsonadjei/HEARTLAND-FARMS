// controllers/LandPreparationController.js

import MaizeLandPreparation from '../models/maizeLandClearance.model.js';
import Expenditure from '../models/maizeFarmExpense.model.js';
import MaizeSeason from '../models/maizeSeason.model.js';

const recordLandPreparationAndExpense = async (req, res) => {
  try {
    const { date, location, areaCleared, machineryUsed, recordedBy, amountSpent, batchNumber } = req.body;

    // Basic validation, ensure batchNumber is present
    if (!batchNumber) {
      return res.status(400).json({ error: 'Batch number is required' });
    }

    // Record land preparation
    const landPreparation = new MaizeLandPreparation({
      date,
      location,
      areaCleared,
      machineryUsed,
      recordedBy,
      batchNumber, // Include batchNumber in the land preparation
    });

    const savedLandPreparation = await landPreparation.save();

    // Record expense using the same batchNumber, date, and recordedBy
    const expense = new Expenditure({
      batchNumber,
      date,
      category: 'Land Clearance', // Assuming it's Land Clearance for land preparation
      amountSpent, // Set the amount spent from the user input
      recordedBy,
    });

    await expense.save();

    res.status(201).json({
      message: 'Land preparation and expense recorded successfully',
      landPreparation: savedLandPreparation,
      expense,
    });
  } catch (error) {
    console.error('Error recording land preparation and expense:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default recordLandPreparationAndExpense;


// controllers/LandPreparationController.js

const viewLandPreparationsByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Basic validation, ensure batchNumber is present
    if (!batchNumber) {
      return res.status(400).json({ error: 'Batch number is required' });
    }

    // Fetch all land preparations for the specified batchNumber
    const landPreparations = await MaizeLandPreparation.find({ batchNumber });

    res.status(200).json({
      message: `Successfully fetched land preparations for batch number ${batchNumber}`,
      landPreparations,
    });
  } catch (error) {
    console.error('Error fetching land preparations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { viewLandPreparationsByBatchNumber };







// controllers/MaizeSeasonController.js


const recordNewMaizeSeason = async (req, res) => {
  try {
    const { startDate, additionalDetails } = req.body;

    // Basic validation, ensure startDate is present
    if (!startDate) {
      return res.status(400).json({ error: 'Start date is required' });
    }

    // Create a new MaizeSeason instance
    const newMaizeSeason = new MaizeSeason({
      startDate,
      additionalDetails,
    });

    // Save the new MaizeSeason to the database
    const savedMaizeSeason = await newMaizeSeason.save();

    res.status(201).json({
      message: 'New maize season recorded successfully',
      maizeSeason: savedMaizeSeason,
    });
  } catch (error) {
    console.error('Error recording new maize season:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export {recordNewMaizeSeason} 

const viewAllMaizeSeasons = async (req, res) => {
  try {
    // Fetch all maize seasons from the database
    const allMaizeSeasons = await MaizeSeason.find();

    res.status(200).json({
      message: 'Successfully fetched all maize seasons',
      maizeSeasons: allMaizeSeasons,
    });
  } catch (error) {
    console.error('Error fetching maize seasons:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { viewAllMaizeSeasons };


// MAIZE PLANTING CONTROLLERS
// controllers/MaizePlantingController.js
import MaizePlanting from '../models/maizePlanting.model.js';
import MaizeFarmExpenditure from '../models/maizeFarmExpense.model.js';


const saveMaizePlantingAndExpenditure = async (req, res) => {
  try {
    // Extract data for MaizePlanting from the request body
    const {
      batchNumber,
      date,
      location,
      areaPlanted,
      maizeVariety,
      recordedBy,
    } = req.body;

    // Create a new MaizePlanting instance
    const maizePlanting = new MaizePlanting({
      batchNumber,
      date,
      location,
      areaPlanted,
      maizeVariety,
      recordedBy,
    });

    // Save the MaizePlanting record
    await maizePlanting.save();

    // Extract data for MaizeFarmExpenditure from the request body
    const {
      amountSpent,
    } = req.body;

    // Create a new MaizeFarmExpenditure instance with category 'Planting' and other details from MaizePlanting
    const maizeExpenditure = new MaizeFarmExpenditure({
      batchNumber, // Assuming batchNumber is common between MaizePlanting and MaizeFarmExpenditure
      date,
      category: 'Planting',
      amountSpent,
      recordedBy, // Use the same recordedBy value as in MaizePlanting
    });

    // Save the MaizeFarmExpenditure record
    await maizeExpenditure.save();

    // Respond with success message
    return res.status(200).json({ message: 'MaizePlanting and MaizeFarmExpenditure records saved successfully.' });
  } catch (error) {
    // Respond with an error message
    return res.status(500).json({ error: 'Error saving records.' });
  }
};

export { saveMaizePlantingAndExpenditure };


// controllers/MaizePlantingController.js

const viewMaizePlantingByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Basic validation, ensure batchNumber is present
    if (!batchNumber) {
      return res.status(400).json({ error: 'Batch number is required' });
    }

    // Fetch all MaizePlanting records for the specified batchNumber
    const maizePlantings = await MaizePlanting.find({ batchNumber });

    res.status(200).json({
      message: `Successfully fetched MaizePlanting records for batch number ${batchNumber}`,
      maizePlantings,
    });
  } catch (error) {
    console.error('Error fetching MaizePlanting records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { viewMaizePlantingByBatchNumber };


// FERTILIZER APPLICATION
// controllers/FertilizerApplicationController.js

import FertilizerApplication from '../models/maizeFertilizerApplication.model.js';


import MaizeFertilizerApplication from '../models/maizeFertilizerApplication.model.js';

const recordMaizeFertilizerApplicationAndExpense = async (req, res) => {
  try {
    const {
      batchNumber,
      date,
      location,
      spaceApplied,
      fertilizerName,
      fertilizerDescription,
      applicationMethod,
      amountApplied,
      amountSpent, // Include amountSpent in the user input
      recordedBy,
    } = req.body;

    // Record fertilizer application
    const fertilizerApplication = new MaizeFertilizerApplication({
      batchNumber,
      date,
      location,
      spaceApplied,
      fertilizerName,
      fertilizerDescription,
      applicationMethod,
      amountApplied,
      recordedBy,
    });

    const savedFertilizerApplication = await fertilizerApplication.save();

    // Save an expense transaction
    const fertilizerExpense = new MaizeFarmExpenditure({
      batchNumber,
      date,
      category: 'Fertilizer Application',
      amountSpent, // Use the amountSpent from the user input
      recordedBy,
    });

    await fertilizerExpense.save();

    res.status(201).json({
      message: 'Fertilizer application recorded successfully',
      fertilizerApplication: savedFertilizerApplication,
      fertilizerExpense,
    });
  } catch (error) {
    console.error('Error recording fertilizer application and expense:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordMaizeFertilizerApplicationAndExpense };

