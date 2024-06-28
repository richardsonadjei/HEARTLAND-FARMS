import express from 'express';
import { createBird, deleteBird, getBirdById, getBirds, updateBird,createBirdBatch,
    getBirdBatches,
    getBirdBatchById,
    updateBirdBatch,
    deleteBirdBatch, 
    createBirdBreed,
    getAllBirdBreeds,
    getBirdBreedById,
    updateBirdBreed,
    deleteBirdBreed,
    viewBirdRecordsByType,
    createBirdExpenseCategory,
    getBirdExpenseCategories,
    getBirdExpenseCategoryById,
    updateBirdExpenseCategory,
    deleteBirdExpenseCategory,
    createBirdFarmExpense,
    getAllBirdFarmExpenses,
    getBirdFarmExpenseById,
    updateBirdFarmExpense,
    deleteBirdFarmExpense,
    addBirdsToBatch,
    editBatchAdditionsRecord,
    deleteBatchAdditionsRecord,
    createVaccinationChart,
    getAVaccinationChart,
    getVaccinationChartById,
    updateVaccinationChart,
    deleteVaccinationChart,
    createMedicationCategory,
    getAllMedicationCategories,
    getMedicationCategoryById,
    updateMedicationCategory,
    deleteMedicationCategory,
    createBirdDrug,
    getAllBirdDrugs,
    getBirdDrugById,
    updateBirdDrug,
    deleteBirdDrug,
    createBirdVaccinationRecord,
    getAllBirdVaccinationRecords,
    getBirdVaccinationRecordById,
    updateBirdVaccinationRecordById,
    deleteBirdVaccinationRecordById,
    createBirdMortalityRecord,
    getAllBirdMortalityRecords,
    getBirdMortalityRecordById,
    updateBirdMortalityRecordById,
    deleteBirdMortalityRecordById,
    getBirdMortalityReportByType,
    createBirdFarmSection,
    getBirdFarmSections,
    getBirdFarmSectionById,
    updateBirdFarmSection,
    deleteBirdFarmSection,
    createBirdEggsCollected,
    getBirdEggsCollected,
    getBirdEggsCollectedById,
    updateBirdEggsCollected,
    deleteBirdEggsCollected,
    getSortedEggsStockByType,
    getUnsortedEggsStockByType,
    getExpensesByType,
    getExpensesByTypeAndPeriod,
    createBirdSale,
    getBirdSales,
    getBirdSaleById,
    updateBirdSaleById,
    deleteBirdSaleById,
    getBirdSalesByType,
    getSalesRecordsByBatchAndType,
    getBatchesByType,
    getBirdVaccinationRecordsByType,
    getBirdVaccinationRecordsByTypeAndBatchNumber,
    createBirdDewormingRecord,
    getAllBirdDewormingRecords,
    getBirdDewormingRecordsByType,
    getBirdDewormingRecordsByTypeAndBatch,
    updateBirdDewormingRecord,
    deleteBirdDewormingRecord,
    getEggsCollectedToday,
    deleteFeedName,
    updateFeedName,
    getFeedNameById,
    getFeedNames,
    createFeedName,
    createBirdFeedPurchase,
    getAllBirdFeedPurchases,
    getBirdFeedPurchaseById,
    updateBirdFeedPurchase,
    deleteBirdFeedPurchase,
    createBirdFeedStock,
    getAllBirdFeedStocks,
    updateBirdFeedStock,
    deleteBirdFeedStock,
    getFeedPurchasesWithinPeriod,
    createBirdFeedIssuance,
    getAllBirdFeedIssuances,
    getBirdFeedIssuanceById,
    updateBirdFeedIssuance,
    deleteBirdFeedIssuance,
    getBirdFeedIssuancesWithinPeriod,
    createBirdHealthDiagnosis,
    getAllBirdHealthDiagnoses,
    getBirdHealthDiagnosisById,
    deleteBirdHealthDiagnosis,
    updateBirdHealthDiagnosis,
    getExpensesByTypeAndBatchNumber,
    createBirdEggSale,
    getBirdEggSales,
    updateBirdEggSale,
    deleteBirdEggSale,
    getSortedBirdEggsStock,
    getUnsortedBirdEggsStock,
    getAllBatches,
    getBatch,
    updateBatch,
    deleteBatch,
    loadEggBatch,
    registerIncubator,
    getAllIncubators,
    getIncubatorById,
    updateIncubator,
    deleteIncubator,
    getAllActiveEggBatches,
    createHatchedEggs,
    getAllHatchedEggs,
    getHatchedEggsById,
    updateHatchedEggs,
    deleteHatchedEggs,
    getHatchedEggsByDateRange,
    getHatchedEggsByTypeAndPeriod,
    getEggsCollectedTodayByType,
    getRecordsByTypeAndBatchNumber,
    getAllBirdRelocations,
    getBirdRelocationById,
    updateBirdRelocation,
    deleteBirdRelocation,
    relocateBirds,
    getBatchByBatchNumber,
    getPoultryUnsortedEggsCollectedToday,
    getPoultrySortedEggsCollectedToday,
    getAllEggsStock,
    getBirdSalesSummary,
    getTotalExpensesByCategory,
    getBirdsByAgeCategoryByType,
    getBirdsSummaryByLocationAndType,
    getEggsStockByType,

    
    
   } from '../controllers/bird.controller.js';



