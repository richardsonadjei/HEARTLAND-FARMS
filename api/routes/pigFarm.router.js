import express from 'express';
import pigStockController, { createPigBreed, createPigCrossing, createPigMedication, createPigMortality, createSowBirth, deletePigCrossingById, deletePigMedicationById, getAllPigMedications, getAllPigStocks, getAllSowStocks, getPigBreeds, getPigCrossingBySowIdentityNumber, getPigCrossingsByPeriod, getPigMedicationById, getPigMortalitiesByPeriod, getSowBirthBySowIdentityNumber, getSowBirthsByPeriod, updatePigCurrentAge, updatePigMedicationById, } from '../controllers/pigFarm.controller.js';

const pigFarmRouter = express.Router();

// Route to record a new stock of pig
pigFarmRouter.post('/add-new-pig-stock', pigStockController.recordNewPigStock);
pigFarmRouter.get('/all-sow-stock', getAllSowStocks);

// Route for updating the currentAge of all pigs
pigFarmRouter.post('/update-pig-current-age', updatePigCurrentAge);


// PIG BREED ROUTERS
pigFarmRouter.post('/add-pig-breeds', createPigBreed);
pigFarmRouter.get('/all-pig-breeds', getPigBreeds);


pigFarmRouter.get('/all-pigs', getAllPigStocks);

// CROSSING ROUTERS
pigFarmRouter.post('/add-pig-crossings', createPigCrossing);
pigFarmRouter.get('/pig-crossings-by-period', getPigCrossingsByPeriod);
pigFarmRouter.get('/pig-crossings/:sowIdentityNumber', getPigCrossingBySowIdentityNumber);
pigFarmRouter.delete('/pig-crossings/:id', deletePigCrossingById);


// BIRTHS
pigFarmRouter.post('/add-sow-births', createSowBirth);
pigFarmRouter.get('/sow-births-by-period', getSowBirthsByPeriod);
pigFarmRouter.get('/get-sow-birth-by-identity-number/:sowIdentityNumber', getSowBirthBySowIdentityNumber);


// MORTALITY
pigFarmRouter.post('/create-pig-mortality', createPigMortality);
pigFarmRouter.get('/pig-mortalities-by-period', getPigMortalitiesByPeriod);

// PIG DRUGS

pigFarmRouter.post('/add-pig-drug', createPigMedication);
pigFarmRouter.get('/', getAllPigMedications);
pigFarmRouter.get('/:id', getPigMedicationById);
pigFarmRouter.put('/:id', updatePigMedicationById);
pigFarmRouter.delete('/:id', deletePigMedicationById);


export default pigFarmRouter;
