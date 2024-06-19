import BirdBatches from "../models/birdBatches.model.js";
import birdBreedModel from "../models/birdBreed.model.js";
import newBirdModel from "../models/newBird.model.js";
import BirdExpenseCategory from "../models/birdExpenseCategory.model.js";
import BirdFarmExpense from "../models/birdExpenses.model.js";
import BirdBatchAdditions from "../models/birdAdditions.model.js";
import BirdVaccinationChart from "../models/birdVaccinationChart.model.js";
import BirdMedicationCategory from "../models/birdMedicationCategory.js";
import BirdDrugs from "../models/birdDrugs.model.js";
import BirdVaccinationRecords from "../models/birdVaccinationRecord.model.js";
import BirdMortality from "../models/birdMortality.model.js";
import BirdFarmSection from "../models/birdFarmSection.model.js";
import BirdEggsCollected from "../models/birdsEggCollected.model.js";
import BirdSortedEggsStock from "../models/birdSortedEggsStock.model.js";
import BirdUnsortedEggStock from "../models/birdUnsortedEggsStock.model.js";
import BirdSale from "../models/birdSales.model.js";
import BirdDewormingRecords from "../models/birdDewormingRecords.model.js";
import BirdFeedNames from "../models/birdFeedNames.model.js";
import BirdFeedPurchase from "../models/birdFeedPurchase.model.js";
import BirdFeedStock from "../models/birdFeedStock.model.js";
import BirdFeedIssuance from "../models/birdIssuanceModel.js";
import BirdHealthDiagnosis from "../models/birdHealthDiagnosis.model.js";
import BirdEggSale from "../models/birdEggSale.model.js";
import BirdEggsIncubatorLoading from "../models/birdEggsIncubatorLoading.model.js";
import Incubator from "../models/incubator.model.js";
import HatchedEggs from "../models/eggsHatchedRecords.model.js";
import BirdRelocation from "../models/birdRelocation.model.js";