const birdRouter = express.Router();

birdRouter.post('/add-new-birds', createBird);
birdRouter.get('/all-birds-types', getBirds);
birdRouter.get('/birds/:id', getBirdById);
birdRouter.put('/birds/:id', updateBird);
birdRouter.delete('/birds/:id', deleteBird);


// Create a new bird farm section
birdRouter.post('/bird-farm-sections', createBirdFarmSection);

// Get all bird farm sections
birdRouter.get('/all-bird-farm-sections', getBirdFarmSections);

// Get a bird farm section by ID
birdRouter.get('/bird-farm-sections/:id', getBirdFarmSectionById);

// Update a bird farm section
birdRouter.put('/bird-farm-sections/:id', updateBirdFarmSection);

// Delete a bird farm section
birdRouter.delete('/bird-farm-sections/:id', deleteBirdFarmSection);

// Create a new breed
birdRouter.post('/breeds', createBirdBreed);

// Get all breeds
birdRouter.get('/breeds', getAllBirdBreeds);

// Get a single breed by ID
birdRouter.get('/breeds/:id', getBirdBreedById);

// Update a breed by ID
birdRouter.put('/breeds/:id', updateBirdBreed);

// Delete a breed by ID
birdRouter.delete('/breeds/:id', deleteBirdBreed);



// Create a new bird batch
birdRouter.post('/birdBatches', createBirdBatch);

// Get all bird batches
birdRouter.get('/all-bird-Batches', getBirdBatches);

// Get a single bird batch by ID
birdRouter.get('/birdBatches/:id', getBirdBatchById);
birdRouter.get('/birdBatches/:batchNumber', getBatchByBatchNumber);

// Update a bird batch by ID
birdRouter.put('/birdBatches/:id', updateBirdBatch);

// Delete a bird batch by ID
birdRouter.delete('/birdBatches/:id', deleteBirdBatch);

birdRouter.get('/bird-Batches/:birdType', viewBirdRecordsByType);


/// Route to create a new BirdExpenseCategory
birdRouter.post('/add-bird-expense-category', createBirdExpenseCategory);

// Route to get all BirdExpenseCategories
birdRouter.get('/get-all-bird-expense-categories', getBirdExpenseCategories);

// Route to get a single BirdExpenseCategory by ID
birdRouter.get('/get-bird-expense-category/:id', getBirdExpenseCategoryById);

// Route to update a BirdExpenseCategory by ID
birdRouter.put('/update-bird-expense-category/:id', updateBirdExpenseCategory);

// Route to delete a BirdExpenseCategory by ID
birdRouter.delete('/delete-bird-expense-category/:id', deleteBirdExpenseCategory);

// Create a new BirdFarmExpense
birdRouter.post('/add-bird-expenses', createBirdFarmExpense);

// Get all BirdFarmExpenses
birdRouter.get('/all-bird-expenses', getAllBirdFarmExpenses);

