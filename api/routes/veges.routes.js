import express from 'express';
import {
  createVegetable,
  getAllVegetables,
  getVegetableById,
  updateVegetableById,
  deleteVegetableById,
  createBatch,
  getAllBatches,
  updateBatch,
  deleteBatch,
  createVegeNursing,
  getAllVegeNursings,
  updateVegeNursingById,
  deleteVegeNursingById,
  viewBatchesByType,
  createVegeTransplanting,
  getAllVegeTransplantings,
  getVegeTransplantingById,
  updateVegeTransplantingById,
  deleteVegeTransplantingById,
  createVegeDirectPlanting,
  getAllVegeDirectPlantings,
  getVegeDirectPlantingById,
  updateVegeDirectPlantingById,
  deleteVegeDirectPlantingById,
  createFertilizerApplication,
  getAllFertilizerApplications,
  getFertilizerApplicationById,
  updateFertilizerApplicationById,
  deleteFertilizerApplicationById,
  createOtherActivity,
  getAllOtherActivities,
  getOtherActivityById,
  updateOtherActivity,
  deleteOtherActivity,
  createHarvestingRecord,
  getAllHarvestingRecords,
  getHarvestingRecordById,
  updateHarvestingRecord,
  deleteHarvestingRecord,
  getVegeNursingByBatchNumber,
  getAllCabbageNursings,
  createExpense,
  getAllExpenses,
  getExpenseById,
  updateExpense,
  deleteExpense,
  getCabbageExpenseByBatchNumber,
  getAllCabbageExpenses,
  getAllCabbageTransplanting,
  getCabbageDirectPlantingByBatchNumber,
  getAllCabbageDirectPlanting,
  getAllCabbageFertilizerApplications,
  createVegetableSales,
  getAllVegetableSales,
  getVegetableSalesById,
  updateVegetableSales,
  deleteVegetableSales,
  calculateVegeProfitOrLoss,
  calculateCabbageProfitOrLoss,
  fetchCabbageBatchRecords,
  getAllSpringOnionsNursings,
  getAllSpringOnionsTransplanting,
  getAllSpringOnionDirectPlanting,
  getAllSpringOnionFertilizerApplications,
  createPestAndWeedControl,
  getAllPestAndWeedControl,
  getPestAndWeedControlById,
  updatePestAndWeedControlById,
  deletePestAndWeedControlById,
  getVegePestAndWeedControlByBatchNumber,
  getAllSpringOnionPestAndWeedControls,
  getAllCabbagePestAndWeedControls,
  getOtherActivitiesByBatchNumber,
  getHarvestingRecordByBatchNumber,
  getSpringOnionsOtherActivitiesByBatchNumber,
  getSpringOnionsHarvestingRecordByBatchNumber,
  calculateSpringOnionProfitOrLoss,
  getBatchesByType,
  getAllGreenPepperNursings,
  getVegeTransplantingByBatchNumber,
  getAllGreenPepperTransplanting,
  getAllGreenPepperDirectPlanting,
  getAllGreenPepperFertilizerApplications,
  getAllGreenPepperPestAndWeedControls,
  getAllGreenPepperOtherActivities,
  getAllSpringOnionOtherActivities,
  fetchGreenPepperBatchRecords,
  getVegeExpenseByBatchNumber,
  getVegeIncomeByBatchNumber,
  calculateGreenPepperProfitOrLoss,
  getAllCarrotNursings,
  getAllCarrotTransplanting,
  getAllCarrotDirectPlanting,
  getAllCarrotFertilizerApplications,
  getAllCarrotPestAndWeedControls,
  getAllCarrotOtherActivities,
  fetchCarrotBatchRecords,
  getAllCarrotExpenses,
  calculateCarrotProfitOrLoss,
  getVegeFertilizerByBatchNumber,
  fetchPepperBatchRecords,
 

} from '../controllers/vegetable.controller.js';

const vegeRouter = express.Router();

// Create a new vegetable
vegeRouter.post('/add-new-vegetable', createVegetable);

// Get all vegetables
vegeRouter.get('/all-vegetables', getAllVegetables);

