import express from 'express';
import { createCashCrop, getAllCashCrops, getCashCropById, updateCashCropById, deleteCashCropById, createCashCropBatch, getAllCashCropBatches, getCashCropBatchById, updateCashCropBatchById, deleteCashCropBatchById, createCashCropLandPreparation, getAllCashCropLandPreparations, getCashCropLandPreparationById, updateCashCropLandPreparationById, deleteCashCropLandPreparationById,   getCashCropBatchesByType, createCashCropPlanting, getAllCashCropPlantings, getCashCropPlantingById, updateCashCropPlanting, deleteCashCropPlanting, createCashCropManualWeeding, getCashCropManualWeedings, getCashCropManualWeedingById, updateCashCropManualWeeding, deleteCashCropManualWeeding, createCashCropWeedicideApplication, getAllCashCropWeedicideApplications, getCashCropWeedicideApplicationById, updateCashCropWeedicideApplication, deleteCashCropWeedicideApplication, createCashCropPestAndDiseaseControl, getAllCashCropPestAndDiseaseControls, getCashCropPestAndDiseaseControlById, updateCashCropPestAndDiseaseControl, deleteCashCropPestAndDiseaseControl, createFertilizerApplication, getAllFertilizerApplications, getFertilizerApplicationById, updateFertilizerApplication, deleteFertilizerApplication, createCashCropHarvest, getAllCashCropHarvests, getCashCropHarvestById, updateCashCropHarvest, deleteCashCropHarvest, getMaizeBatchLandPreparations, getMaizeBatchPlantings, getMaizeBatchManualWeedings, getMaizeBatchWeedicideApplications, getMaizeBatchPestAndDiseaseControls, getMaizeBatchFertilizerApplications, getMaizeBatchHarvestRecords, fetchMaizeBatchRecords, getCassavaBatchLandPreparations, getCassavaBatchPlantings, getCassavaBatchManualWeedings, getCassavaBatchWeedicideApplications, getCassavaBatchPestAndDiseaseControls, getCassavaBatchFertilizerApplications, getCassavaBatchHarvestRecords, fetchCassavaBatchRecords, getPlantainBatchLandPreparations, getPlantainBatchPlantings, getPlantainBatchManualWeedings, getPlantainBatchWeedicideApplications, getPlantainBatchPestAndDiseaseControls, getPlantainBatchFertilizerApplications, getPlantainBatchHarvestRecords, fetchPlantainBatchRecords, createExpense, getAllExpenses, getExpenseByBatchNumber, getExpenseById, updateExpense, deleteExpense, fetchPalmBatchRecords, getFertilizerApplicationsByBatchAndCropType, getCashCropHarvestsByBatchAndCropType, getCashCropLandPreparationsByBatchAndCropType, getCashCropPlantingsByBatchAndCropType, getCashCropManualWeedingsByBatchAndType, getCashCropPestAndDiseaseControlsByTypeAndBatch, getCashCropWeedicideApplicationByTypeAndBatch } from '../controllers/cashCrops.controller.js';

const cashCropRouter = express.Router();

// Create a new cash crop
cashCropRouter.post('/add-new-cashcrop', createCashCrop);

// Get all cash crops
cashCropRouter.get('/all-cashcrops', getAllCashCrops);

// Get a cash crop by ID
cashCropRouter.get('/cashcrops/:id', getCashCropById);

// Update a cash crop by ID
cashCropRouter.put('/edit-cashcrop/:id', updateCashCropById);

// Delete a cash crop by ID
cashCropRouter.delete('delete-cashcrop/:id', deleteCashCropById);


cashCropRouter.post('/create-cashcrop-batch', createCashCropBatch);

// Get all cash crop batches
cashCropRouter.get('/get-all-batches', getAllCashCropBatches);
cashCropRouter.get('/cashcrop-batches/:type', getCashCropBatchesByType);


// Get a cash crop batch by ID
cashCropRouter.get('/get-batch-details/:id', getCashCropBatchById);

// Update a cash crop batch by ID
cashCropRouter.put('/update-batch/:id', updateCashCropBatchById);

// Delete a cash crop batch by ID
cashCropRouter.delete('/delete-batch/:id', deleteCashCropBatchById);

// LAND PREPARATIONS
// Create a new cash crop land preparation entry
cashCropRouter.post('/create-new-cashcrop-landpreparation', createCashCropLandPreparation);

// Get all cash crop land preparation entries
cashCropRouter.get('/get-all-cashcrop-landpreparations', getAllCashCropLandPreparations);
cashCropRouter.get('/maize-batch-land-preparations', getMaizeBatchLandPreparations);
cashCropRouter.get('/cassava-batch-land-preparations', getCassavaBatchLandPreparations);
cashCropRouter.get('/plantain-batch-land-preparations', getPlantainBatchLandPreparations);
cashCropRouter.get('/cash-crop-land-preparations/:batchNumber/:cropType', getCashCropLandPreparationsByBatchAndCropType);