birdRouter.get('/all-bird-expenses/:type/:batchNumber', getExpensesByTypeAndBatchNumber);

// Get a single BirdFarmExpense by ID
birdRouter.get('/bird-expenses/:id', getBirdFarmExpenseById);

// Update a BirdFarmExpense by ID
birdRouter.put('/bird-expenses/:id', updateBirdFarmExpense);

// Delete a BirdFarmExpense by ID
birdRouter.delete('/bird-expenses/:id', deleteBirdFarmExpense);

// ADD BIRDS TO AN EXISTING BATCH

birdRouter.post('/bird-batches/:batchNumber/add-birds', addBirdsToBatch);
birdRouter.get('/all-bird-type-batches', getBatchesByType);


// BIRD ADDITIONS ROUTE
// Route to get all records
birdRouter.get('/records/:type/:batchNumber', getRecordsByTypeAndBatchNumber);

// Route to edit a record
birdRouter.put('/bird-addtions-records/:id', editBatchAdditionsRecord);

// Route to delete a record
birdRouter.delete('/bird-addtions-records-records/:id', deleteBatchAdditionsRecord);

birdRouter.post('/vaccination-chart', createVaccinationChart);
birdRouter.get('/all-vaccination-chart', getAVaccinationChart);
birdRouter.get('/vaccination-chart/:id', getVaccinationChartById);
birdRouter.put('/vaccination-chart/:id', updateVaccinationChart);
birdRouter.delete('/vaccination-chart/:id', deleteVaccinationChart);

birdRouter.post('/medication-categories', createMedicationCategory);
birdRouter.get('/medication-categories', getAllMedicationCategories);
birdRouter.get('/medication-categories/:id', getMedicationCategoryById);
birdRouter.put('/medication-categories/:id', updateMedicationCategory);
birdRouter.delete('/medication-categories/:id', deleteMedicationCategory);

birdRouter.post('/bird-drugs', createBirdDrug);
birdRouter.get('/bird-drugs', getAllBirdDrugs);
birdRouter.get('/bird-drugs/:id', getBirdDrugById);
birdRouter.put('/bird-drugs/:id', updateBirdDrug);
birdRouter.delete('/bird-drugs/:id', deleteBirdDrug);


birdRouter.post('/bird-vaccination', createBirdVaccinationRecord);
birdRouter.get('/bird-vaccination', getAllBirdVaccinationRecords);
birdRouter.get('/bird-vaccination/:id', getBirdVaccinationRecordById);
birdRouter.put('/bird-vaccination/:id', updateBirdVaccinationRecordById);
birdRouter.delete('/bird-vaccination/:id', deleteBirdVaccinationRecordById);
birdRouter.get('/all-bird-type-vaccinations', getBirdVaccinationRecordsByType);
birdRouter.get('/bird-batch-vaccination-records', getBirdVaccinationRecordsByTypeAndBatchNumber);


birdRouter.post('/bird-mortality', createBirdMortalityRecord);

// Route to retrieve all bird mortality records
birdRouter.get('/bird-mortality', getAllBirdMortalityRecords);

// Route to retrieve a single bird mortality record by ID
birdRouter.get('/bird-mortality/:id', getBirdMortalityRecordById);

// Route to update a bird mortality record by ID
birdRouter.put('/bird-mortality/:id', updateBirdMortalityRecordById);

// Route to delete a bird mortality record by ID
birdRouter.delete('/bird-mortality/:id', deleteBirdMortalityRecordById);
birdRouter.get('/api/bird-mortality/report', getBirdMortalityReportByType);

// Route to create a new bird eggs collected record
birdRouter.post('/collect-eggs', createBirdEggsCollected);

// Route to get all bird eggs collected records
birdRouter.get('/all-eggs-collected', getBirdEggsCollected);

birdRouter.get('/all-eggs-collected-today', getEggsCollectedToday);

// Route to get a bird eggs collected record by ID
birdRouter.get('/:id/details', getBirdEggsCollectedById);

// Route to update a bird eggs collected record
birdRouter.put('/:id/update', updateBirdEggsCollected);