vegeRouter.get('/batches/:type', getBatchesByType);

// Get a single vegetable by ID
vegeRouter.get('/vegetable/:id', getVegetableById);

// Update a vegetable by ID
vegeRouter.put('/edit-vegetable/:id', updateVegetableById);

// Delete a vegetable by ID
vegeRouter.delete('/delete-vegetable/:id', deleteVegetableById);


// Create a new batch
vegeRouter.post('/create-vegetable-batch', createBatch);

// Get all batches
vegeRouter.get('/all-batches', getAllBatches);

vegeRouter.get('/all-batches/:type', viewBatchesByType);

// Update a batch
vegeRouter.put('/batches/:id', updateBatch);

// Delete a batch
vegeRouter.delete('/batches/:id', deleteBatch);



// Create a new vegetable nursing record
vegeRouter.post('/create-vege-nursing', createVegeNursing);

// Get all vegetable nursing records
vegeRouter.get('/all-vege-nursings', getAllVegeNursings);
vegeRouter.get('/cabbage-nursing-records', getAllCabbageNursings);
vegeRouter.get('/spring-onions-nursing-records', getAllSpringOnionsNursings);
vegeRouter.get('/green-pepper-nursing-records', getAllGreenPepperNursings);
vegeRouter.get('/carrot-nursing-records', getAllCarrotNursings);

// Get a single vegetable nursing record by ID
vegeRouter.get('/nursery-records/:batchNumber', getVegeNursingByBatchNumber);

// Update a vegetable nursing record by ID
vegeRouter.put('/vege-nursing-records/:id', updateVegeNursingById);

// Delete a vegetable nursing record by ID
vegeRouter.delete('/vege-nursing-records/:id', deleteVegeNursingById);


// Create a new vegeTransplanting record
vegeRouter.post('/create-vege-transplanting', createVegeTransplanting);

// Get all vegeTransplanting records
vegeRouter.get('/all-vege-transplantings', getAllVegeTransplantings);
vegeRouter.get('/vege-transplanting/:batchNumber', getVegeTransplantingByBatchNumber);
vegeRouter.get('/all-cabbage-transplanting-records', getAllCabbageTransplanting );
vegeRouter.get('/all-spring-onions-transplanting-records', getAllSpringOnionsTransplanting);
vegeRouter.get('/all-green-pepper-transplanting-records', getAllGreenPepperTransplanting);
vegeRouter.get('/all-carrot-transplanting-records', getAllCarrotTransplanting);


// Get a single vegeTransplanting record by ID
vegeRouter.get('/vege-transplanting/:id', getVegeTransplantingById);

// Update a vegeTransplanting record by ID
vegeRouter.put('/update-vege-transplanting/:id', updateVegeTransplantingById);

// Delete a vegeTransplanting record by ID
vegeRouter.delete('/delete-vege-transplanting/:id', deleteVegeTransplantingById);


// Routes for direct planting records
vegeRouter.post('/create-vege-direct-planting', createVegeDirectPlanting); // Create a new direct planting record
vegeRouter.get('/all-vege-direct-plantings', getAllVegeDirectPlantings); // Get all direct planting records
vegeRouter.get('/cabbage-direct-planting/:batchNumber', getCabbageDirectPlantingByBatchNumber);
vegeRouter.get('/cabbage-direct-planting-records', getAllCabbageDirectPlanting);
vegeRouter.get('/spring-onions-direct-planting-records', getAllSpringOnionDirectPlanting);
vegeRouter.get('/all-green-pepper-direct-planting-records', getAllGreenPepperDirectPlanting);
vegeRouter.get('/all-carrot-direct-planting-records', getAllCarrotDirectPlanting);

vegeRouter.get('/vege-direct-plantings/:id', getVegeDirectPlantingById); // Get a direct planting record by ID
vegeRouter.put('/vege-direct-plantings/:id', updateVegeDirectPlantingById); // Update a direct planting record by ID
vegeRouter.delete('/vege-direct-plantings/:id', deleteVegeDirectPlantingById); // Delete a direct planting record by ID