// Get a single cash crop land preparation entry by ID
cashCropRouter.get('/get-cashcrop-landpreparation-by-id/:id', getCashCropLandPreparationById);

// Update a cash crop land preparation entry by ID
cashCropRouter.put('/update-cashcrop-landpreparation-by-id/:id', updateCashCropLandPreparationById);

// Delete a cash crop land preparation entry by ID
cashCropRouter.delete('/delete-cashcrop-landpreparation-by-id/:id', deleteCashCropLandPreparationById);

// PLANTING
// Create a new cash crop planting record
cashCropRouter.post('/add-cash-crop-plantings', createCashCropPlanting);

// Get all cash crop planting records
cashCropRouter.get('/all-cash-crop-plantings', getAllCashCropPlantings);

cashCropRouter.get('/cash-crop-planting/:batchNumber/:cropType', getCashCropPlantingsByBatchAndCropType);


// Get a single cash crop planting record by ID
cashCropRouter.get('/cash-crop-plantings/:id', getCashCropPlantingById);

// Update a cash crop planting record by ID
cashCropRouter.put('/edit-cash-crop-plantings/:id', updateCashCropPlanting);

// Delete a cash crop planting record by ID
cashCropRouter.delete('/delete-cash-crop-plantings/:id', deleteCashCropPlanting);

cashCropRouter.get('/maize-batch-planting', getMaizeBatchPlantings );
cashCropRouter.get('/cassava-batch-planting', getCassavaBatchPlantings );
cashCropRouter.get('/plantain-batch-planting',getPlantainBatchPlantings );


// MANUAL WEEDING
// Route to create a new cash crop manual weeding record
cashCropRouter.post('/add-cash-crop-manual-weeding', createCashCropManualWeeding);

// Route to get all cash crop manual weeding records
cashCropRouter.get('/cash-crop-manual-weeding', getCashCropManualWeedings);
cashCropRouter.get('/cash-crop-manual-weeding/:batchNumber/:cropType', getCashCropManualWeedingsByBatchAndType);


// Route to get a single cash crop manual weeding record by ID
cashCropRouter.get('/cash-crop-manual-weeding/:id', getCashCropManualWeedingById);

// Route to update a cash crop manual weeding record
cashCropRouter.put('/cash-crop-manual-weeding/:id', updateCashCropManualWeeding);

// Route to delete a cash crop manual weeding record
cashCropRouter.delete('/cash-crop-manual-weeding/:id', deleteCashCropManualWeeding);
cashCropRouter.get('/maize-batch-manual-weeding', getMaizeBatchManualWeedings );
cashCropRouter.get('/cassava-batch-manual-weeding', getCassavaBatchManualWeedings );
cashCropRouter.get('/plantain-batch-manual-weeding', getPlantainBatchManualWeedings );



// WEEDICIDE APPLICATION
// Route to create a new cash crop weedicide application record
cashCropRouter.post('/add-cash-crop-weedicide-applications', createCashCropWeedicideApplication);

// Route to get all cash crop weedicide application records
cashCropRouter.get('/cash-crop-weedicide-applications', getAllCashCropWeedicideApplications);
cashCropRouter.get('/cash-crop-weedicide-applications/:batchNumber/:cropType', getCashCropWeedicideApplicationByTypeAndBatch);

// Route to get a single cash crop weedicide application record by ID
cashCropRouter.get('/cash-crop-weedicide-applications/:id', getCashCropWeedicideApplicationById);

// Route to update a cash crop weedicide application record
cashCropRouter.put('/cash-crop-weedicide-applications/:id', updateCashCropWeedicideApplication);

// Route to delete a cash crop weedicide application record
cashCropRouter.delete('/cash-crop-weedicide-applications/:id', deleteCashCropWeedicideApplication);
cashCropRouter.get('/maize-batch-weedicide-applications', getMaizeBatchWeedicideApplications );
cashCropRouter.get('/cassava-batch-weedicide-applications', getCassavaBatchWeedicideApplications );
cashCropRouter.get('/plantain-batch-weedicide-applications', getPlantainBatchWeedicideApplications );



// Route to create a new cash crop pest and disease control record
cashCropRouter.post('/pest-disease-control', createCashCropPestAndDiseaseControl);

// Route to get all cash crop pest and disease control records
cashCropRouter.get('/pest-disease-control', getAllCashCropPestAndDiseaseControls);
cashCropRouter.get('/cashcrop-pest-disease-controls/:type/:batchNumber', getCashCropPestAndDiseaseControlsByTypeAndBatch);