// Create a new bird farm section
export const createBirdFarmSection = async (req, res) => {
  try {
    const birdFarmSection = new BirdFarmSection(req.body);
    await birdFarmSection.save();
    res.status(201).json(birdFarmSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const getBirdFarmSections = async (req, res) => {
  try {
    const birdFarmSections = await BirdFarmSection.find();
    res.status(200).json(birdFarmSections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a bird farm section by ID
export const getBirdFarmSectionById = async (req, res) => {
  try {
    const birdFarmSection = await BirdFarmSection.findById(req.params.id);
    if (!birdFarmSection) {
      return res.status(404).json({ message: 'Bird farm section not found' });
    }
    res.status(200).json(birdFarmSection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bird farm section
export const updateBirdFarmSection = async (req, res) => {
  try {
    const birdFarmSection = await BirdFarmSection.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!birdFarmSection) {
      return res.status(404).json({ message: 'Bird farm section not found' });
    }
    res.status(200).json(birdFarmSection);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bird farm section
export const deleteBirdFarmSection = async (req, res) => {
  try {
    const birdFarmSection = await BirdFarmSection.findByIdAndDelete(req.params.id);
    if (!birdFarmSection) {
      return res.status(404).json({ message: 'Bird farm section not found' });
    }
    res.status(200).json({ message: 'Bird farm section deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Create a new bird
export const createBird = async (req, res) => {
  try {
    const newBird = new newBirdModel(req.body);
    await newBird.save();
    res.status(201).json(newBird);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all birds
export const getBirds = async (req, res) => {
  try {
    const birds = await newBirdModel.find();
    res.status(200).json(birds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bird by ID
export const getBirdById = async (req, res) => {
  try {
    const bird = await newBirdModel.findById(req.params.id);
    if (!bird) return res.status(404).json({ message: 'Bird not found' });
    res.status(200).json(bird);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bird by ID
export const updateBird = async (req, res) => {
  try {
    const bird = await newBirdModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bird) return res.status(404).json({ message: 'Bird not found' });
    res.status(200).json(bird);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bird by ID
export const deleteBird = async (req, res) => {
  try {
    const bird = await NewBird.findByIdAndDelete(req.params.id);
    if (!bird) return res.status(404).json({ message: 'Bird not found' });
    res.status(200).json({ message: 'Bird deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Create a new breed
export const createBirdBreed = async (req, res) => {
  try {
    const newBreed = new birdBreedModel(req.body);
    await newBreed.save();
    res.status(201).json(newBreed);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all breeds
export const getAllBirdBreeds = async (req, res) => {
  try {
    const breeds = await birdBreedModel.find();
    res.status(200).json(breeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single breed by ID
export const getBirdBreedById = async (req, res) => {
  try {
    const breed = await birdBreedModel.findById(req.params.id);
    if (!breed) {
      return res.status(404).json({ message: 'Breed not found' });
    }
    res.status(200).json(breed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a breed by ID
export const updateBirdBreed = async (req, res) => {
  try {
    const breed = await birdBreedModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!breed) {
      return res.status(404).json({ message: 'Breed not found' });
    }
    res.status(200).json(breed);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a breed by ID
export const deleteBirdBreed = async (req, res) => {
  try {
    const breed = await birdBreedModel.findByIdAndDelete(req.params.id);
    if (!breed) {
      return res.status(404).json({ message: 'Breed not found' });
    }
    res.status(200).json({ message: 'Breed deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// Create a new bird batch
export const createBirdBatch = async (req, res) => {
  try {
    const birdBatch = new BirdBatches(req.body);
    await birdBatch.save();
    res.status(201).json(birdBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bird batches
export const getBirdBatches = async (req, res) => {
  try {
    const birdBatches = await BirdBatches.find({});
    res.status(200).json(birdBatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller function to fetch records of a particular batch number
const getBatchByBatchNumber = async (req, res) => {
  const batchNumber = req.params.batchNumber; // Extract batch number from request parameters
  
  try {
    // Find the batch with the specified batch number
    const batch = await BirdBatches.findOne({ batchNumber });

    // Check if batch exists
    if (!batch) {
      return res.status(404).json({ message: `Batch with batchNumber ${batchNumber} not found` });
    }

    // Return the batch details
    res.status(200).json(batch);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: error.message });
  }
};

export { getBatchByBatchNumber };


// Controller to get all batches of a particular type
export const getBatchesByType = async (req, res) => {
  const { type } = req.query;

  try {
    const batches = await BirdBatches.find({ type });

    if (!batches || batches.length === 0) {
      return res.status(404).json({ message: `No batches found for type '${type}'` });
    }

    res.status(200).json(batches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single bird batch by ID
export const getBirdBatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const birdBatch = await BirdBatches.findById(id);
    if (!birdBatch) {
      return res.status(404).json({ message: 'Bird batch not found' });
    }
    res.status(200).json(birdBatch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bird batch by ID
export const updateBirdBatch = async (req, res) => {
  const { id } = req.params;
  try {
    const birdBatch = await BirdBatches.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!birdBatch) {
      return res.status(404).json({ message: 'Bird batch not found' });
    }
    birdBatch.totalQuantity = birdBatch.batchDetails.reduce((acc, detail) => acc + detail.quantity, 0);
    await birdBatch.save();
    res.status(200).json(birdBatch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bird batch by ID
export const deleteBirdBatch = async (req, res) => {
  const { id } = req.params;
  try {
    const birdBatch = await BirdBatches.findByIdAndDelete(id);
    if (!birdBatch) {
      return res.status(404).json({ message: 'Bird batch not found' });
    }
    res.status(200).json({ message: 'Bird batch deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller function to view all records of a particular type of bird
const viewBirdRecordsByType = async (req, res) => {
  const { birdType } = req.params;

  try {
    const birdRecords = await BirdBatches.find({ type: birdType });

    if (!birdRecords) {
      return res.status(404).json({ message: 'No records found for the specified bird type' });
    }

    res.status(200).json({ birdRecords });
  } catch (error) {
    console.error('Error retrieving bird records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export { viewBirdRecordsByType };




// Create a new BirdExpenseCategory
export const createBirdExpenseCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new BirdExpenseCategory({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all BirdExpenseCategories
export const getBirdExpenseCategories = async (req, res) => {
  try {
    const categories = await BirdExpenseCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single BirdExpenseCategory by ID
export const getBirdExpenseCategoryById = async (req, res) => {
  try {
    const category = await BirdExpenseCategory.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a BirdExpenseCategory by ID
export const updateBirdExpenseCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await BirdExpenseCategory.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a BirdExpenseCategory by ID
export const deleteBirdExpenseCategory = async (req, res) => {
  try {
    const category = await BirdExpenseCategory.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Create a new BirdFarmExpense
export const createBirdFarmExpense = async (req, res) => {
  try {
    const {
      date,
      category,
      type,
      batchNumber,
      additionalDetails,
      amount,
      recordedBy,
      breed,
      birthDate,
      batchDetails,
      farmHouseLocation,
      additionalBatchDetails
    } = req.body;

    let expenseBatchNumber = batchNumber;

    // If the category is 'Breeding Stock', create a new batch
    if (category === 'Breeding Stock') {
      const newBatch = new BirdBatches({
        type,
        breed,
        birthDate,
        batchDetails,
        farmHouseLocation,
        additionalDetails: additionalBatchDetails,
        recordedBy
      });
      await newBatch.save();
      expenseBatchNumber = newBatch.batchNumber;
    }

    // Create the new expense record
    const birdFarmExpense = new BirdFarmExpense({
      date,
      category,
      type,
      batchNumber: expenseBatchNumber,
      additionalDetails,
      amount,
      recordedBy
    });
    await birdFarmExpense.save();

    res.status(201).json(birdFarmExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all BirdFarmExpense records
export const getAllBirdFarmExpenses = async (req, res) => {
  try {
    const birdFarmExpenses = await BirdFarmExpense.find();
    res.status(200).json(birdFarmExpenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller to fetch all expenses of a particular type
export const getExpensesByType = async (req, res) => {
  const { type } = req.params; // Assuming type is passed as a URL parameter

  try {
    const expenses = await BirdFarmExpense.find({ type }); // Query expenses by type
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to fetch all expenses of a particular type and batchNumber
export const getExpensesByTypeAndBatchNumber = async (req, res) => {
  const { type, batchNumber } = req.params; // Assuming type and batchNumber are passed as URL parameters

  try {
    const expenses = await BirdFarmExpense.find({ type, batchNumber }); // Query expenses by type and batchNumber
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




export const getExpensesByTypeAndPeriod = async (req, res) => {
  const { type } = req.params; // Assuming type is passed as a URL parameter
  const { startDate, endDate } = req.query; // Assuming startDate and endDate are passed as query parameters

  try {
    // Parse the dates into UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Query expenses by type and within the date range
    const expenses = await BirdFarmExpense.find({
      type,
      date: { $gte: parsedStartDate, $lte: parsedEndDate }
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single BirdFarmExpense by ID
export const getBirdFarmExpenseById = async (req, res) => {
  try {
    const birdFarmExpense = await BirdFarmExpense.findById(req.params.id);
    if (!birdFarmExpense) {
      return res.status(404).json({ message: 'BirdFarmExpense not found' });
    }
    res.status(200).json(birdFarmExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a BirdFarmExpense by ID
export const updateBirdFarmExpense = async (req, res) => {
  try {
    const { date, category, type, batchNumber, additionalDetails, amount, recordedBy } = req.body;
    const birdFarmExpense = await BirdFarmExpense.findByIdAndUpdate(
      req.params.id,
      { date, category, type, batchNumber, additionalDetails, amount, recordedBy },
      { new: true }
    );

    if (!birdFarmExpense) {
      return res.status(404).json({ message: 'BirdFarmExpense not found' });
    }

    res.status(200).json(birdFarmExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a BirdFarmExpense by ID
export const deleteBirdFarmExpense = async (req, res) => {
  try {
    const birdFarmExpense = await BirdFarmExpense.findByIdAndDelete(req.params.id);
    if (!birdFarmExpense) {
      return res.status(404).json({ message: 'BirdFarmExpense not found' });
    }
    res.status(200).json({ message: 'BirdFarmExpense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const addBirdsToBatch = async (req, res) => {
  const { batchNumber } = req.params; // Assuming batchNumber is passed as a route parameter
  const birdsToAdd = req.body; // Array of bird objects

  try {
    // Find the batch by its batchNumber
    const batch = await BirdBatches.findOne({ batchNumber });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Ensure batch.birdAdditions is initialized as an array if not already
    if (!batch.birdAdditions) {
      batch.birdAdditions = [];
    }

    const { type } = batch; // Extract type from the batch object

    // Iterate through each bird object in the payload
    for (const bird of birdsToAdd) {
      const { gender, healthStatus, quantity } = bird;

      // Validate quantity to ensure it's a number
      const parsedQuantity = parseInt(quantity);
      if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
        return res.status(400).json({ message: 'Invalid quantity value' });
      }

      // Ensure gender is provided and is valid
      if (!gender || !['male', 'female'].includes(gender)) {
        return res.status(400).json({ message: 'Gender is required and must be either "male" or "female"' });
      }

      // Find if a bird of the same gender already exists in the batch
      const existingBirdIndex = batch.birdAdditions.findIndex(b => b.gender === gender);

      // If a bird of the same gender already exists, update its quantity
      if (existingBirdIndex !== -1) {
        batch.birdAdditions[existingBirdIndex].quantity += parsedQuantity;
      } else {
        // If not, add a new bird to the batch
        batch.birdAdditions.push({ gender, healthStatus, quantity: parsedQuantity });
      }

      // Update the total quantity of the batch
      batch.totalQuantity += parsedQuantity;
    }

    // Save the updated batch
    const updatedBatch = await batch.save();

    // Save a new record of the batch with bird additions, including type
    const birdBatchAdditions = new BirdBatchAdditions({
      batchNumber: batch.batchNumber,
      type: type, // Use the type of the batch found
      birdAdditions: birdsToAdd.map(({ gender, healthStatus, quantity }) => ({
        type: type, // Ensure type is included for each bird addition
        gender,
        healthStatus,
        quantity
      }))
    });

    await birdBatchAdditions.save();

    res.status(201).json(updatedBatch);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};




// Controller function to fetch all records of a particular type and batchNumber
export const getRecordsByTypeAndBatchNumber = async (req, res) => {
  const { type, batchNumber } = req.params; // Assuming type and batchNumber are passed as route parameters

  try {
    const records = await BirdBatchAdditions.find({ type, batchNumber });
    
    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'No records found' });
    }

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller function to edit a record
export const editBatchAdditionsRecord = async (req, res) => {
  const { id } = req.params;
  const { gender, healthStatus, quantity } = req.body;

  try {
    const record = await BirdBatchAdditions.findById(id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Update the record
    record.gender = gender;
    record.healthStatus = healthStatus;
    record.quantity = quantity;

    const updatedRecord = await record.save();
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a record
export const deleteBatchAdditionsRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const record = await BirdBatchAdditions.findById(id);

    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }

    await record.remove();
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// VACCINATION CHART

// birdVaccinationChartController.js


// Create a new vaccine
export const createVaccinationChart = async (req, res) => {
  try {
    const vaccine = new BirdVaccinationChart(req.body);
    await vaccine.save();
    res.status(201).json(vaccine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all vaccines
export const getAVaccinationChart= async (req, res) => {
  try {
    const vaccines = await BirdVaccinationChart.find();
    res.status(200).json(vaccines);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single vaccine by ID
export const getVaccinationChartById = async (req, res) => {
  try {
    const vaccine = await BirdVaccinationChart.findById(req.params.id);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }
    res.status(200).json(vaccine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a vaccine by ID
export const updateVaccinationChart = async (req, res) => {
  try {
    const vaccine = await BirdVaccinationChart.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }
    res.status(200).json(vaccine);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a vaccine by ID
export const deleteVaccinationChart = async (req, res) => {
  try {
    const vaccine = await BirdVaccinationChart.findByIdAndDelete(req.params.id);
    if (!vaccine) {
      return res.status(404).json({ message: 'Vaccine not found' });
    }
    res.status(200).json({ message: 'Vaccine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Create a new medication category
export const createMedicationCategory = async (req, res) => {
  try {
    const category = new BirdMedicationCategory(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all medication categories
export const getAllMedicationCategories = async (req, res) => {
  try {
    const categories = await BirdMedicationCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single medication category by ID
export const getMedicationCategoryById = async (req, res) => {
  try {
    const category = await BirdMedicationCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a medication category by ID
export const updateMedicationCategory = async (req, res) => {
  try {
    const category = await BirdMedicationCategory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a medication category by ID
export const deleteMedicationCategory = async (req, res) => {
  try {
    const category = await BirdMedicationCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Create a new bird drug
export const createBirdDrug = async (req, res) => {
  try {
    const drug = new BirdDrugs(req.body);
    await drug.save();
    res.status(201).json(drug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bird drugs
export const getAllBirdDrugs = async (req, res) => {
  try {
    const drugs = await BirdDrugs.find();
    res.status(200).json(drugs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single bird drug by ID
export const getBirdDrugById = async (req, res) => {
  try {
    const drug = await BirdDrugs.findById(req.params.id);
    if (!drug) {
      return res.status(404).json({ message: 'Bird drug not found' });
    }
    res.status(200).json(drug);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bird drug by ID
export const updateBirdDrug = async (req, res) => {
  try {
    const drug = await BirdDrugs.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!drug) {
      return res.status(404).json({ message: 'Bird drug not found' });
    }
    res.status(200).json(drug);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bird drug by ID
export const deleteBirdDrug = async (req, res) => {
  try {
    const drug = await BirdDrugs.findByIdAndDelete(req.params.id);
    if (!drug) {
      return res.status(404).json({ message: 'Bird drug not found' });
    }
    res.status(200).json({ message: 'Bird drug deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// BIRD VACCINATION RECORD

export const createBirdVaccinationRecord = async (req, res) => {
  try {
    const {
      type,
      batchNumber,
      vaccinationDate,
      vaccineName,
      dosage,
      administrationMethod,
      comments,
      additionalDetails,
      amount, // Include amount field from the request body
      status,
    } = req.body;

    // Create new record in BirdVaccinationRecords collection
    const newRecord = new BirdVaccinationRecords({
      type,
      batchNumber,
      vaccinationDate,
      vaccineName,
      dosage,
      administrationMethod,
      comments,
      additionalDetails,
      status,
    });

    // Save the new record
    const savedRecord = await newRecord.save();

    // Create new expense for Veterinary Services (Vaccination) category
    const newExpense = new BirdFarmExpense({
      date: vaccinationDate,
      category: 'Veterinary Services (Vaccination)',
      type,
      batchNumber,
      additionalDetails: additionalDetails || '',
      amount: amount || 0, // Use the provided amount or default to 0
    
    });

    // Save the new expense
    await newExpense.save();

    // Respond with the saved record
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller to get all bird vaccination records
export const getAllBirdVaccinationRecords = async (req, res) => {
  try {
    const records = await BirdVaccinationRecords.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBirdVaccinationRecordsByType = async (req, res) => {
  const { type } = req.query;

  try {
    const vaccinationRecords = await BirdVaccinationRecords.find({ type });

    if (!vaccinationRecords || vaccinationRecords.length === 0) {
      return res.status(404).json({ message: `No vaccination records found for type '${type}'` });
    }

    res.status(200).json(vaccinationRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBirdVaccinationRecordsByTypeAndBatchNumber = async (req, res) => {
  const { type, batchNumber } = req.query;

  try {
    const vaccinationRecords = await BirdVaccinationRecords.find({ type, batchNumber });

    if (!vaccinationRecords || vaccinationRecords.length === 0) {
      return res.status(404).json({ message: `No vaccination records found for type '${type}' and batch number '${batchNumber}'` });
    }

    res.status(200).json(vaccinationRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to get a single bird vaccination record by ID
export const getBirdVaccinationRecordById = async (req, res) => {
  try {
    const record = await BirdVaccinationRecords.findById(req.params.id);
    if (!record) {
      res.status(404).json({ message: 'Record not found' });
      return;
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a bird vaccination record by ID
export const updateBirdVaccinationRecordById = async (req, res) => {
  try {
    const {
      type,
      batchNumber,
      vaccinationDate,
      vaccineName,
      dosage,
      administrationMethod,
      status,
    } = req.body;

    const updatedRecord = await BirdVaccinationRecords.findByIdAndUpdate(
      req.params.id,
      {
        type,
        batchNumber,
        vaccinationDate,
        vaccineName,
        dosage,
        administrationMethod,
        status,
      },
      { new: true }
    );

    if (!updatedRecord) {
      res.status(404).json({ message: 'Record not found' });
      return;
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a bird vaccination record by ID
export const deleteBirdVaccinationRecordById = async (req, res) => {
  try {
    const deletedRecord = await BirdVaccinationRecords.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      res.status(404).json({ message: 'Record not found' });
      return;
    }
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller to create a new bird mortality record
export const createBirdMortalityRecord = async (req, res) => {
  try {
    const newRecord = new BirdMortality(req.body);
    
    // Find the batch with the same batchNumber and type
    const batch = await BirdBatches.findOne({ 
      type: req.body.type, 
      batchNumber: req.body.batchNumber 
    });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Deduct the quantities of each gender which died from the batchDetails
    newRecord.batchDetails.forEach((mortalityDetail) => {
      const genderIndex = batch.batchDetails.findIndex((detail) => detail.gender === mortalityDetail.gender);
      if (genderIndex !== -1) {
        batch.batchDetails[genderIndex].quantity -= mortalityDetail.quantity;
      }
    });

    // Save the updated batch
    await batch.save();

    // Save the mortality record
    const savedRecord = await newRecord.save();
    
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to retrieve all bird mortality records
export const getAllBirdMortalityRecords = async (req, res) => {
  try {
    const records = await BirdMortality.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to fetch the mortality report of a particular type of bird
export const getBirdMortalityReportByType = async (req, res) => {
  try {
    const birdType = req.query.type; // Extract the bird type from the query parameter

    // Query the BirdMortality collection for records with the specified bird type
    const records = await BirdMortality.find({ type: birdType });

    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to retrieve a single bird mortality record by ID
export const getBirdMortalityRecordById = async (req, res) => {
  try {
    const record = await BirdMortality.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    res.status(200).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a bird mortality record by ID
export const updateBirdMortalityRecordById = async (req, res) => {
  try {
    const record = await BirdMortality.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    Object.assign(record, req.body);
    const updatedRecord = await record.save();
    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a bird mortality record by ID
export const deleteBirdMortalityRecordById = async (req, res) => {
  try {
    const record = await BirdMortality.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ message: 'Record not found' });
    }
    await record.remove();
    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};







// Create a new bird eggs collected record
export const createBirdEggsCollected = async (req, res) => {
  try {
    const { category, size, crates, loose, type } = req.body;

    if (category === 'sorted') {
      // Update or add the number of eggs in the sorted egg stock based on size and type
      await BirdSortedEggsStock.findOneAndUpdate(
        { type },
        { $inc: { [`sizes.${size}.crates`]: crates, [`sizes.${size}.loose`]: loose } },
        { upsert: true, new: true }
      );
    } else if (category === 'unsorted') {
      // Update or add the number of eggs in the unsorted egg stock based on type
      await BirdUnsortedEggStock.findOneAndUpdate(
        { type },
        { $inc: { crates, loose } },
        { upsert: true, new: true }
      );
    } else {
      throw new Error('Invalid egg category');
    }

    // Save the bird eggs collected record
    const birdEggsCollected = new BirdEggsCollected(req.body);
    await birdEggsCollected.save();
    res.status(201).json(birdEggsCollected);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Fetch the stock of sorted eggs for a particular type of bird
export const getSortedEggsStockByType = async (req, res) => {
  try {
    const { type } = req.params;

    // Find the stock of sorted eggs for the given type
    const sortedEggsStock = await BirdSortedEggsStock.findOne({ type });

    if (!sortedEggsStock) {
      return res.status(404).json({ message: 'No stock found for the specified type' });
    }

    res.status(200).json(sortedEggsStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch the stock of unsorted eggs for a particular type of bird
export const getUnsortedEggsStockByType = async (req, res) => {
  try {
    const { type } = req.params;

    // Find the stock of unsorted eggs for the given type
    const unsortedEggsStock = await BirdUnsortedEggStock.findOne({ type });

    if (!unsortedEggsStock) {
      return res.status(404).json({ message: 'No stock found for the specified type' });
    }

    res.status(200).json(unsortedEggsStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEggsCollectedToday = async (req, res) => {
  try {
    // Get the current date
    const today = new Date();
    // Set the time to 00:00:00 to get the start of the day
    today.setHours(0, 0, 0, 0);

    // Get the next day's date and set the time to 00:00:00
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Query the database for records between today and tomorrow
    const eggsCollectedToday = await BirdEggsCollected.find({
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // Send the records in the response
    res.status(200).json(eggsCollectedToday);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the records' });
  }
};


export const getEggsCollectedTodayByType = async (req, res) => {
  try {
    // Get the current date
    const today = new Date();
    // Set the time to 00:00:00 to get the start of the day
    today.setHours(0, 0, 0, 0);

    // Get the next day's date and set the time to 00:00:00
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Get the type from the request parameters
    const { type } = req.params;

    // Query the database for records of the specific type between today and tomorrow
    const eggsCollectedTodayByType = await BirdEggsCollected.find({
      type: type,
      date: {
        $gte: today,
        $lt: tomorrow,
      },
    });

    // Send the records in the response
    res.status(200).json(eggsCollectedTodayByType);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the records' });
  }
};




// Get all bird eggs collected records
export const getBirdEggsCollected = async (req, res) => {
  try {
    const birdEggsCollected = await BirdEggsCollected.find();
    res.status(200).json(birdEggsCollected);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a bird eggs collected record by ID
export const getBirdEggsCollectedById = async (req, res) => {
  try {
    const birdEggsCollected = await BirdEggsCollected.findById(req.params.id);
    if (!birdEggsCollected) {
      return res.status(404).json({ message: 'Bird eggs collected record not found' });
    }
    res.status(200).json(birdEggsCollected);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bird eggs collected record
export const updateBirdEggsCollected = async (req, res) => {
  try {
    const birdEggsCollected = await BirdEggsCollected.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!birdEggsCollected) {
      return res.status(404).json({ message: 'Bird eggs collected record not found' });
    }
    res.status(200).json(birdEggsCollected);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a bird eggs collected record
export const deleteBirdEggsCollected = async (req, res) => {
  try {
    const birdEggsCollected = await BirdEggsCollected.findByIdAndDelete(req.params.id);
    if (!birdEggsCollected) {
      return res.status(404).json({ message: 'Bird eggs collected record not found' });
    }
    res.status(200).json({ message: 'Bird eggs collected record deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Controller to create a new bird sale
export const createBirdSale = async (req, res) => {
  try {
    // Find the batch with the same batchNumber and type
    const batch = await BirdBatches.findOne({ 
      type: req.body.type, 
      batchNumber: req.body.batchNumber 
    });

    if (!batch) {
      return res.status(404).json({ message: 'Batch not found' });
    }

    // Create a new bird sale record
    const newBirdSale = new BirdSale(req.body);

    // Deduct the quantities of each gender which died from the batchDetails
    newBirdSale.batchDetails.forEach((saleDetail) => {
      const genderIndex = batch.batchDetails.findIndex((detail) => detail.gender === saleDetail.gender);
      if (genderIndex !== -1) {
        batch.batchDetails[genderIndex].quantity -= saleDetail.quantity;
      }
    });

    // Save the updated batch
    await batch.save();

    // Save the bird sale record
    const savedRecord = await newBirdSale.save();

    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Controller to get all bird sales
export const getBirdSales = async (req, res) => {
  try {
    const birdSales = await BirdSale.find();
    res.status(200).json(birdSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single bird sale by ID
export const getBirdSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const birdSale = await BirdSale.findById(id);
    if (!birdSale) {
      res.status(404).json({ message: 'Bird sale not found' });
    } else {
      res.status(200).json(birdSale);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a bird sale by ID
export const updateBirdSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedBirdSale = await BirdSale.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedBirdSale) {
      res.status(404).json({ message: 'Bird sale not found' });
    } else {
      res.status(200).json(updatedBirdSale);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a bird sale by ID
export const deleteBirdSaleById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBirdSale = await BirdSale.findByIdAndDelete(id);
    if (!deletedBirdSale) {
      res.status(404).json({ message: 'Bird sale not found' });
    } else {
      res.status(200).json({ message: 'Bird sale deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all bird sales of a particular type
export const getBirdSalesByType = async (req, res) => {
  const { type } = req.query;

  try {
    const birdSales = await BirdSale.find({ type });

    if (!birdSales || birdSales.length === 0) {
      return res.status(404).json({ message: `No bird sales found for type '${type}'` });
    }

    res.status(200).json(birdSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all sales records for a particular batch and type
export const getSalesRecordsByBatchAndType = async (req, res) => {
  const { type, batchNumber } = req.query;

  try {
    const salesRecords = await BirdSale.find({ type, batchNumber });

    if (!salesRecords || salesRecords.length === 0) {
      return res.status(404).json({ message: `No sales records found for type '${type}' and batch '${batchNumber}'` });
    }

    res.status(200).json(salesRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Create a new deworming record
export const createBirdDewormingRecord = async (req, res) => {
  try {
    const {
      type,
      batchNumber,
      dewormingDate,
      dewormerName,
      dosage,
      administrationMethod,
      status,
      comments,
      amount, // Include amount field from the request body
    } = req.body;

    // Create new record in BirdDewormingRecords collection
    const newRecord = new BirdDewormingRecords({
      type,
      batchNumber,
      dewormingDate,
      dewormerName,
      dosage,
      administrationMethod,
      status,
      comments,
    });

    // Save the new record
    const savedRecord = await newRecord.save();

    // Create new expense for Veterinary Services (Deworming) category
    const newExpense = new BirdFarmExpense({
      date: dewormingDate,
      category: 'Veterinary Services (Deworming)',
      type,
      batchNumber,
      additionalDetails: comments || '',
      amount: amount || 0, // Use the provided amount or default to 0
    });

    // Save the new expense
    await newExpense.save();

    // Respond with the saved record
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all deworming records
export const getAllBirdDewormingRecords = async (req, res) => {
  try {
    const dewormingRecords = await BirdDewormingRecords.find({});
    res.status(200).json(dewormingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get deworming records by type
export const getBirdDewormingRecordsByType = async (req, res) => {
  const { type } = req.query;

  try {
    const dewormingRecords = await BirdDewormingRecords.find({ type });

    if (!dewormingRecords || dewormingRecords.length === 0) {
      return res.status(404).json({ message: `No deworming records found for type '${type}'` });
    }

    res.status(200).json(dewormingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get deworming records by type and batch number
export const getBirdDewormingRecordsByTypeAndBatch = async (req, res) => {
  const { type, batchNumber } = req.query;

  try {
    const dewormingRecords = await BirdDewormingRecords.find({ type, batchNumber });

    if (!dewormingRecords || dewormingRecords.length === 0) {
      return res.status(404).json({ message: `No deworming records found for type '${type}' and batch number '${batchNumber}'` });
    }

    res.status(200).json(dewormingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a deworming record
export const updateBirdDewormingRecord = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedRecord = await BirdDewormingRecords.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedRecord) {
      return res.status(404).json({ message: `No deworming record found with ID '${id}'` });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a deworming record
export const deleteBirdDewormingRecord = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecord = await BirdDewormingRecords.findByIdAndDelete(id);

    if (!deletedRecord) {
      return res.status(404).json({ message: `No deworming record found with ID '${id}'` });
    }

    res.status(200).json({ message: 'Deworming record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// Create a new feed name
export const createFeedName = async (req, res) => {
  try {
    const { name } = req.body;

    // Create new feed name
    const newFeedName = new BirdFeedNames({ name });
    await newFeedName.save();

    res.status(201).json({ message: 'Feed name created successfully', feedName: newFeedName });
  } catch (error) {
    res.status(500).json({ message: 'Error creating feed name', error: error.message });
  }
};

// Get all feed names
export const getFeedNames = async (req, res) => {
  try {
    const feedNames = await BirdFeedNames.find();
    res.status(200).json(feedNames);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feed names', error: error.message });
  }
};

// Get a single feed name by ID
export const getFeedNameById = async (req, res) => {
  try {
    const { id } = req.params;
    const feedName = await BirdFeedNames.findById(id);

    if (!feedName) {
      return res.status(404).json({ message: 'Feed name not found' });
    }

    res.status(200).json(feedName);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feed name', error: error.message });
  }
};

// Update a feed name by ID
export const updateFeedName = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const updatedFeedName = await BirdFeedNames.findByIdAndUpdate(
      id,
      { name },
      { new: true, runValidators: true }
    );

    if (!updatedFeedName) {
      return res.status(404).json({ message: 'Feed name not found' });
    }

    res.status(200).json({ message: 'Feed name updated successfully', feedName: updatedFeedName });
  } catch (error) {
    res.status(500).json({ message: 'Error updating feed name', error: error.message });
  }
};

// Delete a feed name by ID
export const deleteFeedName = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedFeedName = await BirdFeedNames.findByIdAndDelete(id);

    if (!deletedFeedName) {
      return res.status(404).json({ message: 'Feed name not found' });
    }

    res.status(200).json({ message: 'Feed name deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting feed name', error: error.message });
  }
};




// birdFeedPurchaseController.mjs



// Create a new BirdFeedPurchase and corresponding BirdFarmExpense
export const createBirdFeedPurchase = async (req, res) => {
  const { batchNumber, type, feedName, quantityPurchased } = req.body;

  try {
    // Parse quantityPurchased as an integer
    const purchasedQuantity = parseInt(quantityPurchased);

    // Find the BirdFeedStock entry by feedName
    let birdFeedStock = await BirdFeedStock.findOne({ feedName });

    if (!birdFeedStock) {
      // If BirdFeedStock entry does not exist, create a new one
      birdFeedStock = new BirdFeedStock({ feedName, quantity: purchasedQuantity });
    } else {
      // If BirdFeedStock entry exists, update the quantity
      birdFeedStock.quantity += purchasedQuantity;
    }

    // Save the updated or new BirdFeedStock entry
    await birdFeedStock.save();

    // Create the BirdFeedPurchase document
    const birdFeedPurchase = new BirdFeedPurchase(req.body);
    await birdFeedPurchase.save();

    // Create the BirdFarmExpense document
    const birdFarmExpense = new BirdFarmExpense({
      date: new Date(),
      category: 'Feed Expenses',
      type: type,
      batchNumber: batchNumber,
      additionalDetails: `Purchase of ${feedName}`,
      amount: birdFeedPurchase.totalCost,
      recordedBy: birdFeedPurchase.purchasedBy,
    });
    await birdFarmExpense.save();

    res.status(201).json({ birdFeedPurchase, birdFarmExpense });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};






// Get all BirdFeedPurchases
export const getAllBirdFeedPurchases = async (req, res) => {
  try {
    const birdFeedPurchases = await BirdFeedPurchase.find();
    res.status(200).json(birdFeedPurchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View all feed purchases within a period
export const getFeedPurchasesWithinPeriod = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Parse start and end dates into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Fetch feed purchases within the specified period
    const feedPurchases = await BirdFeedPurchase.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate }
    });

    res.status(200).json(feedPurchases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get a single BirdFeedPurchase by ID
export const getBirdFeedPurchaseById = async (req, res) => {
  try {
    const birdFeedPurchase = await BirdFeedPurchase.findById(req.params.id);
    if (!birdFeedPurchase) {
      return res.status(404).json({ message: 'BirdFeedPurchase not found' });
    }
    res.status(200).json(birdFeedPurchase);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a BirdFeedPurchase by ID
export const updateBirdFeedPurchase = async (req, res) => {
  try {
    const birdFeedPurchase = await BirdFeedPurchase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!birdFeedPurchase) {
      return res.status(404).json({ message: 'BirdFeedPurchase not found' });
    }
    res.status(200).json(birdFeedPurchase);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a BirdFeedPurchase by ID
export const deleteBirdFeedPurchase = async (req, res) => {
  try {
    const birdFeedPurchase = await BirdFeedPurchase.findByIdAndDelete(req.params.id);
    if (!birdFeedPurchase) {
      return res.status(404).json({ message: 'BirdFeedPurchase not found' });
    }
    res.status(200).json({ message: 'BirdFeedPurchase deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// birdFeedStockController.mjs


// Create a new bird feed stock
export const createBirdFeedStock = async (req, res) => {
  try {
    const { feedName, quantity } = req.body;
    const birdFeedStock = new BirdFeedStock({ feedName, quantity });
    const savedBirdFeedStock = await birdFeedStock.save();
    res.status(201).json(savedBirdFeedStock);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all bird feed stocks
export const getAllBirdFeedStocks = async (req, res) => {
  try {
    const birdFeedStocks = await BirdFeedStock.find();
    res.status(200).json(birdFeedStocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a bird feed stock by ID
export const updateBirdFeedStock = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  try {
    const updatedBirdFeedStock = await BirdFeedStock.findByIdAndUpdate(
      id,
      { name, quantity },
      { new: true }
    );
    if (!updatedBirdFeedStock) {
      return res.status(404).json({ message: 'Bird feed stock not found' });
    }
    res.status(200).json(updatedBirdFeedStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a bird feed stock by ID
export const deleteBirdFeedStock = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBirdFeedStock = await BirdFeedStock.findByIdAndDelete(id);
    if (!deletedBirdFeedStock) {
      return res.status(404).json({ message: 'Bird feed stock not found' });
    }
    res.status(200).json({ message: 'Bird feed stock deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const createBirdFeedIssuance = async (req, res) => {
  const { feedName, quantityIssued } = req.body;
  try {
    // Create a new Bird Feed Issuance
    const newIssuance = new BirdFeedIssuance({
      feedName,
      quantityIssued,
    });
    await newIssuance.save();

    // Update the corresponding Bird Feed Stock
    const birdFeedStock = await BirdFeedStock.findOne({ feedName });
    if (!birdFeedStock) {
      throw new Error('Bird Feed Stock not found');
    }
    birdFeedStock.quantity -= quantityIssued;
    await birdFeedStock.save();

    res.status(201).json(newIssuance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get all Bird Feed Issuances
export const getAllBirdFeedIssuances = async (req, res) => {
  try {
    const issuances = await BirdFeedIssuance.find();
    res.status(200).json(issuances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Bird Feed Issuances within a specific period
export const getBirdFeedIssuancesWithinPeriod = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Fetch Bird Feed Issuances within the specified period
    const issuances = await BirdFeedIssuance.find({
      issuedDate: { $gte: parsedStartDate, $lte: parsedEndDate }
    });

    res.status(200).json(issuances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single Bird Feed Issuance by ID
export const getBirdFeedIssuanceById = async (req, res) => {
  const { id } = req.params;
  try {
    const issuance = await BirdFeedIssuance.findById(id);
    if (!issuance) {
      res.status(404).json({ message: 'Bird Feed Issuance not found' });
      return;
    }
    res.status(200).json(issuance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Update a Bird Feed Issuance by ID
export const updateBirdFeedIssuance = async (req, res) => {
  const { id } = req.params;
  const { feedName, quantityIssued } = req.body;
  try {
    const issuance = await BirdFeedIssuance.findById(id);
    if (!issuance) {
      res.status(404).json({ message: 'Bird Feed Issuance not found' });
      return;
    }
    issuance.feedName = feedName;
    issuance.quantityIssued = quantityIssued;
    await issuance.save();
    res.status(200).json(issuance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Delete a Bird Feed Issuance by ID
export const deleteBirdFeedIssuance = async (req, res) => {
  const { id } = req.params;
  try {
    const issuance = await BirdFeedIssuance.findById(id);
    if (!issuance) {
      res.status(404).json({ message: 'Bird Feed Issuance not found' });
      return;
    }
    await issuance.remove();
    res.status(200).json({ message: 'Bird Feed Issuance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Create a new Bird Health Diagnosis record
export const createBirdHealthDiagnosis = async (req, res) => {
  const { type, batchNumber, observationDate, details, provisionalDiagnosis, recordedBy } = req.body;
  try {
    const newDiagnosis = new BirdHealthDiagnosis({
      type,
      batchNumber,
      observationDate,
      details,
      provisionalDiagnosis,
      recordedBy,
    });
    await newDiagnosis.save();
    res.status(201).json(newDiagnosis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Get all Bird Health Diagnosis records
export const getAllBirdHealthDiagnoses = async (req, res) => {
  try {
    const diagnoses = await BirdHealthDiagnosis.find();
    res.status(200).json(diagnoses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single Bird Health Diagnosis record by ID
export const getBirdHealthDiagnosisById = async (req, res) => {
  const { id } = req.params;
  try {
    const diagnosis = await BirdHealthDiagnosis.findById(id);
    if (!diagnosis) {
      return res.status(404).json({ message: 'Bird Health Diagnosis record not found' });
    }
    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing Bird Health Diagnosis record
export const updateBirdHealthDiagnosis = async (req, res) => {
  const { id } = req.params;
  const { type, batchNumber, observationDate, details, provisionalDiagnosis, recordedBy } = req.body;
  try {
    const updatedDiagnosis = await BirdHealthDiagnosis.findByIdAndUpdate(
      id,
      { type, batchNumber, observationDate, details, provisionalDiagnosis, recordedBy },
      { new: true }
    );
    if (!updatedDiagnosis) {
      return res.status(404).json({ message: 'Bird Health Diagnosis record not found' });
    }
    res.status(200).json(updatedDiagnosis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a Bird Health Diagnosis record
export const deleteBirdHealthDiagnosis = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedDiagnosis = await BirdHealthDiagnosis.findByIdAndDelete(id);
    if (!deletedDiagnosis) {
      return res.status(404).json({ message: 'Bird Health Diagnosis record not found' });
    }
    res.status(200).json({ message: 'Bird Health Diagnosis record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const createBirdEggSale = async (req, res) => {
  const { type, customerName, phoneNumber, crates, unitPricePerCrate, category, size, salesMadeBy } = req.body;

  try {
    // Check the category and adjust stock accordingly
    if (category === 'sorted') {
      // Fetch the sorted egg stock for the given type
      const sortedStock = await BirdSortedEggsStock.findOne({ type });

      if (!sortedStock || !sortedStock.sizes[size] || sortedStock.sizes[size].crates < crates) {
        return res.status(400).json({ message: 'Insufficient sorted egg stock' });
      }

      // Deduct the crates from the stock
      sortedStock.sizes[size].crates -= crates;
      await sortedStock.save();
    } else if (category === 'unsorted') {
      // Fetch the unsorted egg stock for the given type
      const unsortedStock = await BirdUnsortedEggStock.findOne({ type });

      if (!unsortedStock || unsortedStock.crates < crates) {
        return res.status(400).json({ message: 'Insufficient unsorted egg stock' });
      }

      // Deduct the crates from the stock
      unsortedStock.crates -= crates;
      await unsortedStock.save();
    }

    // Create a new BirdEggSale document
    const birdEggSale = new BirdEggSale({
      type,
      customerName,
      phoneNumber,
      crates,
      unitPricePerCrate,
      category,
      size,
      salesMadeBy
    });

    await birdEggSale.save();
    res.status(201).json(birdEggSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




export const getBirdEggSales = async (req, res) => {
  try {
    const birdEggSales = await BirdEggSale.find();
    res.status(200).json(birdEggSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const updateBirdEggSale = async (req, res) => {
  const { id } = req.params;
  const { type, customerName, phoneNumber, crates, unitPricePerCrate, category, size, salesMadeBy } = req.body;

  try {
    const birdEggSale = await BirdEggSale.findById(id);

    if (!birdEggSale) {
      return res.status(404).json({ message: 'BirdEggSale not found' });
    }

    birdEggSale.type = type || birdEggSale.type;
    birdEggSale.customerName = customerName || birdEggSale.customerName;
    birdEggSale.phoneNumber = phoneNumber || birdEggSale.phoneNumber;
    birdEggSale.crates = crates || birdEggSale.crates;
    birdEggSale.unitPricePerCrate = unitPricePerCrate || birdEggSale.unitPricePerCrate;
    birdEggSale.category = category || birdEggSale.category;
    birdEggSale.size = size || birdEggSale.size;
    birdEggSale.salesMadeBy = salesMadeBy || birdEggSale.salesMadeBy;

    await birdEggSale.save();
    res.status(200).json(birdEggSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteBirdEggSale = async (req, res) => {
  const { id } = req.params;

  try {
    const birdEggSale = await BirdEggSale.findById(id);

    if (!birdEggSale) {
      return res.status(404).json({ message: 'BirdEggSale not found' });
    }

    await birdEggSale.remove();
    res.status(200).json({ message: 'BirdEggSale deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const getSortedBirdEggsStock = async (req, res) => {
  try {
    const birdStock = await BirdSortedEggsStock.findOne();
    if (!birdStock) {
      return res.status(404).json({ message: 'Sorted bird eggs stock not found' });
    }
    res.json(birdStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller to get unsorted bird eggs stock
export const getUnsortedBirdEggsStock = async (req, res) => {
  try {
    const eggStocks = await BirdUnsortedEggStock.find();
    res.json(eggStocks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// controllers/birdEggsIncubatorLoadingController.js


// Create a new batch
export const loadEggBatch = async (req, res) => {
  try {
    const { type, breed, dateLoaded, numberOfEggs, incubatorId, notes, expectedHatchDate } = req.body;

    const batch = new BirdEggsIncubatorLoading({
      type,
      breed, // Include breed field
      dateLoaded,
      numberOfEggs,
      incubatorId,
      notes,
      expectedHatchDate
    });

    await batch.save();

    res.status(201).json(batch);
  } catch (error) {
    console.error('Error creating batch:', error);
    res.status(500).json({ error: 'Failed to create batch' });
  }
};


// Get a batch by batchNumber
export const getBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const batch = await BirdEggsIncubatorLoading.findOne({ batchNumber });

    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    res.json(batch);
  } catch (error) {
    console.error('Error getting batch:', error);
    res.status(500).json({ error: 'Failed to get batch' });
  }
};

// Get all batches
export const getAllBatches = async (req, res) => {
  try {
    const batches = await BirdEggsIncubatorLoading.find();
    res.json(batches);
  } catch (error) {
    console.error('Error getting all batches:', error);
    res.status(500).json({ error: 'Failed to get batches' });
  }
};

// Update a batch by batchNumber
export const updateBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const update = req.body;

    const batch = await BirdEggsIncubatorLoading.findOneAndUpdate({ batchNumber }, update, { new: true });

    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    res.json(batch);
  } catch (error) {
    console.error('Error updating batch:', error);
    res.status(500).json({ error: 'Failed to update batch' });
  }
};

// Delete a batch by batchNumber
export const deleteBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const batch = await BirdEggsIncubatorLoading.findOneAndDelete({ batchNumber });

    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    res.json({ message: 'Batch deleted successfully' });
  } catch (error) {
    console.error('Error deleting batch:', error);
    res.status(500).json({ error: 'Failed to delete batch' });
  }
};





export const registerIncubator = async (req, res) => {
  try {
    const { name, location, capacity, status, notes, yearPurchased, amountPurchased, supplierDetails } = req.body;

    // Create a new incubator instance
    const incubator = new Incubator({
      name,
      location,
      capacity,
      status,
      notes,
      yearPurchased,
      amountPurchased,
      supplierDetails
    });

    // Save the incubator to the database
    await incubator.save();

    res.status(201).json(incubator);
  } catch (error) {
    console.error('Error registering incubator:', error);
    res.status(500).json({ error: 'Failed to register incubator' });
  }
};




// Get all incubators
export const getAllIncubators = async (req, res) => {
  try {
    const incubators = await Incubator.find();
    res.status(200).json(incubators);
  } catch (error) {
    console.error('Error fetching incubators:', error);
    res.status(500).json({ error: 'Failed to fetch incubators' });
  }
};

// Get incubator by ID
export const getIncubatorById = async (req, res) => {
  try {
    const incubator = await Incubator.findById(req.params.id);
    if (!incubator) {
      return res.status(404).json({ error: 'Incubator not found' });
    }
    res.status(200).json(incubator);
  } catch (error) {
    console.error('Error fetching incubator:', error);
    res.status(500).json({ error: 'Failed to fetch incubator' });
  }
};




// Update incubator by ID
export const updateIncubator = async (req, res) => {
  try {
    const { name, location, capacity, status, notes, yearPurchased, amountPurchased, supplierDetails } = req.body;

    const incubator = await Incubator.findById(req.params.id);
    if (!incubator) {
      return res.status(404).json({ error: 'Incubator not found' });
    }

    incubator.name = name || incubator.name;
    incubator.location = location || incubator.location;
    incubator.capacity = capacity || incubator.capacity;
    incubator.status = status || incubator.status;
    incubator.notes = notes || incubator.notes;
    incubator.yearPurchased = yearPurchased || incubator.yearPurchased;
    incubator.amountPurchased = amountPurchased || incubator.amountPurchased;
    incubator.supplierDetails = supplierDetails || incubator.supplierDetails;

    await incubator.save();
    res.status(200).json(incubator);
  } catch (error) {
    console.error('Error updating incubator:', error);
    res.status(500).json({ error: 'Failed to update incubator' });
  }
};




// Delete incubator by ID
export const deleteIncubator = async (req, res) => {
  try {
    const incubator = await Incubator.findById(req.params.id);
    if (!incubator) {
      return res.status(404).json({ error: 'Incubator not found' });
    }

    await incubator.remove();
    res.status(200).json({ message: 'Incubator deleted successfully' });
  } catch (error) {
    console.error('Error deleting incubator:', error);
    res.status(500).json({ error: 'Failed to delete incubator' });
  }
};

export const getAllActiveEggBatches = async (req, res) => {
  try {
    const activeBatches = await BirdEggsIncubatorLoading.find({
      status: { $in: ['active', 'due', 'overdue'] }
    });
    res.status(200).json(activeBatches);
  } catch (error) {
    console.error('Error fetching active batches:', error);
    res.status(500).json({ error: 'Failed to fetch active batches' });
  }
};



// Create a new hatched egg record
export const createHatchedEggs = async (req, res) => {
  const { batchNumber, numberOfEggsHatched, hatchingDate, notes, numberOfEggs, type } = req.body;

  try {
    // Ensure numberOfEggs is provided in the request body
    if (!numberOfEggs) {
      return res.status(400).json({ error: 'numberOfEggs is required' });
    }

    // Create a new HatchedEggs document
    const newHatchedEggs = new HatchedEggs({
      type,
      batchNumber,
      numberOfEggsHatched,
      hatchingDate,
      notes,
      numberOfEggs,
    });

    // Save the document to the database
    await newHatchedEggs.save();

    // Update the corresponding BirdEggsIncubatorLoading document status to 'hatched' and set statusImmutable to true
    const updatedBatch = await BirdEggsIncubatorLoading.findOneAndUpdate(
      { batchNumber },
      { $set: { status: 'hatched', statusImmutable: true } },
      { new: true }
    );

    if (!updatedBatch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    // Respond with the created document
    res.status(201).json(newHatchedEggs);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};






// Get a single hatched egg record by ID
export const getHatchedEggsById = async (req, res) => {
  const { id } = req.params;

  try {
    const hatchedEggs = await HatchedEggs.findById(id);
    if (!hatchedEggs) {
      return res.status(404).json({ message: 'Hatched eggs not found' });
    }
    res.json(hatchedEggs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a hatched egg record by ID
export const updateHatchedEggs = async (req, res) => {
  const { id } = req.params;
  const { batchNumber, numberOfEggsHatched, notes } = req.body;

  try {
    const hatchedEggs = await HatchedEggs.findById(id);
    if (!hatchedEggs) {
      return res.status(404).json({ message: 'Hatched eggs not found' });
    }

    hatchedEggs.batchNumber = batchNumber;
    hatchedEggs.numberOfEggsHatched = numberOfEggsHatched;
    hatchedEggs.notes = notes;

    await hatchedEggs.save();
    res.json(hatchedEggs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a hatched egg record by ID
export const deleteHatchedEggs = async (req, res) => {
  const { id } = req.params;

  try {
    const hatchedEggs = await HatchedEggs.findByIdAndDelete(id);
    if (!hatchedEggs) {
      return res.status(404).json({ message: 'Hatched eggs not found' });
    }
    res.json({ message: 'Hatched eggs deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all hatched egg records
export const getAllHatchedEggs = async (req, res) => {
  try {
    const hatchedEggs = await HatchedEggs.find();
    res.json(hatchedEggs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all hatched egg records within a particular period
export const getHatchedEggsByDateRange = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    // Validate startDate and endDate
    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'startDate and endDate are required' });
    }

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Ensure parsedStartDate and parsedEndDate are valid dates
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date format' });
    }

    // Find all hatched eggs within the specified date range
    const hatchedEggs = await HatchedEggs.find({
      hatchingDate: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    res.json(hatchedEggs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Controller to fetch hatched eggs of a particular type and within a specific period
export const getHatchedEggsByTypeAndPeriod = async (req, res) => {
  const { type, startDate, endDate } = req.query;

  try {
    // Construct the query object
    const query = {
      type: type,
      hatchingDate: {
        $gte: new Date(startDate), // Greater than or equal to startDate
        $lte: new Date(endDate),   // Less than or equal to endDate
      }
    };

    // Execute the query using Mongoose
    const hatchedEggs = await HatchedEggs.find(query);

    // Respond with the fetched hatched eggs
    res.status(200).json(hatchedEggs);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch hatched eggs' });
  }
};


// Controller function to relocate a batch of birds to another farm section
export const relocateBirds = async (req, res) => {
  try {
    // Extract data from the request body
    const { batchNumber, fromFarmSection, toFarmSection, quantity, relocationBy, relocationReason } = req.body;

    // Fetch the batch from the 'fromFarmSection'
    const sourceBatch = await BirdBatches.findOne({ batchNumber, farmHouseLocation: fromFarmSection });

    // Handle case where batch is not found
    if (!sourceBatch) {
      return res.status(404).json({ success: false, error: 'Batch not found in the specified farm section' });
    }

    // Calculate total quantity of birds in the source batch
    const totalSourceQuantity = sourceBatch.batchDetails.reduce((acc, bird) => acc + bird.quantity, 0);

    // Check if the quantity being moved is not more than the available quantity
    if (quantity > totalSourceQuantity) {
      return res.status(400).json({ success: false, error: 'Not enough birds to relocate' });
    }

    // If the quantity being moved equals the available quantity, update the existing batch's farm section
    if (quantity === totalSourceQuantity) {
      // Update the farm section of the existing batch
      sourceBatch.farmHouseLocation = toFarmSection;
      await sourceBatch.save();
    } else {
      // Create a new batch with the quantity being moved
      const newBatchDetails = [];
      let quantityToMove = quantity;

      for (let bird of sourceBatch.batchDetails) {
        if (quantityToMove <= 0) {
          break;
        }

        const quantityInBatch = bird.quantity;
        const quantityToCreate = Math.min(quantityToMove, quantityInBatch);

        newBatchDetails.push({
          gender: bird.gender,
          healthStatus: 'Healthy', // Default health status for new batch
          quantity: quantityToCreate,
        });

        quantityToMove -= quantityToCreate;
      }

      // Create a new BirdBatches entry (newBatch) with the specified details
      const newBatch = new BirdBatches({
        type: sourceBatch.type,
        breed: sourceBatch.breed,
        batchNumber: sourceBatch.batchNumber, // Keeping the same batch number
        batchDetails: newBatchDetails,
        farmHouseLocation: toFarmSection,
        recordedBy: relocationBy,
        birthDate: sourceBatch.birthDate, // Assuming birth date is the same for the new batch
      });

      // Save the new batch to the database
      await newBatch.save();

      // Update the quantity of birds in the existing batch
      for (let newBird of newBatchDetails) {
        const originalBird = sourceBatch.batchDetails.find(bird => bird.gender === newBird.gender);
        originalBird.quantity -= newBird.quantity;
      }

      // Remove birds with quantity 0 from sourceBatch
      sourceBatch.batchDetails = sourceBatch.batchDetails.filter(bird => bird.quantity > 0);

      // Save the updated source batch to the database
      await sourceBatch.save();
    }

    // Create a new BirdRelocation instance
    const relocation = new BirdRelocation({
      type: sourceBatch.type,
      batchNumber,
      fromFarmSection,
      toFarmSection,
      quantity,
      relocationBy,
      relocationReason,
    });

    // Save the relocation data to the database
    await relocation.save();

    // Respond with success message
    res.status(200).json({ success: true, message: 'Batch relocated successfully' });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};





// Controller function to read all bird relocation records
export const getAllBirdRelocations = async (req, res) => {
  try {
    const relocations = await BirdRelocation.find();
    res.status(200).json(relocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Controller function to read a single bird relocation record by ID
export const getBirdRelocationById = async (req, res) => {
  const { id } = req.params;

  try {
    const relocation = await BirdRelocation.findById(id);
    if (!relocation) {
      return res.status(404).json({ message: 'Bird relocation record not found' });
    }
    res.status(200).json(relocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Controller function to update a bird relocation record by ID
export const updateBirdRelocation = async (req, res) => {
  const { id } = req.params;
  const {
    type,
    batchNumber,
    fromFarmSection,
    toFarmSection,
    quantity,
    relocationBy,
    relocationReason,
    relocationDate,
  } = req.body;

  try {
    const updatedRelocation = await BirdRelocation.findByIdAndUpdate(
      id,
      {
        type,
        batchNumber,
        fromFarmSection,
        toFarmSection,
        quantity,
        relocationBy,
        relocationReason,
        relocationDate,
      },
      { new: true }
    );

    if (!updatedRelocation) {
      return res.status(404).json({ message: 'Bird relocation record not found' });
    }

    res.status(200).json(updatedRelocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller function to delete a bird relocation record by ID
export const deleteBirdRelocation = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRelocation = await BirdRelocation.findByIdAndDelete(id);
    if (!deletedRelocation) {
      return res.status(404).json({ message: 'Bird relocation record not found' });
    }
    res.status(200).json({ message: 'Bird relocation record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
