import UnsortedEgg from '../models/unsortedEgg.model.js';  // Update the import statement
import UnsortedEggInventory from '../models/unsortedEggStock.model.js';
import SortedEgg from '../models/sortedEgg.model.js';
import SortedEggInventory from '../models/sortedEggStock.model.js';


// Create an egg
export const addUnsortedEgg = async (req, res) => {
  try {
    const { farmSection, date, crates, looseEggs, category, grading, pickedBy } = req.body;

    // Ensure crates and looseEggs are parsed as numbers
    const parsedCrates = parseInt(crates, 10) || 0;
    const parsedLooseEggs = parseInt(looseEggs, 10) || 0;
    const parsedQuantity = parsedCrates * /* Number of eggs per crate, adjust as needed */ + parsedLooseEggs;

    // Save the new egg
    const newEgg = new UnsortedEgg({
      farmSection,
      date,
      crates: parsedCrates,
      looseEggs: parsedLooseEggs,
      category,
      grading,
      pickedBy,
    });

    const savedEgg = await newEgg.save();

    // Update UnsortedEggInventory stock
    let inventory = await UnsortedEggInventory.findOne(); // Assuming there's only one inventory record

    if (!inventory) {
      // If no inventory record exists, create a new instance
      inventory = new UnsortedEggInventory();
    }

    // Update the inventory
    inventory.crates += parsedCrates;
    inventory.loose += parsedLooseEggs;
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
    const newSortedEgg = new SortedEgg({
      farmSection,
      date,
      crates: parsedCrates,
      loose: parsedLoose,
      category,
      grading,
      pickedBy,
      size,
    });

    const savedSortedEgg = await newSortedEgg.save();

    // Update SortedEggInventory stock
    let inventory = await SortedEggInventory.findOne(); // Assuming there's only one inventory record

    if (!inventory) {
      // If no inventory record exists, create a new instance
      inventory = new SortedEggInventory();
    }

    // Update the inventory for the specific size
    inventory.sizes[size].crates += parsedCrates;
    inventory.sizes[size].loose += parsedLoose;
    
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


// Fetch current stock of unsorted eggs in crates
export const getCurrentUnsortedEggStockInCrates = async (req, res) => {
  try {
    // Assuming there's only one inventory record for unsorted eggs
    const inventory = await UnsortedEggInventory.findOne();

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



// Fetch current stock of sorted eggs in crates
export const getCurrentSortedEggStockInCrates = async (req, res) => {
  try {
    // Assuming there's only one inventory record for sorted eggs
    const inventory = await SortedEggInventory.findOne();

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
