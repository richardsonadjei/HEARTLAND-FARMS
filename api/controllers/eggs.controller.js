import UnsortedEgg from '../models/unsortedEgg.model.js';  // Update the import statement
import UnsortedEggInventory from '../models/unsortedEggStock.model.js';
import SortedEgg from '../models/sortedEgg.model.js';
import SortedEggInventory from '../models/sortedEggStock.model.js';

// Create an egg
export const createEgg = async (req, res) => {
  try {
    const { farmSection, date, quantity, category, grading, pickedBy } = req.body;

    // Ensure quantity is parsed as a number
    const parsedQuantity = parseInt(quantity, 10);

    // Save the new egg
    const newEgg = new UnsortedEgg({
      farmSection,
      date,
      quantity: parsedQuantity,
      category,
      grading,
      pickedBy,
    });

    const savedEgg = await newEgg.save();

    // Update UnsortedEggInventory currentStock
    let inventory = await UnsortedEggInventory.findOne(); // Assuming there's only one inventory record

    if (!inventory) {
      // If no inventory record exists, create a new instance with initial stock as 0
      inventory = new UnsortedEggInventory({ currentStock: 0 });
    }

    inventory.currentStock += parsedQuantity;
    await inventory.save();

    res.status(201).json({ success: true, data: savedEgg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// View all eggs collected each day
export const viewDailyUnsortedEggs = async (req, res) => {
  try {
    // Assuming you have a 'date' parameter in the request query
    const { date } = req.query;

    // Fetch all unsorted eggs for the specified date
    const eggs = await UnsortedEgg.find({ date });

    res.status(200).json({ success: true, data: eggs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get unsorted eggs within a particular period
export const getUnsortedEggsByPeriod = async (req, res) => {
  try {
    // Assuming you have 'startDate' and 'endDate' parameters in the request query
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Fetch unsorted eggs within the specified period
    const eggs = await UnsortedEgg.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
      category: 'unsorted',
    });

    res.status(200).json({ success: true, data: eggs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Record sorted eggs and update inventory
export const recordSortedEggs = async (req, res) => {
  try {
    const { farmSection, date, quantity, category, grading, pickedBy, size } = req.body;

    // Ensure quantity is parsed as a number
    const parsedQuantity = parseInt(quantity, 10);

    // Save the new sorted egg
    const newSortedEgg = new SortedEgg({
      farmSection,
      date,
      quantity: parsedQuantity,
      category,
      grading,
      pickedBy,
      size,
    });

    const savedSortedEgg = await newSortedEgg.save();

    // Update SortedEggInventory for the specified size
    let inventory = await SortedEggInventory.findOne(); // Assuming there's only one inventory record

    if (!inventory) {
      // If no inventory record exists, create a new instance with initial stock as 0
      inventory = new SortedEggInventory({
        sizes: {
          small: 0,
          medium: 0,
          large: 0,
          extraLarge: 0,
        },
      });
    }

    // Update the inventory based on the size of the sorted egg
    inventory.sizes[size] += parsedQuantity;

    // Save the updated inventory
    await inventory.save();

    res.status(201).json({ success: true, data: savedSortedEgg });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// View all sorted eggs collected each day
export const viewDailySortedEggs = async (req, res) => {
  try {
    // Assuming you have a 'date' parameter in the request query
    const { date } = req.query;

    // Fetch all sorted eggs for the specified date
    const eggs = await SortedEgg.find({ date });

    res.status(200).json({ success: true, data: eggs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Fetch current stock of unsorted eggs
export const getCurrentUnsortedEggStock = async (req, res) => {
  try {
    // Assuming there's only one inventory record for unsorted eggs
    const inventory = await UnsortedEggInventory.findOne();

    if (!inventory) {
      // If no inventory record exists, respond with 0 current stock
      return res.status(200).json({ success: true, data: { currentStock: 0 } });
    }

    // Respond with the current stock
    res.status(200).json({ success: true, data: { currentStock: inventory.currentStock } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// Fetch current stock of sorted eggs by sizes
export const getCurrentSortedEggStock = async (req, res) => {
  try {
    // Assuming there's only one inventory record for sorted eggs
    const inventory = await SortedEggInventory.findOne();

    if (!inventory) {
      // If no inventory record exists, respond with 0 stock for each size
      return res.status(200).json({
        success: true,
        data: {
          sizes: {
            small: 0,
            medium: 0,
            large: 0,
            extraLarge: 0,
          },
        },
      });
    }

    // Respond with the current stock by sizes
    res.status(200).json({ success: true, data: { sizes: inventory.sizes } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
