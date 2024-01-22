import CassavaFarmExpenditure from "../models/cassavaFarmExpense.model.js";
import CassavaFertilizerApplication from "../models/cassavaFertilizerApplication.model.js";
import CassavaLandPreparation from "../models/cassavaLandPreparation.model.js";
import CassavaPlanting from "../models/cassavaPlanting.model.js";
import CassavaSeason from "../models/cassavaSeason.model.js";
import CassavaManualWeeding from '../models/cassavaManualWeeding.model.js';
import CassavaWeedicideApplication from "../models/cassavaWeedicideApplication.js";
import CassavaHarvest from "../models/cassavaHarvest.model.js";
import CassavaSale from "../models/cassavaSale.model.js";
import CassavaFarmMiscellaneousExpenditure from "../models/cassavaFarmMiscExpense.model.js";

const recordNewCassavaSeason = async (req, res) => {
    try {
      const { startDate, additionalDetails } = req.body;
  
      // Basic validation, ensure startDate is present
      if (!startDate) {
        return res.status(400).json({ error: 'Start date is required' });
      }
  
      // Create a new CassavaSeason instance
      const newCassavaSeason = new CassavaSeason({
        startDate,
        additionalDetails,
      });
  
      // Save the new CassavaSeason to the database
      const savedCassavaSeason = await newCassavaSeason.save();
  
      res.status(201).json({
        message: 'New cassava season recorded successfully',
        cassavaSeason: savedCassavaSeason,
      });
    } catch (error) {
      console.error('Error recording new cassava season:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export { recordNewCassavaSeason };

  // controllers/cassava.controller.js


const viewAllCassavaSeasons = async (req, res) => {
  try {
    // Fetch all cassava seasons from the database
    const allCassavaSeasons = await CassavaSeason.find();

    res.status(200).json({
      message: 'Successfully fetched all cassava seasons',
      cassavaSeasons: allCassavaSeasons,
    });
  } catch (error) {
    console.error('Error fetching cassava seasons:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { viewAllCassavaSeasons };


const saveCassavaLandPreparationAndExpenditure = async (req, res) => {
  try {
    // Extract data for CassavaLandPreparation from the request body
    const {
      batchNumber,
      date,
      location,
      areaCleared,
      machineryUsed,
      recordedBy,
    } = req.body;

    // Create a new CassavaLandPreparation instance
    const cassavaLandPreparation = new CassavaLandPreparation({
      batchNumber,
      date,
      location,
      areaCleared,
      machineryUsed,
      recordedBy,
    });

    // Save the CassavaLandPreparation record
    await cassavaLandPreparation.save();

    // Extract data for CassavaFarmExpenditure from the request body
    const {
      amountSpent,
    } = req.body;

    // Create a new CassavaFarmExpenditure instance with category 'Land Preparation' and other details from CassavaLandPreparation
    const cassavaExpenditure = new CassavaFarmExpenditure({
      batchNumber, // Assuming batchNumber is common between CassavaLandPreparation and CassavaFarmExpenditure
      date,
      category: 'Land Preparation',
      amountSpent,
      recordedBy, // Use the same recordedBy value as in CassavaLandPreparation
    });

    // Save the CassavaFarmExpenditure record
    await cassavaExpenditure.save();

    // Respond with success message
    return res.status(200).json({ message: 'CassavaLandPreparation and CassavaFarmExpenditure records saved successfully.' });
  } catch (error) {
    // Log the error message for debugging
    console.error('Error saving records:', error);
    return res.status(500).json({ error: 'Error saving records.' });
  }
};

export { saveCassavaLandPreparationAndExpenditure};

  

const saveCassavaPlantingAndExpenditure = async (req, res) => {
  try {
    // Extract data for CassavaPlanting from the request body
    const {
      batchNumber,
      date,
      location,
      areaPlanted,
      cassavaVariety,
      recordedBy,
    } = req.body;

    // Create a new CassavaPlanting instance
    const cassavaPlanting = new CassavaPlanting({
      batchNumber,
      date,
      location,
      areaPlanted,
      cassavaVariety,
      recordedBy,
    });

    // Save the CassavaPlanting record
    await cassavaPlanting.save();

    // Extract data for CassavaFarmExpenditure from the request body
    const {
      amountSpent,
    } = req.body;

    // Create a new CassavaFarmExpenditure instance with category 'Planting' and other details from CassavaPlanting
    const cassavaExpenditure = new CassavaFarmExpenditure({
      batchNumber, // Assuming batchNumber is common between CassavaPlanting and CassavaFarmExpenditure
      date,
      category: 'Planting',
      amountSpent,
      recordedBy, // Use the same recordedBy value as in CassavaPlanting
    });

    // Save the CassavaFarmExpenditure record
    await cassavaExpenditure.save();

    // Respond with success message
    return res.status(200).json({ message: 'CassavaPlanting and CassavaFarmExpenditure records saved successfully.' });
  } catch (error) {
    // Respond with an error message
    return res.status(500).json({ error: 'Error saving records.' });
  }
};

export { saveCassavaPlantingAndExpenditure };


const recordCassavaFertilizerApplicationAndExpense = async (req, res) => {
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

    // Record fertilizer application for Cassava
    const fertilizerApplication = new CassavaFertilizerApplication({
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

    // Save an expense transaction for Cassava
    const fertilizerExpense = new CassavaFarmExpenditure({
      batchNumber,
      date,
      category: 'Fertilizer Application',
      amountSpent, // Use the amountSpent from the user input
      recordedBy,
    });

    await fertilizerExpense.save();

    res.status(201).json({
      message: 'Cassava Fertilizer application recorded successfully',
      fertilizerApplication: savedFertilizerApplication,
      fertilizerExpense,
    });
  } catch (error) {
    console.error('Error recording Cassava fertilizer application and expense:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordCassavaFertilizerApplicationAndExpense };




const recordCassavaManualWeedingAndExpense = async (req, res) => {
  try {
    const { batchNumber, date, location, spaceWeeded, amountSpent, recordedBy } = req.body;

    // Record manual weeding
    const cassavaManualWeeding = new CassavaManualWeeding({
      batchNumber,
      date,
      location,
      spaceWeeded,
      recordedBy,
    });

    const savedCassavaManualWeeding = await cassavaManualWeeding.save();

    // Save an expenditure transaction
    const manualWeedingExpense = new CassavaFarmExpenditure({
      batchNumber,
      date,
      category: 'Manual Weeding',
      amountSpent,
      recordedBy,
    });

    await manualWeedingExpense.save();

    res.status(201).json({
      message: 'Manual weeding recorded successfully',
      cassavaManualWeeding: savedCassavaManualWeeding,
      manualWeedingExpense,
    });
  } catch (error) {
    console.error('Error recording manual weeding and expense:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordCassavaManualWeedingAndExpense };



const recordCassavaWeedicideApplicationAndExpense = async (req, res) => {
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
    const cassavaWeedicideApplication = new CassavaWeedicideApplication({
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

    const savedCassavaWeedicideApplication = await cassavaWeedicideApplication.save();

    // Save an expenditure transaction
    const weedicideExpense = new CassavaFarmExpenditure({
      batchNumber,
      date,
      category: 'Weedicide Application',
      amountSpent,
      recordedBy,
    });

    await weedicideExpense.save();

    res.status(201).json({
      message: 'Weedicide application recorded successfully',
      cassavaWeedicideApplication: savedCassavaWeedicideApplication,
      weedicideExpense,
    });
  } catch (error) {
    console.error('Error recording weedicide application and expense:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordCassavaWeedicideApplicationAndExpense };


// controllers/CassavaHarvestController.js


const recordCassavaHarvestAndExpenditure = async (req, res) => {
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

    // Record cassava harvesting activity
    const cassavaHarvestRecord = await CassavaHarvest.create({
      batchNumber,
      date,
      location,
      harvestedQuantity,
      harvestedSpace,
      recordedBy,
    });

    // Record expenditure associated with the cassava harvesting activity
    // Assuming there is a CassavaFarmExpenditure model for cassava farm expenditures
    const expenditureRecord = await CassavaFarmExpenditure.create({
      batchNumber,
      date,
      category: 'Harvesting',
      amountSpent,
      recordedBy,
    });

    res.status(201).json({
      cassavaHarvestRecord,
      expenditureRecord,
      message: 'Cassava harvesting activity and expenditure recorded successfully',
    });
  } catch (error) {
    console.error('Error recording cassava harvest and expenditure:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordCassavaHarvestAndExpenditure };



// REPORTS
const viewAllCassavaLandPreparationRecords = async (req, res) => {
  try {
    // Fetch all CassavaLandPreparation records from the database
    const cassavaLandPreparationRecords = await CassavaLandPreparation.find();

    // Respond with the fetched records
    return res.status(200).json({ cassavaLandPreparationRecords });
  } catch (error) {
    // Log the error message for debugging
    console.error('Error fetching CassavaLandPreparation records:', error);
    return res.status(500).json({ error: 'Error fetching CassavaLandPreparation records.' });
  }
};

export { viewAllCassavaLandPreparationRecords };


const viewAllCassavaPlantings = async (req, res) => {
  try {
    // Extract the batchNumber from the request parameters
    const { batchNumber } = req.params;

    // Find all CassavaPlanting records with the specified batchNumber
    const cassavaPlantings = await CassavaPlanting.find({ batchNumber });

    // Respond with the list of cassava plantings
    return res.status(200).json({ cassavaPlantings });
  } catch (error) {
    // Respond with an error message
    return res.status(500).json({ error: 'Error fetching cassava plantings.' });
  }
};

export { viewAllCassavaPlantings };


// controllers/cassavaRecords.controller.js



// controllers/cassavaManualWeeding.controller.js


const viewCassavaManualWeedingByBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch CassavaManualWeeding records
    const manualWeedingRecords = await CassavaManualWeeding.find({ batchNumber });

    // Respond with the fetched records
    return res.status(200).json({ cassavaManualWeedingRecords: manualWeedingRecords });
  } catch (error) {
    // Respond with an error message
    return res.status(500).json({ error: 'Error fetching CassavaManualWeeding records.' });
  }
};

export { viewCassavaManualWeedingByBatch };


// controllers/cassavaWeedicideApplication.controller.js



const viewCassavaWeedicideApplicationByBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch CassavaWeedicideApplication records
    const weedicideApplicationRecords = await CassavaWeedicideApplication.find({ batchNumber });

    // Respond with the fetched records
    return res.status(200).json({ cassavaWeedicideApplicationRecords: weedicideApplicationRecords });
  } catch (error) {
    // Respond with an error message
    return res.status(500).json({ error: 'Error fetching CassavaWeedicideApplication records.' });
  }
};

export { viewCassavaWeedicideApplicationByBatch };






const viewCassavaFertilizerApplicationByBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch Cassava Fertilizer Application records
    const fertilizerApplicationRecords = await CassavaFertilizerApplication.find({ batchNumber });

    // Respond with the fetched records
    return res.status(200).json({ cassavaFertilizerApplicationRecords: fertilizerApplicationRecords });
  } catch (error) {
    // Respond with an error message
    return res.status(500).json({ error: 'Error fetching Cassava Fertilizer Application records.' });
  }
};

export { viewCassavaFertilizerApplicationByBatch };




const viewCassavaHarvestByBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch CassavaHarvest records
    const cassavaHarvestRecords = await CassavaHarvest.find({ batchNumber });

    // Respond with the fetched records
    return res.status(200).json({ cassavaHarvestRecords });
  } catch (error) {
    // Respond with an error message
    return res.status(500).json({ error: 'Error fetching CassavaHarvest records.' });
  }
};

export { viewCassavaHarvestByBatch };



const getAllExpensesForCassavaBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch all expenses for the specified batch number
    const expenses = await CassavaFarmExpenditure.find({ batchNumber });

    res.status(200).json({
      expenses,
      message: 'Cassava farm expenses fetched successfully',
    });
  } catch (error) {
    console.error('Error fetching cassava farm expenses:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllExpensesForCassavaBatch };


// Controller to record the sale of cassava
const recordCassavaSale = async (req, res) => {
  try {
    // Extract sale details from the request body
    const { batchNumber, saleDate, unitPricePerSack, quantityOfSacksSold, soldBy } = req.body;

    // Create a new CassavaSale document with saleAmount calculated by the getter function
    const newCassavaSale = new CassavaSale({
      batchNumber,
      saleDate,
      unitPricePerSack,
      quantityOfSacksSold,
      soldBy,
      // other sale-related fields can be added here
    });

    // Save the new CassavaSale document to the database
    await newCassavaSale.save();

    // Respond with the newly created CassavaSale document
    res.status(201).json(newCassavaSale);
  } catch (error) {
    console.error('Error recording cassava sale:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordCassavaSale };


// Controller to get all sales for a particular cassava batch
const getAllCassavaSalesForBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch all sales for the specified batchNumber
    const sales = await CassavaSale.find({ batchNumber });

    // Respond with the sales data
    res.status(200).json({ sales });
  } catch (error) {
    console.error('Error fetching cassava sales:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllCassavaSalesForBatch };


export const calculateCassavaFarmProfitLoss = async (req, res) => {
  try {
    const { batchNumber } = req.query;

    // Find all expenditure data for the specified batchNumber from CassavaFarmExpenditure
    const expenditureData = await CassavaFarmExpenditure.find({ batchNumber });

    // Find all miscellaneous expenditure data for the specified batchNumber from CassavaFarmMiscellaneousExpenditure
    const miscellaneousExpenditureData = await CassavaFarmMiscellaneousExpenditure.find({ batchNumber });

    // Calculate total expenditure by summing up amountSpent for each record
    const totalExpenditure = expenditureData.reduce((sum, record) => sum + record.amountSpent, 0)
      + miscellaneousExpenditureData.reduce((sum, record) => sum + record.amountSpent, 0);

    // Find all income data for the specified batchNumber
    const incomeData = await CassavaSale.find({ batchNumber });

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

export const recordCassavaFertilizerPurchase = async (req, res) => {
  try {
    const { batchNumber, amountSpent, recordedBy } = req.body;

    // Assuming you want to record the current date as the expenditure date
    const date = new Date();

    // Creating a new expenditure record
    const fertilizerPurchase = new CassavaFarmExpenditure({
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

export const recordCassavaWeedicidePurchase = async (req, res) => {
  try {
    const { batchNumber, amountSpent, recordedBy } = req.body;

    // Assuming you want to record the current date as the expenditure date
    const date = new Date();

    // Creating a new expenditure record for Cassava Weedicide Purchase
    const weedicidePurchase = new CassavaFarmExpenditure({
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


export const recordCassavaMiscellaneousExpenditure = async (req, res) => {
  try {
    const { batchNumber, date, description, amountSpent, recordedBy } = req.body;

    // Creating a new miscellaneous expenditure record for Cassava
    const cassavaMiscellaneousExpenditure = new CassavaFarmMiscellaneousExpenditure({
      batchNumber,
      date,
      description,
      amountSpent,
      recordedBy,
    });

    // Saving the record to the database
    const savedExpenditure = await cassavaMiscellaneousExpenditure.save();

    res.status(201).json(savedExpenditure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


