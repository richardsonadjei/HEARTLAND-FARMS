import CabbageIncome from '../models/vegeSales.model.js';
import Vegetable from '../models/newVege.model.js';
import VegeDirectPlanting from '../models/vegeDirectPlanting.model.js';
import VegeExpense from '../models/vegeExpense.model.js';
import VegeFertilizerApplication from '../models/vegeFertilizerApplication.model.js';
import VegeHarvesting from '../models/vegeHarvest.model.js';
import VegeOtherActivities from '../models/vegeOtherActivities.model.js';
import VegePestControl from '../models/vegePestControl.model.js';
import VegesBatches from '../models/vegeSeason.model.js';
import VegeNursing from '../models/vegesNursing.model.js';
import VegeTransplanting from '../models/vegesTransplanting.model.js';
import VegetableSales from '../models/vegeSales.model.js';
import VegePestAndWeedControl from '../models/vegePestControl.model.js';

// Create a new vegetable
const createVegetable = async (req, res) => {
  try {
    const { name, description } = req.body;
    const vegetable = new Vegetable({ name, description });
    await vegetable.save();
    res.status(201).json(vegetable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all vegetables
const getAllVegetables = async (req, res) => {
  try {
    const vegetables = await Vegetable.find();
    res.json(vegetables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vegetable by ID
const getVegetableById = async (req, res) => {
  try {
    const { id } = req.params;
    const vegetable = await Vegetable.findById(id);
    if (!vegetable) {
      return res.status(404).json({ message: 'Vegetable not found' });
    }
    res.json(vegetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a vegetable by ID
const updateVegetableById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedVegetable = await Vegetable.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    if (!updatedVegetable) {
      return res.status(404).json({ message: 'Vegetable not found' });
    }
    res.json(updatedVegetable);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a vegetable by ID
const deleteVegetableById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVegetable = await Vegetable.findByIdAndDelete(id);
    if (!deletedVegetable) {
      return res.status(404).json({ message: 'Vegetable not found' });
    }
    res.json({ message: 'Vegetable deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createVegetable,
  getAllVegetables,
  getVegetableById,
  updateVegetableById,
  deleteVegetableById,
};




const createBatch = async (req, res) => {
  try {
    const { type, additionalDetails, variety } = req.body; // Include variety in the destructuring
    const batch = new VegesBatches({ type, additionalDetails, variety }); // Pass variety to the new batch
    await batch.save();
    res.status(201).json(batch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





const getBatchesByType = async (req, res) => {
  const vegetableType = req.params.type; // Assuming the type is passed as a parameter
  try {
    const batches = await VegesBatches.find({ type: vegetableType });
    if (batches.length === 0) {
      return res.status(404).json({ message: 'No batches found for the specified vegetable type' });
    }
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getBatchesByType };



const viewBatchesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const batches = await VegesBatches.find({ type });
    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Get all batches
const getAllBatches = async (req, res) => {
  try {
    const batches = await VegesBatches.find();
    res.json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a batch
const updateBatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, additionalDetails } = req.body;
    const updatedBatch = await VegesBatches.findByIdAndUpdate(id, { type, additionalDetails }, { new: true });
    res.json(updatedBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a batch
const deleteBatch = async (req, res) => {
  try {
    const { id } = req.params;
    await VegesBatches.findByIdAndDelete(id);
    res.json({ message: 'Batch deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export { createBatch, getAllBatches, updateBatch, deleteBatch,viewBatchesByType };




// Create a new vegetable nursing record
const createVegeNursing = async (req, res) => {
  try {
    const {
      vegetable,
      variety,
      batchNumber,
      quantityNursed,
      startDate,
      expectedTransplantingDate,
      additionalDetails,
    } = req.body;
    const newVegeNursing = new VegeNursing({
      vegetable,
      variety,
      batchNumber,
      quantityNursed,
      startDate,
      expectedTransplantingDate,
      additionalDetails,
    });
    await newVegeNursing.save();
    res.status(201).json(newVegeNursing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all vegetable nursing records
const getAllVegeNursings = async (req, res) => {
  try {
    const vegeNursings = await VegeNursing.find();
    res.status(200).json(vegeNursings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Cabbage vegetable nursing records
const getAllCabbageNursings = async (req, res) => {
  try {
    const cabbageNursings = await VegeNursing.find({ vegetable: 'Cabbage' });
    res.status(200).json(cabbageNursings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSpringOnionsNursings = async (req, res) => {
  try {
    const cabbageNursings = await VegeNursing.find({ vegetable: 'Spring Onions' });
    res.status(200).json(cabbageNursings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllGreenPepperNursings = async (req, res) => {
  try {
    const cabbageNursings = await VegeNursing.find({ vegetable: 'Green Pepper' });
    res.status(200).json(cabbageNursings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCarrotNursings = async (req, res) => {
  try {
    const cabbageNursings = await VegeNursing.find({ vegetable: 'Carrot' });
    res.status(200).json(cabbageNursings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single vegetable nursing record by batchNumber
const getVegeNursingByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const vegeNursing = await VegeNursing.findOne({ batchNumber: batchNumber });
    if (!vegeNursing) {
      return res.status(404).json({ message: 'Vegetable nursing record not found' });
    }
    res.status(200).json(vegeNursing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a vegetable nursing record by ID
const updateVegeNursingById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedVegeNursing = req.body;
    const vegeNursing = await VegeNursing.findByIdAndUpdate(id, updatedVegeNursing, { new: true });
    if (!vegeNursing) {
      return res.status(404).json({ message: 'Vegetable nursing record not found' });
    }
    res.status(200).json(vegeNursing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a vegetable nursing record by ID
const deleteVegeNursingById = async (req, res) => {
  try {
    const { id } = req.params;
    const vegeNursing = await VegeNursing.findByIdAndDelete(id);
    if (!vegeNursing) {
      return res.status(404).json({ message: 'Vegetable nursing record not found' });
    }
    res.status(200).json({ message: 'Vegetable nursing record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createVegeNursing,
  getAllVegeNursings,
  getVegeNursingByBatchNumber,
  updateVegeNursingById,
  deleteVegeNursingById,
  getAllCabbageNursings,
  getAllSpringOnionsNursings,
  getAllGreenPepperNursings,
  getAllCarrotNursings
};




// Create a new vegeTransplanting record
const createVegeTransplanting = async (req, res) => {
  try {
    const { vegetable, batchNumber, quantityTransplanted, transplantingDate,expectedHarvestDate,numberOfBeds, additionalDetails } = req.body;
    const newVegeTransplanting = new VegeTransplanting({
      vegetable,
      batchNumber,
      quantityTransplanted,
      transplantingDate,
      numberOfBeds,
      expectedHarvestDate,
      additionalDetails,
    });
    await newVegeTransplanting.save();
    res.status(201).json(newVegeTransplanting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all vegeTransplanting records
const getAllVegeTransplantings = async (req, res) => {
  try {
    const vegeTransplantings = await VegeTransplanting.find();
    res.status(200).json(vegeTransplantings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vegetable transplanting record by batchNumber
const getVegeTransplantingByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const vegeTransplanting = await VegeTransplanting.findOne({ batchNumber: batchNumber });
    if (!vegeTransplanting) {
      return res.status(404).json({ message: 'Transplanting record not found' });
    }
    res.status(200).json(vegeTransplanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const getAllCabbageTransplanting = async (req, res) => {
  try {
    const cabbageTransplantingRecords = await VegeTransplanting.find({ vegetable: 'Cabbage' });
    res.status(200).json(cabbageTransplantingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSpringOnionsTransplanting = async (req, res) => {
  try {
    const cabbageTransplantingRecords = await VegeTransplanting.find({ vegetable: 'Spring Onions' });
    res.status(200).json(cabbageTransplantingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllGreenPepperTransplanting = async (req, res) => {
  try {
    const cabbageTransplantingRecords = await VegeTransplanting.find({ vegetable: 'Green Pepper' });
    res.status(200).json(cabbageTransplantingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCarrotTransplanting = async (req, res) => {
  try {
    const cabbageTransplantingRecords = await VegeTransplanting.find({ vegetable: 'Carrot' });
    res.status(200).json(cabbageTransplantingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







// Get a single vegeTransplanting record by ID
const getVegeTransplantingById = async (req, res) => {
  const { id } = req.params;
  try {
    const vegeTransplanting = await vegeTransplanting.findById(id);
    if (!vegeTransplanting) {
      res.status(404).json({ message: 'VegeTransplanting not found' });
      return;
    }
    res.status(200).json(vegeTransplanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a vegeTransplanting record by ID
const updateVegeTransplantingById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVegeTransplanting = await VegeTransplanting.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedVegeTransplanting) {
      res.status(404).json({ message: 'VegeTransplanting not found' });
      return;
    }
    res.status(200).json(updatedVegeTransplanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a vegeTransplanting record by ID
const deleteVegeTransplantingById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVegeTransplanting = await VegeTransplanting.findByIdAndDelete(id);
    if (!deletedVegeTransplanting) {
      res.status(404).json({ message: 'VegeTransplanting not found' });
      return;
    }
    res.status(200).json({ message: 'VegeTransplanting deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createVegeTransplanting, getAllVegeTransplantings, getVegeTransplantingById, updateVegeTransplantingById, deleteVegeTransplantingById, getVegeTransplantingByBatchNumber, getAllCabbageTransplanting,getAllSpringOnionsTransplanting, getAllGreenPepperTransplanting,getAllCarrotTransplanting };



// Controller to create a new direct planting record
const createVegeDirectPlanting = async (req, res) => {
  try {
    const { vegetable, batchNumber, quantityDirectPlanted, plantingDate, expectedHarvestDate, numberOfBeds, additionalDetails } = req.body;
    const newVegeDirectPlanting = new VegeDirectPlanting({
      vegetable,
      batchNumber,
      quantityDirectPlanted,
      plantingDate,
      expectedHarvestDate,
      numberOfBeds,
      additionalDetails,
    });
    await newVegeDirectPlanting.save();
    res.status(201).json(newVegeDirectPlanting);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all direct planting records
const getAllVegeDirectPlantings = async (req, res) => {
  try {
    const directPlantings = await VegeDirectPlanting.find();
    res.status(200).json(directPlantings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCabbageDirectPlantingByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const vegeDirectPlanting = await VegeDirectPlanting.findOne({ batchNumber: batchNumber });
    if (!vegeDirectPlanting) {
      return res.status(404).json({ message: 'Vegetable direct planting record not found' });
    }
    res.status(200).json(vegeDirectPlanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCabbageDirectPlanting = async (req, res) => {
  try {
    const cabbageDirectPlanting = await VegeDirectPlanting.find({ vegetable: 'Cabbage' });
    res.status(200).json(cabbageDirectPlanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllSpringOnionDirectPlanting = async (req, res) => {
  try {
    const cabbageDirectPlanting = await VegeDirectPlanting.find({ vegetable: 'Spring Onions' });
    res.status(200).json(cabbageDirectPlanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllGreenPepperDirectPlanting = async (req, res) => {
  try {
    const cabbageDirectPlanting = await VegeDirectPlanting.find({ vegetable: 'Green Pepper' });
    res.status(200).json(cabbageDirectPlanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCarrotDirectPlanting = async (req, res) => {
  try {
    const cabbageDirectPlanting = await VegeDirectPlanting.find({ vegetable: 'Carrot' });
    res.status(200).json(cabbageDirectPlanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single direct planting record by ID
const getVegeDirectPlantingById = async (req, res) => {
  const { id } = req.params;
  try {
    const directPlanting = await VegeDirectPlanting.findById(id);
    if (!directPlanting) {
      return res.status(404).json({ message: 'Direct planting record not found' });
    }
    res.status(200).json(directPlanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a direct planting record by ID
const updateVegeDirectPlantingById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedVegeDirectPlanting = await VegeDirectPlanting.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedVegeDirectPlanting) {
      return res.status(404).json({ message: 'Direct planting record not found' });
    }
    res.status(200).json(updatedVegeDirectPlanting);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a direct planting record by ID
const deleteVegeDirectPlantingById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedVegeDirectPlanting = await VegeDirectPlanting.findByIdAndDelete(id);
    if (!deletedVegeDirectPlanting) {
      return res.status(404).json({ message: 'Direct planting record not found' });
    }
    res.status(200).json({ message: 'Direct planting record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createVegeDirectPlanting, getAllVegeDirectPlantings, getVegeDirectPlantingById, updateVegeDirectPlantingById, deleteVegeDirectPlantingById, getCabbageDirectPlantingByBatchNumber, getAllCabbageDirectPlanting, getAllSpringOnionDirectPlanting,getAllGreenPepperDirectPlanting,getAllCarrotDirectPlanting };



// Controller to create a new fertilizer application record
const createFertilizerApplication = async (req, res) => {
  try {
    const fertilizerApplication = await VegeFertilizerApplication.create(req.body);
    res.status(201).json(fertilizerApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getVegeFertilizerByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const vegeFertilizer = await VegeFertilizerApplication.findOne({ batchNumber: batchNumber });
    if (!vegeFertilizer) {
      return res.status(404).json({ message: 'Fertilizer application record not found' });
    }
    res.status(200).json(vegeFertilizer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller to get all fertilizer application records
const getAllFertilizerApplications = async (req, res) => {
  try {
    const fertilizerApplications = await VegeFertilizerApplication.find();
    res.json(fertilizerApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single fertilizer application record by ID
const getFertilizerApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const fertilizerApplication = await VegeFertilizerApplication.findById(id);
    if (!fertilizerApplication) {
      res.status(404).json({ message: 'Fertilizer application not found' });
    } else {
      res.json(fertilizerApplication);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a fertilizer application record by ID
const updateFertilizerApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFertilizerApplication = await VegeFertilizerApplication.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedFertilizerApplication) {
      res.status(404).json({ message: 'Fertilizer application not found' });
    } else {
      res.json(updatedFertilizerApplication);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a fertilizer application record by ID
const deleteFertilizerApplicationById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFertilizerApplication = await VegeFertilizerApplication.findByIdAndDelete(id);
    if (!deletedFertilizerApplication) {
      res.status(404).json({ message: 'Fertilizer application not found' });
    } else {
      res.json({ message: 'Fertilizer application deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all cabbage fertilizer application records
const getAllCabbageFertilizerApplications = async (req, res) => {
  try {
    const cabbageFertilizerApplications = await VegeFertilizerApplication.find({ vegetable: 'Cabbage' });
    res.status(200).json(cabbageFertilizerApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSpringOnionFertilizerApplications = async (req, res) => {
  try {
    const cabbageFertilizerApplications = await VegeFertilizerApplication.find({ vegetable: 'Spring Onions' });
    res.status(200).json(cabbageFertilizerApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllGreenPepperFertilizerApplications = async (req, res) => {
  try {
    const cabbageFertilizerApplications = await VegeFertilizerApplication.find({ vegetable: 'Green Pepper' });
    res.status(200).json(cabbageFertilizerApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllCarrotFertilizerApplications = async (req, res) => {
  try {
    const cabbageFertilizerApplications = await VegeFertilizerApplication.find({ vegetable: 'Carrot' });
    res.status(200).json(cabbageFertilizerApplications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createFertilizerApplication,
  getAllFertilizerApplications,
  getFertilizerApplicationById,
  updateFertilizerApplicationById,
  deleteFertilizerApplicationById,
  getVegeFertilizerByBatchNumber,
  getAllCabbageFertilizerApplications,
  getAllSpringOnionFertilizerApplications,
  getAllGreenPepperFertilizerApplications,
  getAllCarrotFertilizerApplications
};






// Controller to create a pest and weed control record
const createPestAndWeedControl = async (req, res) => {
  try {
    const pestAndWeedControl = await VegePestAndWeedControl.create(req.body);
    res.status(201).json(pestAndWeedControl);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all pest and weed control records
const getAllPestAndWeedControl = async (req, res) => {
  try {
    const pestAndWeedControls = await VegePestAndWeedControl.find();
    res.status(200).json(pestAndWeedControls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVegePestAndWeedControlByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const vegePestAndWeedControl = await VegePestAndWeedControl.findOne({ batchNumber: batchNumber });
    if (!vegePestAndWeedControl) {
      return res.status(404).json({ message: 'Pest and weed control record not found' });
    }
    res.status(200).json(vegePestAndWeedControl);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to get a single pest and weed control record by ID
const getPestAndWeedControlById = async (req, res) => {
  const { id } = req.params;
  try {
    const pestAndWeedControl = await VegePestAndWeedControl.findById(id);
    if (!pestAndWeedControl) {
      res.status(404).json({ message: 'Pest and weed control record not found' });
    } else {
      res.status(200).json(pestAndWeedControl);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a pest and weed control record by ID
const updatePestAndWeedControlById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedPestAndWeedControl = await VegePestAndWeedControl.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedPestAndWeedControl) {
      res.status(404).json({ message: 'Pest and weed control record not found' });
    } else {
      res.status(200).json(updatedPestAndWeedControl);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a pest and weed control record by ID
const deletePestAndWeedControlById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedPestAndWeedControl = await VegePestAndWeedControl.findByIdAndDelete(id);
    if (!deletedPestAndWeedControl) {
      res.status(404).json({ message: 'Pest and weed control record not found' });
    } else {
      res.status(200).json({ message: 'Pest and weed control record deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSpringOnionPestAndWeedControls = async (req, res) => {
  try {
    const springOnionPestAndWeedControls = await VegePestAndWeedControl.find({ vegetable: 'Spring Onions' });
    res.status(200).json(springOnionPestAndWeedControls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCabbagePestAndWeedControls = async (req, res) => {
  try {
    const cabbagePestAndWeedControls = await VegePestAndWeedControl.find({ vegetable: 'Cabbage' });
    res.status(200).json(cabbagePestAndWeedControls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllGreenPepperPestAndWeedControls = async (req, res) => {
  try {
    const cabbagePestAndWeedControls = await VegePestAndWeedControl.find({ vegetable: 'Green Pepper' });
    res.status(200).json(cabbagePestAndWeedControls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllCarrotPestAndWeedControls = async (req, res) => {
  try {
    const cabbagePestAndWeedControls = await VegePestAndWeedControl.find({ vegetable: 'Green Pepper' });
    res.status(200).json(cabbagePestAndWeedControls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export {
  createPestAndWeedControl,
  getAllPestAndWeedControl,
  getPestAndWeedControlById,
  updatePestAndWeedControlById,
  deletePestAndWeedControlById,
  getVegePestAndWeedControlByBatchNumber,
  getAllSpringOnionPestAndWeedControls,
  getAllCabbagePestAndWeedControls,
  getAllGreenPepperPestAndWeedControls,
  getAllCarrotPestAndWeedControls
};


// Controller to create a new other activity record
const createOtherActivity = async (req, res) => {
  try {
    const otherActivity = await VegeOtherActivities.create(req.body);
    res.status(201).json(otherActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all other activity records
const getAllOtherActivities = async (req, res) => {
  try {
    const otherActivities = await VegeOtherActivities.find();
    res.status(200).json(otherActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single other activity record by ID
const getOtherActivityById = async (req, res) => {
  const { id } = req.params;
  try {
    const otherActivity = await VegeOtherActivities.findById(id);
    if (!otherActivity) {
      return res.status(404).json({ message: 'Other activity not found' });
    }
    res.status(200).json(otherActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a other activity record
const updateOtherActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOtherActivity = await VegeOtherActivities.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedOtherActivity) {
      return res.status(404).json({ message: 'Other activity not found' });
    }
    res.status(200).json(updatedOtherActivity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a other activity record
const deleteOtherActivity = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOtherActivity = await VegeOtherActivities.findByIdAndDelete(id);
    if (!deletedOtherActivity) {
      return res.status(404).json({ message: 'Other activity not found' });
    }
    res.status(200).json({ message: 'Other activity deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOtherActivitiesByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    // Assuming your other activities model is named "OtherActivities"
    const otherActivitiesRecord = await VegeOtherActivities.findOne({ batchNumber: batchNumber });
    if (!otherActivitiesRecord) {
      return res.status(404).json({ message: 'Other activities record not found' });
    }
    res.status(200).json(otherActivitiesRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSpringOnionsOtherActivitiesByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    // Assuming your other activities model is named "OtherActivities"
    const otherActivitiesRecord = await VegeOtherActivities.findOne({ batchNumber: batchNumber });
    if (!otherActivitiesRecord) {
      return res.status(404).json({ message: 'Other activities record not found' });
    }
    res.status(200).json(otherActivitiesRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllGreenPepperOtherActivities= async (req, res) => {
  try {
    const greenPepperActivities = await VegeOtherActivities.find({ vegetable: 'Green Pepper' });
    res.status(200).json(greenPepperActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSpringOnionOtherActivities = async (req, res) => {
  try {
    const springOnionActivities = await VegeOtherActivities.find({ vegetable: 'Spring Onions' });
    res.status(200).json(springOnionActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllCarrotOtherActivities = async (req, res) => {
  try {
    const springOnionActivities = await VegeOtherActivities.find({ vegetable: 'Carrot' });
    res.status(200).json(springOnionActivities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export { createOtherActivity, getAllOtherActivities, getOtherActivityById, updateOtherActivity, deleteOtherActivity,getOtherActivitiesByBatchNumber,getSpringOnionsOtherActivitiesByBatchNumber,getAllGreenPepperOtherActivities, getAllSpringOnionOtherActivities,getAllCarrotOtherActivities };





// Create a new harvesting record
const createHarvestingRecord = async (req, res) => {
  try {
    const harvestingRecord = await VegeHarvesting.create(req.body);
    res.status(201).json(harvestingRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all harvesting records
const getAllHarvestingRecords = async (req, res) => {
  try {
    const harvestingRecords = await VegeHarvesting.find();
    res.status(200).json(harvestingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getHarvestingRecordByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    // Assuming your harvesting model is named "Harvesting"
    const harvestingRecord = await VegeHarvesting.findOne({ batchNumber: batchNumber });
    if (!harvestingRecord) {
      return res.status(404).json({ message: 'Harvesting record not found' });
    }
    res.status(200).json(harvestingRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSpringOnionsHarvestingRecordByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    // Assuming your harvesting model is named "Harvesting"
    const harvestingRecord = await VegeHarvesting.findOne({ batchNumber: batchNumber });
    if (!harvestingRecord) {
      return res.status(404).json({ message: 'Harvesting record not found' });
    }
    res.status(200).json(harvestingRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get a single harvesting record by ID
const getHarvestingRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const harvestingRecord = await VegeHarvesting.findById(id);
    if (!harvestingRecord) {
      return res.status(404).json({ message: 'Harvesting record not found' });
    }
    res.status(200).json(harvestingRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a harvesting record
const updateHarvestingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedHarvestingRecord = await VegeHarvesting.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedHarvestingRecord) {
      return res.status(404).json({ message: 'Harvesting record not found' });
    }
    res.status(200).json(updatedHarvestingRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a harvesting record
const deleteHarvestingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHarvestingRecord = await VegeHarvesting.findByIdAndDelete(id);
    if (!deletedHarvestingRecord) {
      return res.status(404).json({ message: 'Harvesting record not found' });
    }
    res.status(200).json({ message: 'Harvesting record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createHarvestingRecord, getAllHarvestingRecords, getHarvestingRecordById, updateHarvestingRecord, deleteHarvestingRecord,getHarvestingRecordByBatchNumber,getSpringOnionsHarvestingRecordByBatchNumber };


async function fetchCabbageBatchRecords(batchNumber) {
  try {
    // Fetch records for the given batch of Cabbage
    const nursingRecords = await VegeNursing.find({ batchNumber, vegetable: 'Cabbage' });
    const transplantingRecords = await VegeTransplanting.find({ batchNumber, vegetable: 'Cabbage' });
    const directPlantingRecords = await VegeDirectPlanting.find({ batchNumber, vegetable: 'Cabbage' });
    const fertilizerRecords = await VegeFertilizerApplication.find({ batchNumber, vegetable: 'Cabbage' });
    const pestControlRecords = await VegePestControl.find({ batchNumber, vegetable: 'Cabbage' });
    const otherActivitiesRecords = await VegeOtherActivities.find({ batchNumber, vegetable: 'Cabbage' });
    const harvestingRecords = await VegeHarvesting.find({ batchNumber, vegetable: 'Cabbage' });
   
   

    return { 
      nursingRecords,
      transplantingRecords,
      directPlantingRecords,
      fertilizerRecords,
      pestControlRecords,
      otherActivitiesRecords,
      harvestingRecords,
      
      
    };
  } catch (error) {
    throw new Error(`Failed to fetch Cabbage batch records: ${error.message}`);
  }
}

export { fetchCabbageBatchRecords };

async function fetchSpringOnionsBatchRecords(batchNumber) {
  try {
    // Fetch records for the given batch of Spring Onions
    const nursingRecords = await VegeNursing.find({ batchNumber, vegetable: 'Spring Onions' });
    const transplantingRecords = await VegeTransplanting.find({ batchNumber, vegetable: 'Spring Onions' });
    const directPlantingRecords = await VegeDirectPlanting.find({ batchNumber, vegetable: 'Spring Onions' });
    const fertilizerRecords = await VegeFertilizerApplication.find({ batchNumber, vegetable: 'Spring Onions' });
    const pestControlRecords = await VegePestControl.find({ batchNumber, vegetable: 'Spring Onions' });
    const otherActivitiesRecords = await VegeOtherActivities.find({ batchNumber, vegetable: 'Spring Onions' });
    const harvestingRecords = await VegeHarvesting.find({ batchNumber, vegetable: 'Spring Onions' });

    return { 
      nursingRecords,
      transplantingRecords,
      directPlantingRecords,
      fertilizerRecords,
      pestControlRecords,
      otherActivitiesRecords,
      harvestingRecords,
    };
  } catch (error) {
    throw new Error(`Failed to fetch Spring Onions batch records: ${error.message}`);
  }
}

export { fetchSpringOnionsBatchRecords };


async function fetchGreenPepperBatchRecords(batchNumber) {
  try {
    // Fetch records for the given batch of Green Pepper
    const nursingRecords = await VegeNursing.find({ batchNumber, vegetable: 'Green Pepper' });
    const transplantingRecords = await VegeTransplanting.find({ batchNumber, vegetable: 'Green Pepper' });
    const directPlantingRecords = await VegeDirectPlanting.find({ batchNumber, vegetable: 'Green Pepper' });
    const fertilizerRecords = await VegeFertilizerApplication.find({ batchNumber, vegetable: 'Green Pepper' });
    const pestControlRecords = await VegePestControl.find({ batchNumber, vegetable: 'Green Pepper' });
    const otherActivitiesRecords = await VegeOtherActivities.find({ batchNumber, vegetable: 'Green Pepper' });
    const harvestingRecords = await VegeHarvesting.find({ batchNumber, vegetable: 'Green Pepper' });

    return { 
      nursingRecords,
      transplantingRecords,
      directPlantingRecords,
      fertilizerRecords,
      pestControlRecords,
      otherActivitiesRecords,
      harvestingRecords,
    };
  } catch (error) {
    throw new Error(`Failed to fetch Green Pepper batch records: ${error.message}`);
  }
}

export { fetchGreenPepperBatchRecords };

async function fetchCarrotBatchRecords(batchNumber) {
  try {
    // Fetch records for the given batch of Carrot
    const nursingRecords = await VegeNursing.find({ batchNumber, vegetable: 'Carrot' });
    const transplantingRecords = await VegeTransplanting.find({ batchNumber, vegetable: 'Carrot' });
    const directPlantingRecords = await VegeDirectPlanting.find({ batchNumber, vegetable: 'Carrot' });
    const fertilizerRecords = await VegeFertilizerApplication.find({ batchNumber, vegetable: 'Carrot' });
    const pestControlRecords = await VegePestControl.find({ batchNumber, vegetable: 'Carrot' });
    const otherActivitiesRecords = await VegeOtherActivities.find({ batchNumber, vegetable: 'Carrot' });
    const harvestingRecords = await VegeHarvesting.find({ batchNumber, vegetable: 'Carrot' });

    return { 
      nursingRecords,
      transplantingRecords,
      directPlantingRecords,
      fertilizerRecords,
      pestControlRecords,
      otherActivitiesRecords,
      harvestingRecords,
    };
  } catch (error) {
    throw new Error(`Failed to fetch Carrot batch records: ${error.message}`);
  }
}

export { fetchCarrotBatchRecords };


async function fetchPepperBatchRecords(batchNumber) {
  try {
    // Fetch records for the given batch of Pepper
    const nursingRecords = await VegeNursing.find({ batchNumber, vegetable: 'Pepper' });
    const transplantingRecords = await VegeTransplanting.find({ batchNumber, vegetable: 'Pepper' });
    const fertilizerRecords = await VegeFertilizerApplication.find({ batchNumber, vegetable: 'Pepper' });
    const pestControlRecords = await VegePestControl.find({ batchNumber, vegetable: 'Pepper' });
    const otherActivitiesRecords = await VegeOtherActivities.find({ batchNumber, vegetable: 'Pepper' });
    const harvestingRecords = await VegeHarvesting.find({ batchNumber, vegetable: 'Pepper' });

    return { 
      nursingRecords,
      transplantingRecords,
      fertilizerRecords,
      pestControlRecords,
      otherActivitiesRecords,
      harvestingRecords,
    };
  } catch (error) {
    throw new Error(`Failed to fetch Pepper batch records: ${error.message}`);
  }
}

export { fetchPepperBatchRecords };





// FINANCE


// Controller to create a new expense
const createExpense = async (req, res) => {
  try {
    const { date, category, vegetable, batchNumber, description, amount } = req.body;
    const expense = new VegeExpense({ date, category, vegetable, batchNumber, description, amount });
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default createExpense;


// Controller to get all expenses
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await VegeExpense.find();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vegetable expense record by batchNumber
const getCabbageExpenseByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const vegeExpense = await VegeExpense.findOne({ batchNumber: batchNumber });
    if (!vegeExpense) {
      return res.status(404).json({ message: 'Vegetable expense record not found' });
    }
    res.status(200).json(vegeExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getVegeExpenseByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const vegeExpense = await VegeExpense.findOne({ batchNumber: batchNumber });
    if (!vegeExpense) {
      return res.status(404).json({ message: 'Vegetable expense record not found' });
    }
    res.status(200).json(vegeExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Controller to get a single expense by ID
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await VegeExpense.findById(id);
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
    const { category, vegetable, batchNumber, description, amount } = req.body;
    const updatedExpense = await VegeExpense.findByIdAndUpdate(id, { category, vegetable, batchNumber, description, amount }, { new: true });
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
    const deletedExpense = await VegeExpense.findByIdAndDelete(id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all Cabbage vegetable expense records
const getAllCabbageExpenses = async (req, res) => {
  try {
    const cabbageExpenses = await VegeExpense.find({ vegetable: 'Cabbage' });
    res.status(200).json(cabbageExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getAllCarrotExpenses = async (req, res) => {
  try {
    const cabbageExpenses = await VegeExpense.find({ vegetable: 'Carrot' });
    res.status(200).json(cabbageExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export { createExpense, getAllExpenses, getExpenseById, updateExpense, deleteExpense,getCabbageExpenseByBatchNumber,getAllCabbageExpenses, getVegeExpenseByBatchNumber,getAllCarrotExpenses  };



// INCOME


// Controller to create a new vegetable sales record
const createVegetableSales = async (req, res) => {
  try {
    const { date, batchNumber, vegetable, quantitySold, pricePerBag, additionalInformation } = req.body;
    const totalIncome = quantitySold * pricePerBag;

    const newVegetableSales = new VegetableSales({
      date,
      batchNumber,
      vegetable,
      quantitySold,
      pricePerBag,
      totalIncome,
      additionalInformation
    });

    const savedVegetableSales = await newVegetableSales.save();
    res.status(201).json(savedVegetableSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getVegeIncomeByBatchNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const vegeSale = await VegetableSales.findOne({ batchNumber: batchNumber });
    if (!vegeSale) {
      return res.status(404).json({ message: 'Vegetable sales record not found' });
    }
    res.status(200).json(vegeSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to get all vegetable sales records
const getAllVegetableSales = async (req, res) => {
  try {
    const vegetableSales = await VegetableSales.find();
    res.status(200).json(vegetableSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single vegetable sales record by ID
const getVegetableSalesById = async (req, res) => {
  try {
    const { id } = req.params;
    const vegetableSales = await VegetableSales.findById(id);
    if (!vegetableSales) {
      return res.status(404).json({ message: 'Vegetable sales record not found' });
    }
    res.status(200).json(vegetableSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a vegetable sales record
const updateVegetableSales = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, batchNumber, vegetable, quantitySold, pricePerBag, additionalInformation } = req.body;
    const totalIncome = quantitySold * pricePerBag;

    const updatedVegetableSales = await VegetableSales.findByIdAndUpdate(id, {
      date,
      batchNumber,
      vegetable,
      quantitySold,
      pricePerBag,
      totalIncome,
      additionalInformation
    }, { new: true });

    res.status(200).json(updatedVegetableSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a vegetable sales record
const deleteVegetableSales = async (req, res) => {
  try {
    const { id } = req.params;
    await VegetableSales.findByIdAndDelete(id);
    res.status(200).json({ message: 'Vegetable sales record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createVegetableSales, getAllVegetableSales, getVegetableSalesById, updateVegetableSales, deleteVegetableSales,getVegeIncomeByBatchNumber };






// PROFIT AND LOSS




async function calculateVegeProfitOrLoss(batchNumber, vegetableType) {
  try {
    // Fetch vegetable sales for the given batch number and vegetable type
    const sales = await VegetableSales.find({ batchNumber, vegetable: vegetableType });

    // Fetch vegetable expenses for the given batch number and vegetable type
    const expenses = await VegeExpense.find({ batchNumber, vegetable: vegetableType });

    // Calculate total income from sales
    const totalIncome = sales.reduce((acc, sale) => acc + sale.totalIncome, 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Calculate profit or loss
    const profitOrLoss = totalIncome - totalExpenses;

    return { 
      sales,
      expenses,
      totalIncome,
      totalExpenses,
      profitOrLoss 
    };
  } catch (error) {
    throw new Error(`Failed to calculate profit or loss: ${error.message}`);
  }
}

export { calculateVegeProfitOrLoss };


async function calculateCabbageProfitOrLoss(batchNumber) {
  try {
    const vegetableType = "Cabbage"; // Default vegetable type
    // Fetch vegetable sales for the given batch number and vegetable type
    const sales = await VegetableSales.find({ batchNumber, vegetable: vegetableType });

    // Fetch vegetable expenses for the given batch number and vegetable type
    const expenses = await VegeExpense.find({ batchNumber, vegetable: vegetableType });

    // Calculate total income from sales
    const totalIncome = sales.reduce((acc, sale) => acc + sale.totalIncome, 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Calculate profit or loss
    const profitOrLoss = totalIncome - totalExpenses;

    return { 
      sales,
      expenses,
      totalIncome,
      totalExpenses,
      profitOrLoss 
    };
  } catch (error) {
    throw new Error(`Failed to calculate profit or loss: ${error.message}`);
  }
}

export { calculateCabbageProfitOrLoss };

async function calculateSpringOnionProfitOrLoss(batchNumber) {
  try {
    const vegetableType = "Spring Onions"; // Updated vegetable type
    // Fetch vegetable sales for the given batch number and vegetable type
    const sales = await VegetableSales.find({ batchNumber, vegetable: vegetableType });

    // Fetch vegetable expenses for the given batch number and vegetable type
    const expenses = await VegeExpense.find({ batchNumber, vegetable: vegetableType });

    // Calculate total income from sales
    const totalIncome = sales.reduce((acc, sale) => acc + sale.totalIncome, 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Calculate profit or loss
    const profitOrLoss = totalIncome - totalExpenses;

    return { 
      sales,
      expenses,
      totalIncome,
      totalExpenses,
      profitOrLoss 
    };
  } catch (error) {
    throw new Error(`Failed to calculate profit or loss: ${error.message}`);
  }
}

export { calculateSpringOnionProfitOrLoss };



async function calculateGreenPepperProfitOrLoss(batchNumber) {
  try {
    const vegetableType = "Green Pepper"; // Default vegetable type
    // Fetch vegetable sales for the given batch number and vegetable type
    const sales = await VegetableSales.find({ batchNumber, vegetable: vegetableType });

    // Fetch vegetable expenses for the given batch number and vegetable type
    const expenses = await VegeExpense.find({ batchNumber, vegetable: vegetableType });

    // Calculate total income from sales
    const totalIncome = sales.reduce((acc, sale) => acc + sale.totalIncome, 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Calculate profit or loss
    const profitOrLoss = totalIncome - totalExpenses;

    return { 
      sales,
      expenses,
      totalIncome,
      totalExpenses,
      profitOrLoss 
    };
  } catch (error) {
    throw new Error(`Failed to calculate profit or loss: ${error.message}`);
  }
}

export { calculateGreenPepperProfitOrLoss };


async function calculateCarrotProfitOrLoss(batchNumber) {
  try {
    const vegetableType = "Carrot"; // Default vegetable type
    // Fetch vegetable sales for the given batch number and vegetable type
    const sales = await VegetableSales.find({ batchNumber, vegetable: vegetableType });

    // Fetch vegetable expenses for the given batch number and vegetable type
    const expenses = await VegeExpense.find({ batchNumber, vegetable: vegetableType });

    // Calculate total income from sales
    const totalIncome = sales.reduce((acc, sale) => acc + sale.totalIncome, 0);

    // Calculate total expenses
    const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Calculate profit or loss
    const profitOrLoss = totalIncome - totalExpenses;

    return { 
      sales,
      expenses,
      totalIncome,
      totalExpenses,
      profitOrLoss 
    };
  } catch (error) {
    throw new Error(`Failed to calculate profit or loss: ${error.message}`);
  }
}

export { calculateCarrotProfitOrLoss };


