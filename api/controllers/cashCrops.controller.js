
import CashCropHarvest from "../models/cashCropHarvest.model.js";
import CashCropLandPreparation from "../models/cashCropLandPreparation.model.js";
import CashCropManualWeeding from "../models/cashCropManualWeeding.model.js";
import CashCropPestAndDiseaseControl from "../models/cashCropPestAndDiseaseControl.model.js";
import CashCropPlanting from "../models/cashCropPlanting.model.js";
import CashCropWeedicideApplication from "../models/cashCropWeedicideApplication.model.js";
import CashCropExpense from "../models/cashcropExpense.model.js";
import CashCrops from "../models/newCashCrop.model.js";
import CashCropsBatches from "../models/newCashCropBatch.model.js";
import CashCropFertilizerApplication from "../models/cashCropFertilizerApplication.model.js";


// Controller to create a new cash crop
const createCashCrop = async (req, res) => {
  try {
    const { name, description } = req.body;
    const cashCrop = new CashCrops({ name, description });
    await cashCrop.save();
    res.status(201).json(cashCrop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all cash crops
const getAllCashCrops = async (req, res) => {
  try {
    const cashCrops = await CashCrops.find();
    res.json(cashCrops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Controller to get a single cash crop by ID
const getCashCropById = async (req, res) => {
  try {
    const { id } = req.params;
    const cashCrop = await CashCrops.findById(id);
    if (!cashCrop) {
      return res.status(404).json({ error: 'Cash crop not found' });
    }
    res.json(cashCrop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a cash crop by ID
const updateCashCropById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedCashCrop = await CashCrops.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedCashCrop) {
      return res.status(404).json({ error: 'Cash crop not found' });
    }
    res.json(updatedCashCrop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a cash crop by ID
const deleteCashCropById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCashCrop = await CashCrops.findByIdAndDelete(id);
    if (!deletedCashCrop) {
      return res.status(404).json({ error: 'Cash crop not found' });
    }
    res.json({ message: 'Cash crop deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createCashCrop, getAllCashCrops, getCashCropById, updateCashCropById, deleteCashCropById };




// Controller to create a new cash crop batch
const createCashCropBatch = async (req, res) => {
  try {
    const { type, variety, additionalDetails } = req.body;
    if (!type || !variety) {
      return res.status(400).json({ error: 'Type and variety are required fields.' });
    }
    const cashCropBatch = new CashCropsBatches({ type, variety, additionalDetails });
    await cashCropBatch.save();
    res.status(201).json(cashCropBatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default createCashCropBatch;


// Controller to get all cash crop batches
const getAllCashCropBatches = async (req, res) => {
  try {
    const cashCropBatches = await CashCropsBatches.find();
    res.json(cashCropBatches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCashCropBatchesByType = async (req, res) => {
  const vegetableType = req.params.type; // Assuming the type is passed as a parameter
  try {
    const batches = await CashCropsBatches.find({ type: vegetableType });
    if (batches.length === 0) {
      return res.status(404).json({ message: 'No batches found for the specified vegetable type' });
    }
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCashCropBatchesByType };
  
  

// Controller to get a single cash crop batch by ID
const getCashCropBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const cashCropBatch = await CashCropsBatches.findById(id);
    if (!cashCropBatch) {
      return res.status(404).json({ error: 'Cash crop batch not found' });
    }
    res.json(cashCropBatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a cash crop batch by ID
const updateCashCropBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, additionalDetails } = req.body;
    const updatedCashCropBatch = await CashCropsBatches.findByIdAndUpdate(
      id,
      { type, additionalDetails },
      { new: true }
    );
    if (!updatedCashCropBatch) {
      return res.status(404).json({ error: 'Cash crop batch not found' });
    }
    res.json(updatedCashCropBatch);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a cash crop batch by ID
const deleteCashCropBatchById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCashCropBatch = await CashCropsBatches.findByIdAndDelete(id);
    if (!deletedCashCropBatch) {
      return res.status(404).json({ error: 'Cash crop batch not found' });
    }
    res.json({ message: 'Cash crop batch deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createCashCropBatch, getAllCashCropBatches, getCashCropBatchById, updateCashCropBatchById, deleteCashCropBatchById };




// Controller to create a new cash crop land preparation entry
const createCashCropLandPreparation = async (req, res) => {
  try {
    const cashCropLandPreparation = new CashCropLandPreparation(req.body);
    await cashCropLandPreparation.save();
    res.status(201).json(cashCropLandPreparation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all cash crop land preparation entries
const getAllCashCropLandPreparations = async (req, res) => {
  try {
    const cashCropLandPreparations = await CashCropLandPreparation.find();
    res.status(200).json(cashCropLandPreparations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to fetch all cash crop land preparations for a particular batch of type of cash crop
export const getCashCropLandPreparationsByBatchAndCropType = async (req, res) => {
  try {
    const { batchNumber, cropType } = req.params;
    const cashCropLandPreparations = await CashCropLandPreparation.find({ batchNumber, cropType });
    res.status(200).json(cashCropLandPreparations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller function to fetch all land preparations with a specific batchNumber, defaulting cashCrop to "Maize"
export const getMaizeBatchLandPreparations = async (req, res) => {
  const { batchNumber } = req.query;
  const cashCrop = req.query.cashCrop || 'Maize'; // Default to "Maize" if cashCrop is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const landPreparations = await CashCropLandPreparation.find({
      cashCrop: cashCrop,
      batchNumber: batchNumber,
    });

    if (landPreparations.length === 0) {
      return res.status(404).json({ message: 'No land preparations found for the given batchNumber and cashCrop' });
    }

    res.status(200).json(landPreparations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching land preparations' });
  }
};

// Controller function to fetch all land preparations with a specific batchNumber, defaulting cashCrop to "Maize"
export const getCassavaBatchLandPreparations = async (req, res) => {
  const { batchNumber } = req.query;
  const cashCrop = req.query.cashCrop || 'Cassava'; // Default to "Maize" if cashCrop is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const landPreparations = await CashCropLandPreparation.find({
      cashCrop: cashCrop,
      batchNumber: batchNumber,
    });

    if (landPreparations.length === 0) {
      return res.status(404).json({ message: 'No land preparations found for the given batchNumber and cashCrop' });
    }

    res.status(200).json(landPreparations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching land preparations' });
  }
};


// Controller function to fetch all land preparations with a specific batchNumber, defaulting cashCrop to "Maize"
export const getPlantainBatchLandPreparations = async (req, res) => {
  const { batchNumber } = req.query;
  const cashCrop = req.query.cashCrop || 'Plantain'; // Default to "Maize" if cashCrop is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const landPreparations = await CashCropLandPreparation.find({
      cashCrop: cashCrop,
      batchNumber: batchNumber,
    });

    if (landPreparations.length === 0) {
      return res.status(404).json({ message: 'No land preparations found for the given batchNumber and cashCrop' });
    }

    res.status(200).json(landPreparations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching land preparations' });
  }
};


// Controller to get a single cash crop land preparation entry by ID
const getCashCropLandPreparationById = async (req, res) => {
  try {
    const { id } = req.params;
    const cashCropLandPreparation = await CashCropLandPreparation.findById(id);
    if (!cashCropLandPreparation) {
      return res.status(404).json({ message: 'Cash crop land preparation not found' });
    }
    res.status(200).json(cashCropLandPreparation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a cash crop land preparation entry by ID
const updateCashCropLandPreparationById = async (req, res) => {
  try {
    const { id } = req.params;
    const cashCropLandPreparation = await CashCropLandPreparation.findByIdAndUpdate(id, req.body, { new: true });
    if (!cashCropLandPreparation) {
      return res.status(404).json({ message: 'Cash crop land preparation not found' });
    }
    res.status(200).json(cashCropLandPreparation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a cash crop land preparation entry by ID
const deleteCashCropLandPreparationById = async (req, res) => {
  try {
    const { id } = req.params;
    const cashCropLandPreparation = await CashCropLandPreparation.findByIdAndDelete(id);
    if (!cashCropLandPreparation) {
      return res.status(404).json({ message: 'Cash crop land preparation not found' });
    }
    res.status(200).json({ message: 'Cash crop land preparation deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createCashCropLandPreparation,
  getAllCashCropLandPreparations,
  getCashCropLandPreparationById,
  updateCashCropLandPreparationById,
  deleteCashCropLandPreparationById,

};




// Create a new cash crop planting record
const createCashCropPlanting = async (req, res) => {
  try {
    const newCashCropPlanting = new CashCropPlanting(req.body);
    const savedCashCropPlanting = await newCashCropPlanting.save();
    res.status(201).json(savedCashCropPlanting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all cash crop planting records
const getAllCashCropPlantings = async (req, res) => {
  try {
    const cashCropPlantings = await CashCropPlanting.find();
    res.json(cashCropPlantings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cash crop planting records for a particular batch of type of cash crop
export const getCashCropPlantingsByBatchAndCropType = async (req, res) => {
  try {
    const { batchNumber, cropType } = req.params;
    const cashCropPlantings = await CashCropPlanting.find({ batchNumber, cropType });
    res.status(200).json(cashCropPlantings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get a single cash crop planting record by ID
const getCashCropPlantingById = async (req, res) => {
  try {
    const cashCropPlanting = await CashCropPlanting.findById(req.params.id);
    if (!cashCropPlanting) {
      return res.status(404).json({ message: 'Cash crop planting record not found' });
    }
    res.json(cashCropPlanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a cash crop planting record by ID
const updateCashCropPlanting = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCashCropPlanting = await CashCropPlanting.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCashCropPlanting) {
      return res.status(404).json({ message: 'Cash crop planting record not found' });
    }
    res.json(updatedCashCropPlanting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a cash crop planting record by ID
const deleteCashCropPlanting = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCashCropPlanting = await CashCropPlanting.findByIdAndDelete(id);
    if (!deletedCashCropPlanting) {
      return res.status(404).json({ message: 'Cash crop planting record not found' });
    }
    res.json({ message: 'Cash crop planting record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getMaizeBatchPlantings = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Maize'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const plantings = await CashCropPlanting.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (plantings.length === 0) {
      return res.status(404).json({ message: 'No plantings found for the given batchNumber and type' });
    }

    res.status(200).json(plantings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching planting records' });
  }
};

export const getCassavaBatchPlantings = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Cassava'; // Default to "Cassava" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const plantings = await CashCropPlanting.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (plantings.length === 0) {
      return res.status(404).json({ message: 'No plantings found for the given batchNumber and type' });
    }

    res.status(200).json(plantings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching planting records' });
  }
};


export const getPlantainBatchPlantings = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Plantain'; // Default to "Cassava" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const plantings = await CashCropPlanting.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (plantings.length === 0) {
      return res.status(404).json({ message: 'No plantings found for the given batchNumber and type' });
    }

    res.status(200).json(plantings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching planting records' });
  }
};
export {
  createCashCropPlanting,
  getAllCashCropPlantings,
  getCashCropPlantingById,
  updateCashCropPlanting,
  deleteCashCropPlanting,
  
};



// Controller to create a new cash crop manual weeding record
export const createCashCropManualWeeding = async (req, res) => {
  try {
    const cashCropManualWeeding = new CashCropManualWeeding(req.body);
    await cashCropManualWeeding.save();
    res.status(201).json(cashCropManualWeeding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all cash crop manual weeding records
export const getCashCropManualWeedings = async (req, res) => {
  try {
    const cashCropManualWeedings = await CashCropManualWeeding.find();
    res.status(200).json(cashCropManualWeedings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all cash crop manual weeding records for a specific batch and type
export const getCashCropManualWeedingsByBatchAndType = async (req, res) => {
  try {
    const { batchNumber, cropType } = req.params;
    const cashCropManualWeedings = await CashCropManualWeeding.find({ batchNumber, cropType });
    res.status(200).json(cashCropManualWeedings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get a single cash crop manual weeding record by ID
export const getCashCropManualWeedingById = async (req, res) => {
  try {
    const { id } = req.params;
    const cashCropManualWeeding = await CashCropManualWeeding.findById(id);
    if (!cashCropManualWeeding) {
      return res.status(404).json({ message: 'Cash crop manual weeding record not found' });
    }
    res.status(200).json(cashCropManualWeeding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a cash crop manual weeding record
export const updateCashCropManualWeeding = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCashCropManualWeeding = await CashCropManualWeeding.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCashCropManualWeeding) {
      return res.status(404).json({ message: 'Cash crop manual weeding record not found' });
    }
    res.status(200).json(updatedCashCropManualWeeding);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a cash crop manual weeding record
export const deleteCashCropManualWeeding = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCashCropManualWeeding = await CashCropManualWeeding.findByIdAndDelete(id);
    if (!deletedCashCropManualWeeding) {
      return res.status(404).json({ message: 'Cash crop manual weeding record not found' });
    }
    res.status(200).json({ message: 'Cash crop manual weeding record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getMaizeBatchManualWeedings = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Maize'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const manualWeedings = await CashCropManualWeeding.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (manualWeedings.length === 0) {
      return res.status(404).json({ message: 'No manual weedings found for the given batchNumber and type' });
    }

    res.status(200).json(manualWeedings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching manual weeding records' });
  }
};

export const getPlantainBatchManualWeedings = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Maize'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const manualWeedings = await CashCropManualWeeding.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (manualWeedings.length === 0) {
      return res.status(404).json({ message: 'No manual weedings found for the given batchNumber and type' });
    }

    res.status(200).json(manualWeedings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching manual weeding records' });
  }
};

export const getCassavaBatchManualWeedings = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Cassava'; // Default to "Cassava" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const manualWeedings = await CashCropManualWeeding.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (manualWeedings.length === 0) {
      return res.status(404).json({ message: 'No manual weedings found for the given batchNumber and type' });
    }

    res.status(200).json(manualWeedings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching manual weeding records' });
  }
};




// WWEDICIDE APPLICATION

// Controller to create a new cash crop weedicide application record
export const createCashCropWeedicideApplication = async (req, res) => {
  try {
    const cashCropWeedicideApplication = new CashCropWeedicideApplication(req.body);
    await cashCropWeedicideApplication.save();
    res.status(201).json(cashCropWeedicideApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to get all cash crop weedicide application records
export const getAllCashCropWeedicideApplications = async (req, res) => {
  try {
    const cashCropWeedicideApplications = await CashCropWeedicideApplication.find();
    res.status(200).json(cashCropWeedicideApplications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getCashCropWeedicideApplicationByTypeAndBatch = async (req, res) => {
  const { type, batchNumber } = req.query;

  try {
    const weedicideApplicationRecord = await CashCropWeedicideApplication.findOne({ type, batchNumber });

    if (!weedicideApplicationRecord) {
      return res.status(404).json({ message: 'Weedicide application record not found' });
    }

    res.status(200).json(weedicideApplicationRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller to get a single cash crop weedicide application record by ID
export const getCashCropWeedicideApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const cashCropWeedicideApplication = await CashCropWeedicideApplication.findById(id);
    if (!cashCropWeedicideApplication) {
      return res.status(404).json({ message: 'Cash crop weedicide application record not found' });
    }
    res.status(200).json(cashCropWeedicideApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to update a cash crop weedicide application record
export const updateCashCropWeedicideApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCashCropWeedicideApplication = await CashCropWeedicideApplication.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCashCropWeedicideApplication) {
      return res.status(404).json({ message: 'Cash crop weedicide application record not found' });
    }
    res.status(200).json(updatedCashCropWeedicideApplication);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to delete a cash crop weedicide application record
export const deleteCashCropWeedicideApplication = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCashCropWeedicideApplication = await CashCropWeedicideApplication.findByIdAndDelete(id);
    if (!deletedCashCropWeedicideApplication) {
      return res.status(404).json({ message: 'Cash crop weedicide application record not found' });
    }
    res.status(200).json({ message: 'Cash crop weedicide application record deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getMaizeBatchWeedicideApplications = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Maize'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const weedicideApplications = await CashCropWeedicideApplication.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (weedicideApplications.length === 0) {
      return res.status(404).json({ message: 'No weedicide applications found for the given batchNumber and type' });
    }

    res.status(200).json(weedicideApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weedicide application records' });
  }
};

export const getCassavaBatchWeedicideApplications = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Cassava'; // Default to "Cassava" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const weedicideApplications = await CashCropWeedicideApplication.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (weedicideApplications.length === 0) {
      return res.status(404).json({ message: 'No weedicide applications found for the given batchNumber and type' });
    }

    res.status(200).json(weedicideApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weedicide application records' });
  }
};


export const getPlantainBatchWeedicideApplications = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Cassava'; // Default to "Cassava" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const weedicideApplications = await CashCropWeedicideApplication.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (weedicideApplications.length === 0) {
      return res.status(404).json({ message: 'No weedicide applications found for the given batchNumber and type' });
    }

    res.status(200).json(weedicideApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching weedicide application records' });
  }
};



// Create a new cash crop pest and disease control record
export const createCashCropPestAndDiseaseControl = async (req, res) => {
  try {
    const cashCropPestAndDiseaseControl = new CashCropPestAndDiseaseControl(req.body);
    await cashCropPestAndDiseaseControl.save();
    res.status(201).json(cashCropPestAndDiseaseControl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all cash crop pest and disease control records
export const getAllCashCropPestAndDiseaseControls = async (req, res) => {
  try {
    const cashCropPestAndDiseaseControls = await CashCropPestAndDiseaseControl.find();
    res.status(200).json(cashCropPestAndDiseaseControls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCashCropPestAndDiseaseControlsByTypeAndBatch = async (req, res) => {
  try {
    const { batchNumber, type } = req.params;
    const pestAndDiseaseControls = await CashCropPestAndDiseaseControl.find({ batchNumber, type });
    res.status(200).json(pestAndDiseaseControls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get a single cash crop pest and disease control record by ID
export const getCashCropPestAndDiseaseControlById = async (req, res) => {
  try {
    const { id } = req.params;
    const cashCropPestAndDiseaseControl = await CashCropPestAndDiseaseControl.findById(id);
    if (!cashCropPestAndDiseaseControl) {
      res.status(404).json({ message: 'Cash crop pest and disease control record not found' });
    } else {
      res.status(200).json(cashCropPestAndDiseaseControl);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a cash crop pest and disease control record by ID
export const updateCashCropPestAndDiseaseControl = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCashCropPestAndDiseaseControl = await CashCropPestAndDiseaseControl.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCashCropPestAndDiseaseControl) {
      res.status(404).json({ message: 'Cash crop pest and disease control record not found' });
    } else {
      res.status(200).json(updatedCashCropPestAndDiseaseControl);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a cash crop pest and disease control record by ID
export const deleteCashCropPestAndDiseaseControl = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCashCropPestAndDiseaseControl = await CashCropPestAndDiseaseControl.findByIdAndDelete(id);
    if (!deletedCashCropPestAndDiseaseControl) {
      res.status(404).json({ message: 'Cash crop pest and disease control record not found' });
    } else {
      res.status(200).json({ message: 'Cash crop pest and disease control record deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getMaizeBatchPestAndDiseaseControls = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Maize'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const pestAndDiseaseControls = await CashCropPestAndDiseaseControl.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (pestAndDiseaseControls.length === 0) {
      return res.status(404).json({ message: 'No pest and disease controls found for the given batchNumber and type' });
    }

    res.status(200).json(pestAndDiseaseControls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching pest and disease control records' });
  }
};

export const getCassavaBatchPestAndDiseaseControls = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Cassava'; // Default to "Cassava" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const pestAndDiseaseControls = await CashCropPestAndDiseaseControl.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (pestAndDiseaseControls.length === 0) {
      return res.status(404).json({ message: 'No pest and disease controls found for the given batchNumber and type' });
    }

    res.status(200).json(pestAndDiseaseControls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching pest and disease control records' });
  }
};

export const getPlantainBatchPestAndDiseaseControls = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Plantain'; // Default to "Cassava" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const pestAndDiseaseControls = await CashCropPestAndDiseaseControl.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (pestAndDiseaseControls.length === 0) {
      return res.status(404).json({ message: 'No pest and disease controls found for the given batchNumber and type' });
    }

    res.status(200).json(pestAndDiseaseControls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching pest and disease control records' });
  }
};





// Create a new fertilizer application
export const createFertilizerApplication = async (req, res) => {
  try {
    const fertilizerApplication = new CashCropFertilizerApplication(req.body);
    await fertilizerApplication.save();
    res.status(201).json(fertilizerApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all fertilizer applications
export const getAllFertilizerApplications = async (req, res) => {
  try {
    const fertilizerApplications = await CashCropFertilizerApplication.find();
    res.status(200).json(fertilizerApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all fertilizer applications for a particular batch of type of cash crop
export const getFertilizerApplicationsByBatchAndCropType = async (req, res) => {
  try {
    const { batchNumber, type } = req.params;
    const fertilizerApplications = await CashCropFertilizerApplication.find({ batchNumber, type });
    res.status(200).json(fertilizerApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single fertilizer application by ID
export const getFertilizerApplicationById = async (req, res) => {
  try {
    const { id } = req.params;
    const fertilizerApplication = await CashCropFertilizerApplication.findById(id);
    if (!fertilizerApplication) {
      return res.status(404).json({ message: 'Fertilizer application not found' });
    }
    res.status(200).json(fertilizerApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a fertilizer application by ID
export const updateFertilizerApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFertilizerApplication = await CashCropFertilizerApplication.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedFertilizerApplication) {
      return res.status(404).json({ message: 'Fertilizer application not found' });
    }
    res.status(200).json(updatedFertilizerApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a fertilizer application by ID
export const deleteFertilizerApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFertilizerApplication = await CashCropFertilizerApplication.findByIdAndDelete(id);
    if (!deletedFertilizerApplication) {
      return res.status(404).json({ message: 'Fertilizer application not found' });
    }
    res.status(200).json({ message: 'Fertilizer application deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getMaizeBatchFertilizerApplications = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Maize'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const fertilizerApplications = await CashCropFertilizerApplication.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (fertilizerApplications.length === 0) {
      return res.status(404).json({ message: 'No fertilizer applications found for the given batchNumber and type' });
    }

    res.status(200).json(fertilizerApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching fertilizer application records' });
  }
};

export const getCassavaBatchFertilizerApplications = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Cassava'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const fertilizerApplications = await CashCropFertilizerApplication.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (fertilizerApplications.length === 0) {
      return res.status(404).json({ message: 'No fertilizer applications found for the given batchNumber and type' });
    }

    res.status(200).json(fertilizerApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching fertilizer application records' });
  }
};

export const getPlantainBatchFertilizerApplications = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Plantain'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const fertilizerApplications = await CashCropFertilizerApplication.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (fertilizerApplications.length === 0) {
      return res.status(404).json({ message: 'No fertilizer applications found for the given batchNumber and type' });
    }

    res.status(200).json(fertilizerApplications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching fertilizer application records' });
  }
};


export const getMaizeBatchHarvestRecords = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Maize'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const harvestRecords = await CashCropHarvest.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (harvestRecords.length === 0) {
      return res.status(404).json({ message: 'No harvest records found for the given batchNumber and type' });
    }

    res.status(200).json(harvestRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching harvest records' });
  }
};

export const getCassavaBatchHarvestRecords = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Cassava'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const harvestRecords = await CashCropHarvest.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (harvestRecords.length === 0) {
      return res.status(404).json({ message: 'No harvest records found for the given batchNumber and type' });
    }

    res.status(200).json(harvestRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching harvest records' });
  }
};

export const getPlantainBatchHarvestRecords = async (req, res) => {
  const { batchNumber } = req.query;
  const type = req.query.type || 'Plantain'; // Default to "Maize" if type is not provided

  if (!batchNumber) {
    return res.status(400).json({ error: 'batchNumber query parameter is required' });
  }

  try {
    const harvestRecords = await CashCropHarvest.find({
      type: type,
      batchNumber: batchNumber,
    });

    if (harvestRecords.length === 0) {
      return res.status(404).json({ message: 'No harvest records found for the given batchNumber and type' });
    }

    res.status(200).json(harvestRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching harvest records' });
  }
};

// Controller to create a new cash crop harvest
export const createCashCropHarvest = async (req, res) => {
  try {
    const cashCropHarvest = new CashCropHarvest(req.body);
    await cashCropHarvest.save();
    res.status(201).json(cashCropHarvest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all cash crop harvests
export const getAllCashCropHarvests = async (req, res) => {
  try {
    const cashCropHarvests = await CashCropHarvest.find();
    res.status(200).json(cashCropHarvests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single cash crop harvest by ID
export const getCashCropHarvestById = async (req, res) => {
  try {
    const cashCropHarvest = await CashCropHarvest.findById(req.params.id);
    if (!cashCropHarvest) {
      return res.status(404).json({ message: 'Cash crop harvest not found' });
    }
    res.status(200).json(cashCropHarvest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a cash crop harvest by ID
export const updateCashCropHarvest = async (req, res) => {
  try {
    const { id } = req.params;
    const cashCropHarvest = await CashCropHarvest.findByIdAndUpdate(id, req.body, { new: true });
    if (!cashCropHarvest) {
      return res.status(404).json({ message: 'Cash crop harvest not found' });
    }
    res.status(200).json(cashCropHarvest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a cash crop harvest by ID
export const deleteCashCropHarvest = async (req, res) => {
  try {
    const { id } = req.params;
    const cashCropHarvest = await CashCropHarvest.findByIdAndDelete(id);
    if (!cashCropHarvest) {
      return res.status(404).json({ message: 'Cash crop harvest not found' });
    }
    res.status(200).json({ message: 'Cash crop harvest deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cash crop harvests for a particular batch of type of cash crop
export const getCashCropHarvestsByBatchAndCropType = async (req, res) => {
  try {
    const { batchNumber, cropType } = req.params;
    const cashCropHarvests = await CashCropHarvest.find({ batchNumber, cropType });
    res.status(200).json(cashCropHarvests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




async function fetchMaizeBatchRecords(batchNumber, cropType) {
  cropType = 'Maize'; // Ensure cropType is set to "Maize"
  
  try {
    // Fetch records for the given batch of cash crop
    const landPreparationRecords = await CashCropLandPreparation.find({ batchNumber, cashCrop: cropType });
    const plantingRecords = await CashCropPlanting.find({ batchNumber, type: cropType });
    const manualWeedingRecords = await CashCropManualWeeding.find({ batchNumber, type: cropType });
    const weedicideApplicationRecords = await CashCropWeedicideApplication.find({ batchNumber, type: cropType });
    const pestAndDiseaseControlRecords = await CashCropPestAndDiseaseControl.find({ batchNumber, type: cropType });
    const harvestRecords = await CashCropHarvest.find({ batchNumber, type: cropType });

    return { 
      landPreparationRecords,
      plantingRecords,
      manualWeedingRecords,
      weedicideApplicationRecords,
      pestAndDiseaseControlRecords,
      harvestRecords,
    };
  } catch (error) {
    throw new Error(`Failed to fetch ${cropType} batch records: ${error.message}`);
  }
}

export { fetchMaizeBatchRecords };


async function fetchCassavaBatchRecords(batchNumber, cropType) {
  cropType = 'Cassava'; // Ensure cropType is set to "Maize"
  
  try {
    // Fetch records for the given batch of cash crop
    const landPreparationRecords = await CashCropLandPreparation.find({ batchNumber, cashCrop: cropType });
    const plantingRecords = await CashCropPlanting.find({ batchNumber, type: cropType });
    const manualWeedingRecords = await CashCropManualWeeding.find({ batchNumber, type: cropType });
    const weedicideApplicationRecords = await CashCropWeedicideApplication.find({ batchNumber, type: cropType });
    const pestAndDiseaseControlRecords = await CashCropPestAndDiseaseControl.find({ batchNumber, type: cropType });
    const harvestRecords = await CashCropHarvest.find({ batchNumber, type: cropType });

    return { 
      landPreparationRecords,
      plantingRecords,
      manualWeedingRecords,
      weedicideApplicationRecords,
      pestAndDiseaseControlRecords,
      harvestRecords,
    };
  } catch (error) {
    throw new Error(`Failed to fetch ${cropType} batch records: ${error.message}`);
  }
}

export { fetchCassavaBatchRecords };


async function fetchPlantainBatchRecords(batchNumber, cropType) {
  cropType = 'Plantain'; // Ensure cropType is set to "Maize"
  
  try {
    // Fetch records for the given batch of cash crop
    const landPreparationRecords = await CashCropLandPreparation.find({ batchNumber, cashCrop: cropType });
    const plantingRecords = await CashCropPlanting.find({ batchNumber, type: cropType });
    const manualWeedingRecords = await CashCropManualWeeding.find({ batchNumber, type: cropType });
    const weedicideApplicationRecords = await CashCropWeedicideApplication.find({ batchNumber, type: cropType });
    const pestAndDiseaseControlRecords = await CashCropPestAndDiseaseControl.find({ batchNumber, type: cropType });
    const harvestRecords = await CashCropHarvest.find({ batchNumber, type: cropType });

    return { 
      landPreparationRecords,
      plantingRecords,
      manualWeedingRecords,
      weedicideApplicationRecords,
      pestAndDiseaseControlRecords,
      harvestRecords,
    };
  } catch (error) {
    throw new Error(`Failed to fetch ${cropType} batch records: ${error.message}`);
  }
}

export { fetchPlantainBatchRecords };


async function fetchPalmBatchRecords(batchNumber, cropType) {
  cropType = 'Palm'; // Ensure cropType is set to "Maize"
  
  try {
    // Fetch records for the given batch of cash crop
    const landPreparationRecords = await CashCropLandPreparation.find({ batchNumber, cashCrop: cropType });
    const plantingRecords = await CashCropPlanting.find({ batchNumber, type: cropType });
    const manualWeedingRecords = await CashCropManualWeeding.find({ batchNumber, type: cropType });
    const weedicideApplicationRecords = await CashCropWeedicideApplication.find({ batchNumber, type: cropType });
    const pestAndDiseaseControlRecords = await CashCropPestAndDiseaseControl.find({ batchNumber, type: cropType });
    const harvestRecords = await CashCropHarvest.find({ batchNumber, type: cropType });

    return { 
      landPreparationRecords,
      plantingRecords,
      manualWeedingRecords,
      weedicideApplicationRecords,
      pestAndDiseaseControlRecords,
      harvestRecords,
    };
  } catch (error) {
    throw new Error(`Failed to fetch ${cropType} batch records: ${error.message}`);
  }
}

export { fetchPalmBatchRecords };


// FINANCE


// Controller to create a new expense
// Controller to create a new expense
const createExpense = async (req, res) => {
  try {
    const { date, category, type, batchNumber, description, amount } = req.body; // Extracting date from the request body
    const expense = new CashCropExpense({ date, category, type, batchNumber, description, amount }); // Including date in the constructor
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to get all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await CashCropExpense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single expense record by batchNumber
const getExpenseByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const expense = await CashCropExpense.findOne({ batchNumber: batchNumber });
    if (!expense) {
      return res.status(404).json({ message: 'Expense record not found' });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single expense by ID
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await CashCropExpense.findById(id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update an expense by ID
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, type, batchNumber, description, amount } = req.body;
    const updatedExpense = await CashCropExpense.findByIdAndUpdate(id, { category, type, batchNumber, description, amount }, { new: true });
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete an expense by ID
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedExpense = await CashCropExpense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createExpense,
  getAllExpenses,
  getExpenseByBatchNumber,
  getExpenseById,
  updateExpense,
  deleteExpense
};