// Create a new fertilizer application record
vegeRouter.post('/add-fertilizer-applications', createFertilizerApplication);

// Get all fertilizer application records
vegeRouter.get('/all-veges-fertilizer-applications', getAllFertilizerApplications);

vegeRouter.get('/vege-fertilizer-applicaion/:batchNumber', getVegeFertilizerByBatchNumber);
// Get a single fertilizer application record by ID
vegeRouter.get('/fertilizer-applications/:id', getFertilizerApplicationById);

// Update a fertilizer application record by ID
vegeRouter.put('/vege-fertilizer-applications/:id', updateFertilizerApplicationById);

// Delete a fertilizer application record by ID
vegeRouter.delete('/vege-fertilizer-applications/:id', deleteFertilizerApplicationById);
vegeRouter.get('/cabbage-fertilizer-appication-records', getAllCabbageFertilizerApplications);
vegeRouter.get('/spring-onions-fertilizer-appication-records', getAllSpringOnionFertilizerApplications);
vegeRouter.get('/all-green-pepper-fertilizer-appication-records', getAllGreenPepperFertilizerApplications);
vegeRouter.get('/all-carrot-fertilizer-appication-records', getAllCarrotFertilizerApplications);


// Create a new pest control record
vegeRouter.post('/add-pest-and-weed-control', createPestAndWeedControl);

// Get all pest control records
vegeRouter.get('/all-vege-pest-and-weed-control', getAllPestAndWeedControl);
vegeRouter.get('/vege-pest-and-weed-control/:batchNumber',  getVegePestAndWeedControlByBatchNumber);

// Get a single pest control record by ID
vegeRouter.get('/pest-and-weed-control/:id', getPestAndWeedControlById);

// Update a pest control record by ID
vegeRouter.put('/pest-and-weed-control/:id', updatePestAndWeedControlById);

// Delete a pest control record by ID
vegeRouter.delete('/pest-and-weed-control/:id', deletePestAndWeedControlById);
vegeRouter.get('/all-spring-onions-pest-and-weed-records', getAllSpringOnionPestAndWeedControls);
vegeRouter.get('/all-cabbage-pest-and-weed-records', getAllCabbagePestAndWeedControls);
vegeRouter.get('/all-green-pepper-pest-and-weed-records', getAllGreenPepperPestAndWeedControls);
vegeRouter.get('/all-carrot-pest-and-weed-records', getAllCarrotPestAndWeedControls);


// Route to create a new other activity record
vegeRouter.post('/add-other-activities', createOtherActivity);

// Route to get all other activity records
vegeRouter.get('/other-activities', getAllOtherActivities);

vegeRouter.get('/vege-other-activities-records/:batchNumber',  getOtherActivitiesByBatchNumber);
vegeRouter.get('/spring-onions-other-activities-records/:batchNumber',  getSpringOnionsOtherActivitiesByBatchNumber);
vegeRouter.get('/all-green-pepper-other-activities-records',getAllGreenPepperOtherActivities);
vegeRouter.get('/all-spring-onions-other-activities-records',getAllSpringOnionOtherActivities);
vegeRouter.get('/all-carrot-other-activities-records',getAllCarrotOtherActivities);

// Route to get a single other activity record by ID
vegeRouter.get('/other-activities/:id', getOtherActivityById);

// Route to update a other activity record
vegeRouter.put('/vege-other-activities-records/:id', updateOtherActivity);

// Route to delete a other activity record
vegeRouter.delete('/vege-other-activities-records/:id', deleteOtherActivity);



// Create a new harvesting record
vegeRouter.post('/add-harvesting', createHarvestingRecord);

// Get all harvesting records
vegeRouter.get('/harvesting', getAllHarvestingRecords);

vegeRouter.get('/harvesting-records/:batchNumber',  getHarvestingRecordByBatchNumber);
vegeRouter.get('/vege-harvesting-records/:batchNumber',  getSpringOnionsHarvestingRecordByBatchNumber);

// Get a single harvesting record by ID
vegeRouter.get('/harvesting-records/:id', getHarvestingRecordById);