// Route to delete a bird eggs collected record
birdRouter.delete('/:id/remove', deleteBirdEggsCollected);


birdRouter.get('/sorted-eggs-stock/:type', getSortedEggsStockByType);
birdRouter.get('/unsorted-eggs-stock/:type', getUnsortedEggsStockByType);
birdRouter.get('/eggs-collected-today/:type', getEggsCollectedTodayByType);
birdRouter.get('/poultry-unsorted-eggs-collected-today', getPoultryUnsortedEggsCollectedToday);
birdRouter.get('/poultry-sorted-eggs-collected-today', getPoultrySortedEggsCollectedToday);


birdRouter.get('/bird-type-expenses/:type', getExpensesByType);
birdRouter.get('/expenses-type-expense-by-period/:type', getExpensesByTypeAndPeriod);


birdRouter.post('/birds-sale', createBirdSale); // Create a new bird sale
birdRouter.get('/birds-sale', getBirdSales); // Get all bird sales
birdRouter.get('/birds-sale/:id', getBirdSaleById); // Get a single bird sale by ID
birdRouter.put('/birds-sale/:id', updateBirdSaleById); // Update a bird sale by ID
birdRouter.delete('/birds-sale/:id', deleteBirdSaleById); // Delete a bird sale by ID
birdRouter.get('/bird-sales', getBirdSalesByType);
birdRouter.get('/batch-sales-records', getSalesRecordsByBatchAndType);

// Create a new deworming record
birdRouter.post('/bird-deworming-records', createBirdDewormingRecord);

// Get all deworming records
birdRouter.get('/bird-deworming-records', getAllBirdDewormingRecords);

// Get deworming records by type
birdRouter.get('/bird-deworming-records/type', getBirdDewormingRecordsByType);

// Get deworming records by type and batch number
birdRouter.get('/bird-deworming-records/type-batch', getBirdDewormingRecordsByTypeAndBatch);

// Update a deworming record
birdRouter.put('/bird-deworming-records/:id', updateBirdDewormingRecord);

// Delete a deworming record
birdRouter.delete('/bird-deworming-records/:id', deleteBirdDewormingRecord);

// Create a new feed name
birdRouter.post('/add-feed-names', createFeedName);

// Get all feed names
birdRouter.get('/feed-names', getFeedNames);

// Get a single feed name by ID
birdRouter.get('/feed-names/:id', getFeedNameById);

// Update a feed name by ID
birdRouter.put('/feed-names/:id', updateFeedName);

// Delete a feed name by ID
birdRouter.delete('/feed-names/:id', deleteFeedName);

// Create a new BirdFeedPurchase
birdRouter.post('/purchase-feed', createBirdFeedPurchase);

// Get all BirdFeedPurchases
birdRouter.get('/purchase-feed', getAllBirdFeedPurchases);
birdRouter.get('/feed-purchases', getFeedPurchasesWithinPeriod);

// Get a single BirdFeedPurchase by ID
birdRouter.get('/purchase-feed/:id', getBirdFeedPurchaseById);

// Update a BirdFeedPurchase by ID
birdRouter.put('/purchase-feed/:id', updateBirdFeedPurchase);

// Delete a BirdFeedPurchase by ID
birdRouter.delete('/purchase-feed/:id', deleteBirdFeedPurchase);

birdRouter.post('/feedStock', createBirdFeedStock);
birdRouter.get('/feedStock', getAllBirdFeedStocks);
birdRouter.put('/feedStock/:id', updateBirdFeedStock);
birdRouter.delete('/feedStock/:id', deleteBirdFeedStock);

// Create a new Bird Feed Issuance
birdRouter.post('/issue-bird-feed', createBirdFeedIssuance);

// Get all Bird Feed Issuances
birdRouter.get('/feed-issuance', getAllBirdFeedIssuances);
birdRouter.get('/bird-feed-issuances-within-a-period', getBirdFeedIssuancesWithinPeriod);

// Get a single Bird Feed Issuance by ID
birdRouter.get('/feed-issuance/:id', getBirdFeedIssuanceById);

// Update a Bird Feed Issuance by ID
birdRouter.put('/feed-issuance/:id', updateBirdFeedIssuance);

