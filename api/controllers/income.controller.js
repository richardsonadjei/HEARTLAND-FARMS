import mongoose from 'mongoose';
import EggSale from '../models/eggSale.model.js';
import SortedEggInventory from '../models/sortedEggStock.model.js';
import UnsortedEggInventory from '../models/unsortedEggStock.model.js';
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


    res.status(201).json({ success: true, data: savedEggSale });
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

  let savedBirdSale; // Declare the variable outside the loop scope
  
  try {
    const { salesNumber, sales, soldBy } = req.body;
    const birdSales = [];

    for (const sale of sales) {
      const { batch, quantity, unitPricePerBird } = sale;

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
        batch,
        quantity,
        unitPricePerBird,
      });

      // Save the bird sale
      savedBirdSale = await newBirdSale.save();
      birdSales.push(savedBirdSale); // Collect bird sales for later use

      // Update the quantity in the batch
      const previousQuantity = birdInfo.quantity;
      const newQuantity = previousQuantity - quantity;

      // Update the quantity in the Bird model
      await Bird.updateOne({ batchNumber: batch }, { $set: { quantity: newQuantity } });

      const batchUpdate = new BatchUpdate({
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




export const viewBirdSalesWithinPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query BirdSale collection for sales within the specified period
    const sales = await BirdSale.find({
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