// Update a harvesting record
vegeRouter.put('/harvesting-records/:id', updateHarvestingRecord);

// Delete a harvesting record
vegeRouter.delete('/harvesting-records/:id', deleteHarvestingRecord);


vegeRouter.get('/calculate-green-pepper-profit-loss', async (req, res) => {
  const { batchNumber } = req.query;

  if (!batchNumber) {
    return res.status(400).json({ error: 'Batch number is required.' });
  }

  try {
    const result = await calculateGreenPepperProfitOrLoss(batchNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


vegeRouter.get('/cabbage-batch-farm-activities-records/:batchNumber', async (req, res) => {
  const { batchNumber } = req.params;
  try {
    const records = await fetchCabbageBatchRecords(batchNumber);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

vegeRouter.get('/green-pepper-batch-farm-activities-records/:batchNumber', async (req, res) => {
  const { batchNumber } = req.params;
  try {
    const records = await fetchGreenPepperBatchRecords(batchNumber);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

vegeRouter.get('/carrot-batch-farm-activities-records/:batchNumber', async (req, res) => {
  const { batchNumber } = req.params;
  try {
    const records = await fetchCarrotBatchRecords(batchNumber);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

vegeRouter.get('/pepper-batch-farm-activities-records/:batchNumber', async (req, res) => {
  const { batchNumber } = req.params;
  try {
    const records = await fetchPepperBatchRecords(batchNumber);
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




// FINANCE
vegeRouter.post('/add-vege-expenses', createExpense); // Create a new expense
vegeRouter.get('/all-vege-expenses', getAllExpenses); // Get all expenses
vegeRouter.get('/cabbage-expense-records/:batchNumber', getCabbageExpenseByBatchNumber); // Get all expenses
vegeRouter.get('/vege-expense-records/:batchNumber', getVegeExpenseByBatchNumber); // Get all expenses
vegeRouter.get('/expenses/:id', getExpenseById); // Get an expense by ID
vegeRouter.put('/update-expense-record/:id', updateExpense); // Update an expense by ID
vegeRouter.delete('/delete-expense-record/:id', deleteExpense); // Delete an expense by ID
vegeRouter.get('/cabbage-expense-records', getAllCabbageExpenses);
vegeRouter.get('/all-carrot-expense-records', getAllCarrotExpenses);


// Route to create a new vegetable sales record
vegeRouter.post('/add-vegetable-sales', createVegetableSales);

// Route to get all vegetable sales records
vegeRouter.get('/all-vegetable-sales', getAllVegetableSales);

vegeRouter.get('/vege-income-records/:batchNumber', getVegeIncomeByBatchNumber);

// Route to get a single vegetable sales record by ID
vegeRouter.get('/vegetable-sales/:id', getVegetableSalesById);

// Route to update a vegetable sales record
vegeRouter.put('/edit-vegetable-sales/:id', updateVegetableSales);

// Route to delete a vegetable sales record
vegeRouter.delete('/delete-vegetable-sales/:id', deleteVegetableSales);
vegeRouter.get('/profit-loss', async (req, res) => {
  const { batchNumber, vegetableType } = req.query;

  try {
    const result = await calculateVegeProfitOrLoss(batchNumber, vegetableType);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


vegeRouter.get('/calculate-cabbage-profit-loss', async (req, res) => {
  const { batchNumber } = req.query;

  if (!batchNumber) {
    return res.status(400).json({ error: 'Batch number is required.' });
  }

  try {
    const result = await calculateCabbageProfitOrLoss(batchNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

vegeRouter.get('/calculate-spring-onion-profit-loss', async (req, res) => {
  const { batchNumber } = req.query;

  if (!batchNumber) {
    return res.status(400).json({ error: 'Batch number is required.' });
  }

  try {
    const result = await calculateSpringOnionProfitOrLoss(batchNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


vegeRouter.get('/calculate-carrot-profit-loss', async (req, res) => {
  const { batchNumber } = req.query;

  if (!batchNumber) {
    return res.status(400).json({ error: 'Batch number is required.' });
  }

  try {
    const result = await calculateCarrotProfitOrLoss(batchNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default vegeRouter;
