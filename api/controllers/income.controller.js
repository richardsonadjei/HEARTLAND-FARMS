import mongoose from 'mongoose';
import EggSale from '../models/eggSale.model.js';
import SortedEggInventory from '../models/sortedEggStock.model.js';
import UnsortedEggInventory from '../models/unsortedEggStock.model.js';
import PoultryIncome from '../models/poultryIncome.model.js';
import BirdSale from '../models/birdSale.model.js';
import BatchUpdate from '../models/batchUpdate.model.js';
import Bird from '../models/poultry.model.js';


// Controller for making egg sales
export const makeEggSale = async (req, res) => {
  try {
    const { customerName, phoneNumber, crates, unitPricePerCrate, category, size, salesMadeBy } = req.body;

    // Create a new instance of EggSale
    const newEggSale = new EggSale({
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
      // Deduct from SortedEggInventory
      const inventory = await SortedEggInventory.findOne();
      inventory.sizes[size].crates -= crates;
      await inventory.save();
    } else if (category === 'unsorted') {
      // Deduct from UnsortedEggInventory
      const inventory = await UnsortedEggInventory.findOne();
      inventory.crates -= crates;
      await inventory.save();
    } else {
      throw new Error('Invalid egg category');
    }

    // Create a new instance of PoultryIncome
    const newPoultryIncome = new PoultryIncome({
      totalAmount: newEggSale.totalAmount,
      salesNumber: newEggSale.salesNumber,
    });

    // Save the new poultry income
    await newPoultryIncome.save();

    res.status(201).json({ success: true, data: savedEggSale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export const viewPoultryIncomeSales = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query PoultryIncome collection for sales within the specified period
    const sales = await PoultryIncome.find({
      createdAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ success: true, data: sales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export const viewEggSalesWithinPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query EggSale collection for sales within the specified period
    const sales = await EggSale.find({
      createdAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ success: true, data: sales });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const recordBirdSale = async (req, res) => {
  let savedBirdSale;
  let totalPoultryIncomeAmount = 0;

  try {
    const { salesNumber, sales, soldBy } = req.body;

    for (const sale of sales) {
      const { batch, quantity, totalAmount } = sale;

      // Check if totalAmount is a valid number
      if (isNaN(totalAmount)) {
        console.log('Invalid totalAmount:', totalAmount);
        return res.status(400).json({ success: false, message: 'Invalid totalAmount in the sales data' });
      }

      // Check if there is sufficient quantity in the batch
      const birdInfo = await Bird.findOne({ batchNumber: batch });

      if (!birdInfo || birdInfo.quantity < quantity) {
        return res.status(400).json({ success: false, message: 'Insufficient quantity in the batch' });
      }

      // Record the bird sale
      const newBirdSale = new BirdSale({
        salesNumber,
        sales,
        soldBy,
      });

      savedBirdSale = await newBirdSale.save();

      // Update the quantity in the batch
      const previousQuantity = birdInfo.quantity;
      const newQuantity = previousQuantity - quantity;

      // Update the quantity in the Bird model
      await Bird.updateOne({ batchNumber: batch }, { $set: { quantity: newQuantity } });

      // Accumulate the totalAmount for PoultryIncome
      totalPoultryIncomeAmount += totalAmount;
      
      const batchUpdate = new BatchUpdate({
        batchNumber: batch,
        previousQuantity,
        newQuantity,
        updatedBy: soldBy,
      });

      await batchUpdate.save();
    }

    // Save PoultryIncome with the accumulated totalAmount
    const poultryIncome = new PoultryIncome({
      category: 'bird sales',
      totalAmount: totalPoultryIncomeAmount,
      salesNumber: salesNumber,
    });

    await poultryIncome.save();

    res.status(201).json({ success: true, data: savedBirdSale });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
