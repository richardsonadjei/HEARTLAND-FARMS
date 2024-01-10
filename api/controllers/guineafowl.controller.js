import GuineaFowlStock from '../models/guineaFowl.model.js'
import GuineaFowlStockUpdate from '../models/guineaFowlBatchUpdateHistory.model.js';
import GuineaFowlHealthRecords from '../models/guineaFowlHealthRecords.model.js';
import GuineaFowlTreatment from '../models/guineaFowlTreatment.model.js';
import GuineaFowlMortality from '../models/guineaFowlMortality.model.js';
import GuineaFowlMovement from '../models/guineaFowlMovement.model.js';
import GuineaFowlEggSale from '../models/guineaFowlEggSale.model.js';
import UnsortedEggInventory from '../models/guineaFowlUnsortedEggStock.model.js'; 
import GuineaFowlUnsortedEgg from '../models/guineaFowlUnsortedEggs.model.js';
import GuineaFowlUnsortedEggInventory from '../models/guineaFowlUnsortedEggStock.model.js';
import GuineaFowlBirdSale from '../models/guineaFowlBirdSale.model.js';


// Create a new Guinea Fowl entry
const createGuineaFowl = async (req, res) => {
  try {
    const guineaFowl = new GuineaFowlStock(req.body);
    await guineaFowl.save();
    res.status(201).json(guineaFowl);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllGuineaFowls = async (req, res) => {
  try {
    const guineaFowls = await GuineaFowlStock.find();
    res.status(200).json(guineaFowls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateGuineaFowlQuantity = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const { quantity, updatedBy } = req.body; // Extract updatedBy from req.body

    // Find the Guinea Fowl by batchNumber
    const guineaFowl = await GuineaFowlStock.findOne({ batchNumber });

    // Check if the Guinea Fowl with the specified batchNumber exists
    if (!guineaFowl) {
      return res.status(404).json({ error: 'Guinea Fowl not found' });
    }

    // Save the original quantity for updating the log
    const previousQuantity = guineaFowl.quantity;

    // Increment the existing quantity with the new quantity
    guineaFowl.quantity += parseInt(quantity, 10);

    // Save the updated Guinea Fowl
    await guineaFowl.save();

    // Create a new GuineaFowlStockUpdate instance
    const stockUpdate = new GuineaFowlStockUpdate({
      batchNumber,
      previousQuantity,
      newQuantity: guineaFowl.quantity,
      updatedBy, // Use the updatedBy from the req.body
      updatedAt: new Date(), // Optionally, update the updatedAt field
    });

    // Save the GuineaFowlStockUpdate instance
    await stockUpdate.save();

    // Respond with the updated Guinea Fowl
    res.json(guineaFowl);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};



const viewBatchUpdatesWithinPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query for GuineaFowlStockUpdates within the specified period
    const batchUpdates = await GuineaFowlStockUpdate.find({
      updatedAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.json(batchUpdates);
  } catch (error) {
    console.error('Error retrieving batch updates:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const viewUpdatesForBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Query for GuineaFowlStockUpdates for the specified batchNumber
    const batchUpdates = await GuineaFowlStockUpdate.find({ batchNumber });

    res.json(batchUpdates);
  } catch (error) {
    console.error('Error retrieving batch updates:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





// Function to calculate age based on arrival date
const calculateAge = (arrivalDate) => {
  const today = new Date();
  const arrival = new Date(arrivalDate);
  const ageInMilliseconds = today - arrival;
  const ageInDays = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));
  return ageInDays;
};

// Function to update the currentAge for all guinea fowls
export const updateGuineaFowlCurrentAge = async (req, res) => {
  try {
    // Find all guinea fowls in the database
    const guineaFowls = await GuineaFowlStock.find();

    // Update the currentAge for each guinea fowl
    guineaFowls.forEach(async (guineaFowl) => {
      guineaFowl.currentAge = calculateAge(guineaFowl.arrivalDate);
      await guineaFowl.save();
    });

    res.status(200).json({ success: true, message: 'Updated currentAge for all guinea fowls now' });
  } catch (error) {
    console.error('Error updating currentAge:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




const viewGuineaFowlBatchByNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Find the Guinea Fowl by batchNumber
    const guineaFowl = await GuineaFowlStock.findOne({ batchNumber });

    // Check if the Guinea Fowl with the specified batchNumber exists
    if (!guineaFowl) {
      return res.status(404).json({ success: false, error: 'Guinea Fowl not found' });
    }

    // Respond with the details of the found Guinea Fowl batch
    res.status(200).json({ success: true, guineaFowl });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




export {
  createGuineaFowl,
  getAllGuineaFowls,
  updateGuineaFowlQuantity,
  viewBatchUpdatesWithinPeriod,
  viewGuineaFowlBatchByNumber, 
  viewUpdatesForBatch
};





// HEALTH RECORDS CONTROLLERS
// controllers/guineaFowlHealthRecordsController.js


// Create a new health record
export const createHealthRecord = async (req, res) => {
  try {
    const newHealthRecord = new GuineaFowlHealthRecords(req.body);
    const savedHealthRecord = await newHealthRecord.save();
    res.status(201).json(savedHealthRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all health records
export const getAllHealthRecords = async (req, res) => {
  try {
    const healthRecords = await GuineaFowlHealthRecords.find();
    res.status(200).json(healthRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific health record by ID
export const getHealthRecordById = async (req, res) => {
  try {
    const healthRecord = await GuineaFowlHealthRecords.findById(req.params.id);
    if (!healthRecord) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.status(200).json(healthRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a health record by ID
export const updateHealthRecord = async (req, res) => {
  try {
    const updatedHealthRecord = await GuineaFowlHealthRecords.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHealthRecord) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.status(200).json(updatedHealthRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a health record by ID
export const deleteHealthRecord = async (req, res) => {
  try {
    const deletedHealthRecord = await GuineaFowlHealthRecords.findByIdAndRemove(req.params.id);
    if (!deletedHealthRecord) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.status(200).json(deletedHealthRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// TREATMENT CONTROLLERS


// Controller to create a new GuineaFowlTreatment record
export const createGuineaFowlTreatment = async (req, res) => {
  try {
    const guineaFowlTreatment = new GuineaFowlTreatment(req.body);
    await guineaFowlTreatment.save();
    res.status(201).json({ success: true, data: guineaFowlTreatment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Controller to get all GuineaFowlTreatment records
export const getAllGuineaFowlTreatments = async (req, res) => {
  try {
    const guineaFowlTreatments = await GuineaFowlTreatment.find();
    res.status(200).json({ success: true, data: guineaFowlTreatments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get a single GuineaFowlTreatment record by ID
export const getGuineaFowlTreatmentById = async (req, res) => {
  try {
    const guineaFowlTreatment = await GuineaFowlTreatment.findById(req.params.id);
    if (!guineaFowlTreatment) {
      res.status(404).json({ success: false, error: 'GuineaFowlTreatment not found' });
      return;
    }
    res.status(200).json({ success: true, data: guineaFowlTreatment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to update a GuineaFowlTreatment record by ID
export const updateGuineaFowlTreatment = async (req, res) => {
  try {
    const guineaFowlTreatment = await GuineaFowlTreatment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!guineaFowlTreatment) {
      res.status(404).json({ success: false, error: 'GuineaFowlTreatment not found' });
      return;
    }
    res.status(200).json({ success: true, data: guineaFowlTreatment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to delete a GuineaFowlTreatment record by ID
export const deleteGuineaFowlTreatment = async (req, res) => {
  try {
    const guineaFowlTreatment = await GuineaFowlTreatment.findByIdAndDelete(req.params.id);
    if (!guineaFowlTreatment) {
      res.status(404).json({ success: false, error: 'GuineaFowlTreatment not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


// GUINEAFOWL MORTALITY

export const recordGuineaFowlMortality = async (req, res) => {
  let savedGuineaFowlMortality;

  try {
    const { batchNumber, quantity, cause, recordedBy } = req.body;

    // Record guinea fowl mortality
    const newGuineaFowlMortality = new GuineaFowlMortality({
      batchNumber,
      quantity,
      cause,
      recordedBy,
    });

    // Save guinea fowl mortality
    savedGuineaFowlMortality = await newGuineaFowlMortality.save();

    // Update the quantity in the batch
    await GuineaFowlStock.updateOne({ batchNumber }, { $inc: { quantity: -quantity } });

    // Log batch update
    const guineaFowlInfo = await GuineaFowlStock.findOne({ batchNumber });
    const batchUpdate = new GuineaFowlStockUpdate({
      batchNumber,
      previousQuantity: guineaFowlInfo.quantity + quantity,
      newQuantity: guineaFowlInfo.quantity,
      updatedBy: recordedBy,
    });

    await batchUpdate.save();

    res.status(201).json({ success: true, data: savedGuineaFowlMortality });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// EGG MANAGEMENT CONTROLLERS

import mongoose from 'mongoose';
import GuineaFowlSortedEgg from '../models/guineaFowlSortedEgg.model.js';
import GuineaFowlSortedEggInventory from '../models/guineaFowlSortedEggInvenotry.model.js';

export const recordSortedEggs = async (req, res) => {
  try {
    const { farmSection, date, crates, loose, category, grading, pickedBy, size } = req.body;

    // Ensure crates and loose are parsed as numbers
    const parsedCrates = parseInt(crates, 10) || 0;
    const parsedLoose = parseInt(loose, 10) || 0;

    // Validate if the parsed values are valid numbers
    if (isNaN(parsedCrates) || isNaN(parsedLoose)) {
      throw new Error('Invalid input for crates or loose.');
    }

    const parsedQuantity = parsedCrates + parsedLoose;

    // Save the new sorted egg
    const newGuineaFowlSortedEgg = new GuineaFowlSortedEgg({
      farmSection,
      date,
      crates: parsedCrates,
      loose: parsedLoose,
      category,
      grading,
      pickedBy,
      size,
    });

    const savedGuineaFowlSortedEgg = await newGuineaFowlSortedEgg.save();

    // Update GuineaFowlSortedEggInventory stock
    let inventory = await GuineaFowlSortedEggInventory.findOne(); // Assuming there's only one inventory record

    if (!inventory) {
      // If no inventory record exists, create a new instance
      inventory = new GuineaFowlSortedEggInventory();
    }

    // Update the inventory for the specific size
    inventory.sizes[size].crates += parsedCrates;
    inventory.sizes[size].loose += parsedLoose;
    
    await inventory.save();

    res.status(201).json({ success: true, data: savedGuineaFowlSortedEgg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};





export const addGuineaFowlUnsortedEgg = async (req, res) => {
  try {
    const { farmSection, date, crates, looseEggs, category, grading, pickedBy } = req.body;

    // Ensure crates and looseEggs are parsed as numbers
    const parsedCrates = parseInt(crates, 10) || 0;
    const parsedLooseEggs = parseInt(looseEggs, 10) || 0;

    // Validate if the parsed values are valid numbers
    if (isNaN(parsedCrates) || isNaN(parsedLooseEggs)) {
      throw new Error('Invalid input for crates or looseEggs.');
    }

    // Save the new egg
    const newGuineaFowlUnsortedEgg = new GuineaFowlUnsortedEgg({
      farmSection,
      date,
      crates: parsedCrates,
      looseEggs: parsedLooseEggs,
      category,
      grading,
      pickedBy,
    });

    const savedGuineaFowlUnsortedEgg = await newGuineaFowlUnsortedEgg.save();

    // Update GuineaFowlUnsortedEggInventory stock
    let inventory = await GuineaFowlUnsortedEggInventory.findOne(); // Assuming there's only one inventory record

    if (!inventory) {
      // If no inventory record exists, create a new instance
      inventory = new GuineaFowlUnsortedEggInventory();
    }

    // Update the inventory
    inventory.crates += parsedCrates;
    inventory.loose += parsedLooseEggs;
    
    await inventory.save();

    res.status(201).json({ success: true, data: savedGuineaFowlUnsortedEgg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// View all eggs collected each day
export const viewDailyGuneaFowlUnsortedEggs = async (req, res) => {
  try {
    // Assuming you have a 'date' parameter in the request query
    const { date } = req.query;

    // Fetch all unsorted eggs for the specified date using GuineaFowlUnsortedEgg model
    const eggs = await GuineaFowlUnsortedEgg.find({ date });

    res.status(200).json({ success: true, data: eggs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// View all sorted eggs collected each day
export const viewDailySortedGuineaFowlEggs = async (req, res) => {
  try {
    // Assuming you have a 'date' parameter in the request query
    const { date } = req.query;

    // Fetch all sorted eggs for the specified date using GuineaFowlSortedEgg model
    const eggs = await GuineaFowlSortedEgg.find({ date });

    res.status(200).json({ success: true, data: eggs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// Fetch current stock of unsorted eggs in crates
export const getCurrentUnsortedEggStockInCrates = async (req, res) => {
  try {
    // Assuming there's only one inventory record for unsorted eggs
    const inventory = await GuineaFowlUnsortedEggInventory.findOne();

    if (!inventory) {
      // If no inventory record exists, respond with 0 current stock in crates
      return res.status(200).json({ success: true, data: { currentStockInCrates: { crates: 0, loose: 0 } } });
    }

    // Respond with the current stock in crates
    res.status(200).json({
      success: true,
      data: { currentStockInCrates: { crates: inventory.crates, loose: inventory.loose } },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const getCurrentSortedGuineaFowlEggStockInCrates = async (req, res) => {
  try {
    // Assuming there's only one inventory record for sorted eggs
    const inventory = await GuineaFowlSortedEggInventory.findOne();

    if (!inventory) {
      // If no inventory record exists, respond with 0 stock in crates
      return res.status(200).json({
        success: true,
        data: {
          sizesInCrates: {
            small: '0 crates 0 loose',
            medium: '0 crates 0 loose',
            large: '0 crates 0 loose',
            extraLarge: '0 crates 0 loose',
          },
        },
      });
    }

    // Map the inventory data to the desired response format
    const sizesInCrates = {
      small: `${inventory.sizes.small.crates} crates ${inventory.sizes.small.loose} loose`,
      medium: `${inventory.sizes.medium.crates} crates ${inventory.sizes.medium.loose} loose`,
      large: `${inventory.sizes.large.crates} crates ${inventory.sizes.large.loose} loose`,
      extraLarge: `${inventory.sizes.extraLarge.crates} crates ${inventory.sizes.extraLarge.loose} loose`,
    };

    // Respond with the current stock in crates
    res.status(200).json({ success: true, data: { sizesInCrates } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// MOVEMENT OF GUINEA FOWLS


// Controller function to move a batch of birds to another farm section
export const moveGuineaFowls = async (req, res) => {
  try {
    // Extract data from the request body
    const { batchNumber, fromFarmSection, toFarmSection, quantity, movementBy, movementReason } = req.body;

    // Fetch the batch from the 'fromFarmSection'
    const sourceBatch = await GuineaFowlStock.findOne({ batchNumber, farmSection: fromFarmSection });

    if (!sourceBatch) {
      return res.status(404).json({ success: false, error: 'Batch not found in the specified farm section' });
    }

    // Check if the quantity being moved is not more than the available quantity
    if (quantity > sourceBatch.quantity) {
      return res.status(400).json({ success: false, error: 'Not enough birds to move' });
    }

    // If the quantity being moved is equal to the available quantity, update both quantity and farm section
    if (quantity === sourceBatch.quantity) {
      // Update the quantity of birds and farm section in the 'fromFarmSection'
      sourceBatch.quantity -= quantity;
      sourceBatch.farmSection = toFarmSection;
      await sourceBatch.save();
    } else {
      // Create a new batch with the quantity being moved
      const newBatch = new GuineaFowlStock({
        quantity,
        arrivalDate: sourceBatch.arrivalDate,
        createdBy: sourceBatch.createdBy,
        farmSection: toFarmSection,
      });
      // Save the new batch to the database
      await newBatch.save();

      // Update the quantity of birds in the 'fromFarmSection'
      sourceBatch.quantity -= quantity;
      await sourceBatch.save();
    }

    // Create a new GuineaFowlMovement instance
    const movement = new GuineaFowlMovement({
      batchNumber,
      fromFarmSection,
      toFarmSection,
      quantity,
      movementBy,
      movementReason,
    });

    // Save the movement data to the database
    await movement.save();

    // Respond with success message
    res.status(200).json({ success: true, message: 'Batch moved successfully' });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


// Controller function to get all movements
export const getAllMovements = async (req, res) => {
  try {
    // Fetch all movements from the database
    const movements = await GuineaFowlMovement.find();

    // Respond with the list of movements
    res.status(200).json({ success: true, data: movements });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Controller function to get all movements within a particular period
export const getMovementsByPeriod = async (req, res) => {
  try {
    // Extract start and end dates from the request query parameters
    const { startDate, endDate } = req.query;

    // Parse the dates in the specified format
    const parsedStartDate = new Date(`${startDate}T00:00:00.000Z`);
    const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);

    // Fetch movements within the specified period from the database
    const movements = await GuineaFowlMovement.find({
      movementDate: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Respond with the list of movements within the period
    res.status(200).json({ success: true, data: movements });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


// EGG SALES CONTROLLERS
// Controller for making egg sales
export const sellGuineaFowlEggs = async (req, res) => {
  try {
    const { customerName, phoneNumber, crates, unitPricePerCrate, category, size, salesMadeBy } = req.body;

    // Create a new instance of GuineaFowlEggSale
    const newEggSale = new GuineaFowlEggSale({
      customerName,
      phoneNumber,
      crates,
      unitPricePerCrate,
      category,
      size,
      salesMadeBy,
    });

    // Save the new egg sale
    const savedEggSale = await newEggSale.save();

    // Deduct crates from the corresponding inventory based on the category
    if (category === 'sorted') {
      // Deduct from GuineaFowlSortedEggInventory
      const inventory = await GuineaFowlSortedEggInventory.findOne();
      inventory.sizes[size].crates -= crates;
      await inventory.save();
    } else if (category === 'unsorted') {
      const inventory = await UnsortedEggInventory.findOne();
      inventory.crates -= crates;
      await inventory.save();
    } else {
      throw new Error('Invalid egg category');
    }

    res.status(201).json({ success: true, data: savedEggSale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Controller to view egg sales within a particular period
export const viewGuineaFowlEggSalesByPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query GuineaFowlEggSale model for sales within the specified period
    const eggSales = await GuineaFowlEggSale.find({
      createdAt: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    res.status(200).json({ success: true, data: eggSales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// BIRD SALE CONTROLLERS
export const recordGuineaFowlSale = async (req, res) => {
  let savedBirdSale;

  try {
    const { salesNumber, sales, soldBy } = req.body;
    const birdSales = [];

    // Validate and process each sale
    for (const sale of sales) {
      const { batch, quantity, unitPricePerBird } = sale;

      // Check if there is sufficient quantity in the batch
      const birdInfo = await GuineaFowlStock.findOne({ batchNumber: batch });

      if (!birdInfo || birdInfo.quantity < quantity) {
        return res.status(400).json({ success: false, message: 'Insufficient quantity in the batch' });
      }

      // Collect bird sales for later use
      birdSales.push({
        batch,
        quantity,
        unitPricePerBird,
        totalAmount: unitPricePerBird * quantity,
      });
    }

    // Record the bird sale after processing all sales
    const newBirdSale = new GuineaFowlBirdSale({
      salesNumber,
      sales: birdSales,
      soldBy,
    });

    savedBirdSale = await newBirdSale.save();

    // Update quantities and save batch updates
    for (const sale of birdSales) {
      const { batch, quantity } = sale;

      const previousQuantity = (await GuineaFowlStock.findOne({ batchNumber: batch })).quantity;
      const newQuantity = previousQuantity - quantity;

      // Update the quantity in the GuineaFowlStock model
      await GuineaFowlStock.updateOne({ batchNumber: batch }, { $set: { quantity: newQuantity } });

      const batchUpdate = new GuineaFowlStockUpdate({
        batchNumber: batch,
        previousQuantity,
        newQuantity,
        updatedBy: soldBy,
      });

      await batchUpdate.save();
    }

    res.status(201).json({ success: true, data: savedBirdSale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const viewGuineaFowlSalesWithinPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query GuineaFowlBirdSale collection for sales within the specified period
    const sales = await GuineaFowlBirdSale.find({
      createdAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    // Calculate the overall total by summing up the total amounts for all sales
    const overallTotal = sales.reduce((sum, sale) => {
      const saleTotalAmount = sale.sales.reduce((saleSum, s) => saleSum + s.totalAmount, 0);
      return sum + saleTotalAmount;
    }, 0);

    // Include the overall total in the response
    const salesWithOverallTotal = sales.map((sale) => {
      const saleTotalAmount = sale.sales.reduce((saleSum, s) => saleSum + s.totalAmount, 0);
      return {
        ...sale.toObject(),
        saleTotalAmount,
      };
    });

    res.status(200).json({ success: true, data: { sales: salesWithOverallTotal, overallTotal } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// MORTALITY CONTROLLER

// Controller function to view mortality of a particular batch
export const viewGuineaFowlMortalityByBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Find the Guinea Fowl mortality records by batchNumber
    const guineaFowlMortality = await GuineaFowlMortality.find({ batchNumber });

    // Check if there are mortality records for the specified batchNumber
    if (guineaFowlMortality.length === 0) {
      return res.status(404).json({ success: false, error: 'No mortality records found for the batch' });
    }

    // Respond with the mortality records for the batch
    res.status(200).json({ success: true, data: guineaFowlMortality });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
