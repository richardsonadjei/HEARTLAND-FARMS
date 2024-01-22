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


// controllers/MaizeManualWeedingController.js

import MaizeManualWeeding from '../models/maizeManualWeeding.model.js';

const recordMaizeManualWeedingAndExpense = async (req, res) => {
  try {
    const { batchNumber, date, location, spaceWeeded, amountSpent, recordedBy } = req.body;

    // Record manual weeding
    const maizeManualWeeding = new MaizeManualWeeding({
      batchNumber,
      date,
      location,
      spaceWeeded,
      recordedBy,
    });

    const savedMaizeManualWeeding = await maizeManualWeeding.save();

    // Save an expenditure transaction
    const manualWeedingExpense = new MaizeFarmExpenditure({
      batchNumber,
      date,
      category: 'Manual Weeding',
      amountSpent,
      recordedBy,
    });

    await manualWeedingExpense.save();

    res.status(201).json({
      message: 'Manual weeding recorded successfully',
      maizeManualWeeding: savedMaizeManualWeeding,
      manualWeedingExpense,
    });
  } catch (error) {
    console.error('Error recording manual weeding and expense:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordMaizeManualWeedingAndExpense };

// controllers/MaizeWeedicideApplicationController.js

import MaizeWeedicideApplication from '../models/maizeWeedicideApplication.model.js';

const recordMaizeWeedicideApplicationAndExpense = async (req, res) => {
  try {
    const {
      batchNumber,
      date,
      location,
      spaceApplied,
      weedicideName,
      weedicideDescription,
      applicationMethod,
      quantityApplied,
      amountSpent, // Include amountSpent in the user input
      recordedBy,
    } = req.body;

    // Record weedicide application
    const maizeWeedicideApplication = new MaizeWeedicideApplication({
      batchNumber,
      date,
      location,
      spaceApplied,
      weedicideName,
      weedicideDescription,
      applicationMethod,
      quantityApplied,
      recordedBy,
    });

    const savedMaizeWeedicideApplication = await maizeWeedicideApplication.save();

    // Save an expenditure transaction
    const weedicideExpense = new MaizeFarmExpenditure({
      batchNumber,
      date,
      category: 'Weedicide Application',
      amountSpent,
      recordedBy,
    });

    await weedicideExpense.save();

    res.status(201).json({
      message: 'Weedicide application recorded successfully',
      maizeWeedicideApplication: savedMaizeWeedicideApplication,
      weedicideExpense,
    });
  } catch (error) {
    console.error('Error recording weedicide application and expense:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordMaizeWeedicideApplicationAndExpense };




const getAllManualWeedingsByBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch all MaizeManualWeeding records for the specified batchNumber
    const manualWeedings = await MaizeManualWeeding.find({ batchNumber });

    res.status(200).json({ manualWeedings });
  } catch (error) {
    console.error('Error fetching MaizeManualWeeding records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllManualWeedingsByBatch };




const getAllWeedicideApplicationsByBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch all MaizeWeedicideApplication records for the specified batchNumber
    const weedicideApplications = await MaizeWeedicideApplication.find({ batchNumber });

    res.status(200).json({ weedicideApplications });
  } catch (error) {
    console.error('Error fetching MaizeWeedicideApplication records:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllWeedicideApplicationsByBatch };


// controllers/MaizeHarvestController.js
import MaizeHarvest from '../models/maizeHarvest.model.js';


const recordHarvestAndExpenditure = async (req, res) => {
  try {
    const {
      batchNumber,
      date,
      location,
      harvestedQuantity,
      harvestedSpace,
      recordedBy,
      amountSpent,
    } = req.body;

    // Record harvesting activity
    const harvestRecord = await MaizeHarvest.create({
      batchNumber,
      date,
      location,
      harvestedQuantity,
      harvestedSpace,
      recordedBy,
    });

    // Record expenditure associated with the harvesting activity
    const expenditureRecord = await MaizeFarmExpenditure.create({
      batchNumber,
      date,
      category: 'Harvesting',
      amountSpent,
      recordedBy,
    });

    res.status(201).json({
      harvestRecord,
      expenditureRecord,
      message: 'Harvesting activity and expenditure recorded successfully',
    });
  } catch (error) {
    console.error('Error recording harvest and expenditure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordHarvestAndExpenditure };



const getAllMaizeHarvestsForBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch all maize harvest records for the specified batch number
    const maizeHarvests = await MaizeHarvest.find({ batchNumber });

    res.status(200).json({
      maizeHarvests,
      message: 'Maize harvest records fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching maize harvest records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllMaizeHarvestsForBatch };





const getAllMaizeFertilizerApplicationsForBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch all maize fertilizer applications for the specified batch number
    const fertilizerApplications = await MaizeFertilizerApplication.find({ batchNumber });

    res.status(200).json({
      fertilizerApplications,
      message: 'Maize fertilizer applications fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching maize fertilizer applications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllMaizeFertilizerApplicationsForBatch };


// EXPENSES


const getAllExpensesForMaizeBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch all expenses for the specified batch number
    const expenses = await MaizeFarmExpenditure.find({ batchNumber });

    res.status(200).json({
      expenses,
      message: 'Maize farm expenses fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching maize farm expenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllExpensesForMaizeBatch };



// SALES
// controllers/maizeSaleController.js

import MaizeSale from '../models/maizeSales.model.js';

// Controller to record the sale of maize
const recordMaizeSale = async (req, res) => {
  try {
    // Extract sale details from the request body
    const { batchNumber, saleDate, unitPricePerCup, quantityOfCupsSold, soldBy } = req.body;

    // Create a new MaizeSale document with saleAmount calculated by the getter function
    const newMaizeSale = new MaizeSale({
      batchNumber,
      saleDate,
      unitPricePerCup,
      quantityOfCupsSold,
      soldBy,
      // other sale-related fields can be added here
    });

    // Save the new MaizeSale document to the database
    await newMaizeSale.save();

    // Respond with the newly created MaizeSale document
    res.status(201).json(newMaizeSale);
  } catch (error) {
    console.error('Error recording maize sale:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordMaizeSale };


// controllers/maizeSaleController.js



// Controller to get all sales for a particular batch
const getAllMaizeSalesForBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch all sales for the specified batchNumber
    const sales = await MaizeSale.find({ batchNumber });

    // Respond with the sales data
    res.status(200).json({ sales });
  } catch (error) {
    console.error('Error fetching maize sales:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllMaizeSalesForBatch };


// controllers/MaizeFarmProfitLoss.js


export const calculateMaizeFarmProfitLoss = async (req, res) => {
  try {
    const { batchNumber } = req.query;

    // Find all expenditure data for the specified batchNumber from MaizeFarmExpenditure
    const expenditureData = await MaizeFarmExpenditure.find({ batchNumber });

    // Find all miscellaneous expenditure data for the specified batchNumber from MaizeFarmMiscellaneousExpenditure
    const miscellaneousExpenditureData = await MaizeFarmMiscellaneousExpenditure.find({ batchNumber });

    // Calculate total expenditure by summing up amountSpent for each record
    const totalExpenditure = expenditureData.reduce((sum, record) => sum + record.amountSpent, 0)
      + miscellaneousExpenditureData.reduce((sum, record) => sum + record.amountSpent, 0);

    // Find all income data for the specified batchNumber
    const incomeData = await MaizeSale.find({ batchNumber });

    // Calculate total income by summing up saleAmount for each record
    const totalIncome = incomeData.reduce((sum, record) => sum + record.saleAmount, 0);

    // Calculate profit or loss
    const profitLoss = totalIncome - totalExpenditure;

    res.status(200).json({
      expenditureData,
      miscellaneousExpenditureData,
      totalExpenditure,
      incomeData,
      totalIncome,
      profitLoss,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};






export const recordMaizeFertilizerPurchase = async (req, res) => {
  try {
    const { batchNumber, amountSpent, recordedBy } = req.body;

    // Assuming you want to record the current date as the expenditure date
    const date = new Date();

    // Creating a new expenditure record
    const fertilizerPurchase = new MaizeFarmExpenditure({
      batchNumber,
      date,
      category: 'Fertilizer Purchase',
      amountSpent,
      recordedBy,
    });

    // Saving the record to the database
    const savedExpenditure = await fertilizerPurchase.save();

    res.status(201).json(savedExpenditure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// controllers/maizeFarmController.js

export const recordMaizeWeedicidePurchase = async (req, res) => {
  try {
    const { batchNumber, amountSpent, recordedBy } = req.body;

    // Assuming you want to record the current date as the expenditure date
    const date = new Date();

    // Creating a new expenditure record for Weedicide Purchase
    const weedicidePurchase = new MaizeFarmExpenditure({
      batchNumber,
      date,
      category: 'Weedicide Purchase',
      amountSpent,
      recordedBy,
    });

    // Saving the record to the database
    const savedExpenditure = await weedicidePurchase.save();

    res.status(201).json(savedExpenditure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// controllers/maizeFarmController.js

import MaizeFarmMiscellaneousExpenditure from '../models/maizeFarmMiscelleneousExpense.model.js';

export const recordMaizeMiscellaneousExpenditure = async (req, res) => {
  try {
    const { batchNumber, date, description, amountSpent, recordedBy } = req.body;

    // Creating a new miscellaneous expenditure record
    const miscellaneousExpenditure = new MaizeFarmMiscellaneousExpenditure({
      batchNumber,
      date,
      description,
      amountSpent,
      recordedBy,
    });

    // Saving the record to the database
    const savedExpenditure = await miscellaneousExpenditure.save();

    res.status(201).json(savedExpenditure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