// Delete a Bird Feed Issuance by ID
birdRouter.delete('/feed-issuance/:id', deleteBirdFeedIssuance);

// Create a new Bird Health Diagnosis record
birdRouter.post('/bird-health-diagnosis', createBirdHealthDiagnosis);

// Get all Bird Health Diagnosis records
birdRouter.get('/bird-health-diagnosis', getAllBirdHealthDiagnoses);

// Get a single Bird Health Diagnosis record by ID
birdRouter.get('/bird-health-diagnosis/:id', getBirdHealthDiagnosisById);

// Update a Bird Health Diagnosis record by ID
birdRouter.put('/bird-health-diagnosis/:id', updateBirdHealthDiagnosis);

// Delete a Bird Health Diagnosis record by ID
birdRouter.delete('/bird-health-diagnosis/:id', deleteBirdHealthDiagnosis);

// Create a new BirdEggSale
birdRouter.post('/egg-sale', createBirdEggSale);

// Get all BirdEggSales
birdRouter.get('/egg-sale', getBirdEggSales);



// Update a BirdEggSale by ID
birdRouter.put('/egg-sale/:id', updateBirdEggSale);

// Delete a BirdEggSale by ID
birdRouter.delete('/egg-sale/:id', deleteBirdEggSale);

birdRouter.get('/sorted-bird-eggs-stock', getSortedBirdEggsStock);

// Routes for unsorted bird eggs stock
birdRouter.get('/unsorted-bird-eggs-stock', getUnsortedBirdEggsStock);

// Create a new batch
birdRouter.post('/load-egg-batch', loadEggBatch);

// Get all batches
birdRouter.get('/batches-loaded', getAllBatches);

// Get a batch by batchNumber
birdRouter.get('/batches-loaded/:batchNumber', getBatch);

// Update a batch by batchNumber
birdRouter.put('/batches-loaded/:batchNumber', updateBatch);

// Delete a batch by batchNumber
birdRouter.delete('/batches-loaded/:batchNumber', deleteBatch);

birdRouter.post('/register-incubator', registerIncubator);
birdRouter.get('/all-incubators', getAllIncubators);
birdRouter.get('/incubators/:id', getIncubatorById);
birdRouter.put('/incubators/:id', updateIncubator);
birdRouter.delete('/incubators/:id', deleteIncubator);
birdRouter.get('/active-egg-batches', getAllActiveEggBatches);

birdRouter.post('/hatched-eggs', createHatchedEggs);
birdRouter.get('/hatched-eggs', getAllHatchedEggs);
birdRouter.get('/hatched-eggs/:id', getHatchedEggsById);
birdRouter.put('/hatched-eggs/:id', updateHatchedEggs);
birdRouter.delete('/hatched-eggs/:id', deleteHatchedEggs);
birdRouter.get('/hatched-eggs-within-range', getHatchedEggsByDateRange);
birdRouter.get('/hatched-eggs-by-type-and-period', getHatchedEggsByTypeAndPeriod);


// Routes for bird relocations
birdRouter.post('/bird-relocations', relocateBirds); // Create a new bird relocation record
birdRouter.get('/bird-relocations', getAllBirdRelocations); // Get all bird relocation records
birdRouter.get('/bird-relocations/:id', getBirdRelocationById); // Get a single bird relocation record by ID
birdRouter.put('/bird-relocations/:id', updateBirdRelocation); // Update a bird relocation record by ID
birdRouter.delete('/bird-relocations/:id', deleteBirdRelocation); // Delete a bird relocation record by ID

// DASHBOARD


birdRouter.get('/birds-summary-by-location/:type', getBirdsSummaryByLocationAndType);
birdRouter.get('/eggs-stock', getAllEggsStock);
birdRouter.get('/eggs-stock/:type', getEggsStockByType);
birdRouter.get('/bird-sales-summary', getBirdSalesSummary);
birdRouter.get('/all-expenses-by-category', getTotalExpensesByCategory);

birdRouter.get('/birds-by-age-category/:birdType', getBirdsByAgeCategoryByType);

export default birdRouter;