// Route to get a single cash crop pest and disease control record by ID
cashCropRouter.get('/pest-disease-control/:id', getCashCropPestAndDiseaseControlById);

// Route to update a cash crop pest and disease control record by ID
cashCropRouter.put('/pest-disease-control/:id', updateCashCropPestAndDiseaseControl);

// Route to delete a cash crop pest and disease control record by ID
cashCropRouter.delete('/pest-disease-control/:id', deleteCashCropPestAndDiseaseControl);
cashCropRouter.get('/maize-batch-pest-disease-controls', getMaizeBatchPestAndDiseaseControls );
cashCropRouter.get('/cassava-batch-pest-disease-controls',  getCassavaBatchPestAndDiseaseControls );
cashCropRouter.get('/plantain-batch-pest-disease-controls',   getPlantainBatchPestAndDiseaseControls );


cashCropRouter.post('/add-fertilizer-application', createFertilizerApplication);
cashCropRouter.get('/all-fertilizer-applications', getAllFertilizerApplications);
cashCropRouter.get('/fertilizer-application/:id', getFertilizerApplicationById);
cashCropRouter.put('/update-fertilizer-application/:id', updateFertilizerApplication);
cashCropRouter.delete('/delete-fertilizer-application/:id', deleteFertilizerApplication);
cashCropRouter.get('/maize-batch-fertilizer-application-report', getMaizeBatchFertilizerApplications);
cashCropRouter.get('/maize-batch-fertilizer-application-report', getMaizeBatchFertilizerApplications);
cashCropRouter.get('/cassava-batch-fertilizer-application-report', getCassavaBatchFertilizerApplications);
cashCropRouter.get('/plantain-batch-fertilizer-application-report', getPlantainBatchFertilizerApplications);
cashCropRouter.get('/fertilizer/:batchNumber/:type', getFertilizerApplicationsByBatchAndCropType);


// Create a new cash crop harvest
cashCropRouter.post('/add-new-harvest', createCashCropHarvest);

// Get all cash crop harvests
cashCropRouter.get('/all-harvests', getAllCashCropHarvests);
cashCropRouter.get('/cash-crop-harvests/:batchNumber/:cropType', getCashCropHarvestsByBatchAndCropType);

// Get a single cash crop harvest by ID
cashCropRouter.get('/harvest/:id', getCashCropHarvestById);

// Update a cash crop harvest by ID
cashCropRouter.put('/update-harvest/:id', updateCashCropHarvest);

// Delete a cash crop harvest by ID
cashCropRouter.delete('/delete-harvest/:id', deleteCashCropHarvest);

cashCropRouter.get('/maize-batch-harvest-records', getMaizeBatchHarvestRecords);
cashCropRouter.get('/cassava-batch-harvest-records', getCassavaBatchHarvestRecords);
cashCropRouter.get('/plantain-batch-harvest-records',getPlantainBatchHarvestRecords);

cashCropRouter.get('/all-maize-batch-farm-activities-records/:batchNumber', async (req, res) => {
  const { batchNumber } = req.params;

  try {
    const records = await fetchMaizeBatchRecords(batchNumber);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cashCropRouter.get('/all-cassava-batch-farm-activities-records/:batchNumber', async (req, res) => {
  const { batchNumber } = req.params;

  try {
    const records = await fetchCassavaBatchRecords(batchNumber);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  

cashCropRouter.get('/all-plantain-batch-farm-activities-records/:batchNumber', async (req, res) => {
  const { batchNumber } = req.params;

  try {
    const records = await fetchPlantainBatchRecords(batchNumber);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

cashCropRouter.get('/all-palm-batch-farm-activities-records/:batchNumber', async (req, res) => {
  const { batchNumber } = req.params;

  try {
    const records = await fetchPalmBatchRecords(batchNumber);
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
  

// FINANCE
// Route to create a new expense
cashCropRouter.post('/add-cashcrop-expense', createExpense);

// Route to get all expenses
cashCropRouter.get('/all-cashcrop-expenses', getAllExpenses);

// Route to get a single expense record by batchNumber
cashCropRouter.get('/cashcrop-expense-batch/:batchNumber', getExpenseByBatchNumber);

// Route to get a single expense by ID
cashCropRouter.get('/cashcrop-expense/:id', getExpenseById);

// Route to update an expense by ID
cashCropRouter.put('/update-cashcrop-expense/:id', updateExpense);

// Route to delete an expense by ID
cashCropRouter.delete('/delete-cashcrop-expense/:id', deleteExpense);

export default cashCropRouter;
