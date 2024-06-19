// animalRouter.js
import express from 'express';
import { createAnimal,    createAnimalBirth,    createAnimalIdentity, createAnimalMedicalTreatmentGroup, createAnimalMortalityRecord, createAnimalSale, createAnimalVaccination, createExpense, createMedicalTreatmentRecord, createWeightRecord, deleteAnimal,   deleteAnimalBirth,   deleteAnimalIdentity,    deleteAnimalMedicalTreatmentGroup,    deleteAnimalSale,    deleteAnimalVaccination,    deleteExpense,    deleteMedicalTreatmentRecord,    deleteWeightRecordById,    getAllAnimalBirths,    getAllAnimalIdentities, getAllAnimalMedicalTreatmentGroups, getAllAnimalMortalityRecords, getAllAnimalSales, getAllAnimalVaccinations, getAllAnimals, getAllExpenses, getAllMedicalTreatmentRecords, getAllMedicalTreatmentRecordsByType, getAllRecordsByType, getAllWeightRecords, getAnimalBirthById, getAnimalBirthsByType, getAnimalById,    getAnimalIdentitiesByType,    getAnimalIdentityById, getAnimalMedicalTreatmentGroupById, getAnimalMortalityByType, getAnimalMortalityRecordById, getAnimalSaleById, getAnimalSalesByTypeAndDate, getAnimalVaccinationById, getAnimalVaccinationsByType, getExpenseById, getExpensesByTypeAndIdentityNumber, getExpensesByTypeAndPeriod, getIDNumberByType, getMedicalTreatmentRecordById, getWeightRecordById, getWeightRecordsByType, updateAnimal,   updateAnimalBirth,   updateAnimalIdentity, updateAnimalMedicalTreatmentGroup, updateAnimalMortalityRecord, updateAnimalSale, updateAnimalVaccination, updateExpense, updateMedicalTreatmentRecord, updateWeightRecordById } from '../controllers/animals.controllers.js';


const animalRouter = express.Router();

// Define routes and map them to controller functions
animalRouter.post('/add-animals', createAnimal);
animalRouter.get('/all-animal-types', getAllAnimals);
animalRouter.get('/all-identity-numbers/:type', getIDNumberByType);
animalRouter.get('/animal-types/:id', getAnimalById);
animalRouter.put('/animal-types/:id', updateAnimal);
animalRouter.delete('/animal-types/:id', deleteAnimal);

// Create a new animal identity
animalRouter.post('/create-animal-id', createAnimalIdentity);

// Get all animal identities
animalRouter.get('/all-animals', getAllAnimalIdentities);
animalRouter.get('/all-animal-by-type', getAnimalIdentitiesByType);

// Get a single animal identity by ID
animalRouter.get('/animal/:id', getAnimalIdentityById);

// Update an animal identity by ID
animalRouter.put('/update-animal-id/:id', updateAnimalIdentity);

// Delete an animal identity by ID
animalRouter.delete('/delete-animal-id/:id', deleteAnimalIdentity);

// BIRTHS
animalRouter.post('/animal-births', createAnimalBirth);
animalRouter.get('/animal-births', getAllAnimalBirths);
animalRouter.get('/animal-births/:type', getAnimalBirthsByType);
animalRouter.get('/animal-births/:id', getAnimalBirthById);
animalRouter.put('/animal-births/:id', updateAnimalBirth);
animalRouter.delete('/animal-births/:id', deleteAnimalBirth);

animalRouter.post('/animal-vaccinations', createAnimalVaccination);

// Route to get all animal vaccination records
animalRouter.get('/animal-vaccinations', getAllAnimalVaccinations);


animalRouter.get('/animal-vaccinations/:type', getAnimalVaccinationsByType);

// Route to get a single animal vaccination record by ID
animalRouter.get('/animal-vaccinations/:id', getAnimalVaccinationById);

// Route to update an animal vaccination record
animalRouter.put('/animal-vaccinations/:id', updateAnimalVaccination);

// Route to delete an animal vaccination record
animalRouter.delete('/animal-vaccinations/:id', deleteAnimalVaccination);

// Route to create a new animal medical treatment group
animalRouter.post('/animal-medical-treatment-groups', createAnimalMedicalTreatmentGroup);

// Route to get all animal medical treatment groups
animalRouter.get('/animal-medical-treatment-groups', getAllAnimalMedicalTreatmentGroups);

// Route to get a single animal medical treatment group by ID
animalRouter.get('/animal-medical-treatment-groups/:id', getAnimalMedicalTreatmentGroupById);

// Route to update an animal medical treatment group
animalRouter.put('/animal-medical-treatment-groups/:id', updateAnimalMedicalTreatmentGroup);

// Route to delete an animal medical treatment group
animalRouter.delete('/animal-medical-treatment-groups/:id', deleteAnimalMedicalTreatmentGroup);

// TREATMENTS

// Route to get all medical treatment records
animalRouter.post('/medical-treatment-records', createMedicalTreatmentRecord);
animalRouter.get('/medical-treatment-records', getAllMedicalTreatmentRecords);
animalRouter.get('/medical-treatment-records-by-type', getAllMedicalTreatmentRecordsByType);

// Route to get a single medical treatment record by ID
animalRouter.get('/medical-treatment-records/:id', getMedicalTreatmentRecordById);

// Route to update a medical treatment record
animalRouter.put('/medical-treatment-records/:id', updateMedicalTreatmentRecord);

// Route to delete a medical treatment record
animalRouter.delete('/medical-treatment-records/:id', deleteMedicalTreatmentRecord);

// Route to create a new weight record
animalRouter.post('/animal-weights', createWeightRecord);

// Route to get all weight records
animalRouter.get('/animal-weights', getAllWeightRecords);

// Route to get a single weight record by ID
animalRouter.get('/animal-weights/:id', getWeightRecordById);

// Route to update a weight record by ID
animalRouter.put('/animal-weights/:id', updateWeightRecordById);

// Route to delete a weight record by ID
animalRouter.delete('/animal-weights/:id', deleteWeightRecordById);

animalRouter.get('/wanimal-weights/:type', getWeightRecordsByType);

// Create a new mortality record
animalRouter.post('/animal-mortality', createAnimalMortalityRecord);

// Get all mortality records
animalRouter.get('/animal-mortality', getAllAnimalMortalityRecords);
animalRouter.get('/animal-mortality/:type', getAnimalMortalityByType);

// Get a single mortality record by ID
animalRouter.get('/animal-mortality/:id', getAnimalMortalityRecordById);

// Update a mortality record
animalRouter.put('/animal-mortality/:id', updateAnimalMortalityRecord);

animalRouter.get('/animal-records/:type', getAllRecordsByType);

animalRouter.post('/animal-expenses', createExpense);
animalRouter.get('/animal-expenses', getAllExpenses);
animalRouter.get('/animal-expenses/:id', getExpenseById);
animalRouter.put('/animal-expenses/:id', updateExpense);
animalRouter.delete('/animal-expenses/:id', deleteExpense);
animalRouter.get('/expenses-type-period', getExpensesByTypeAndPeriod);
animalRouter.get('/expenses-type-identity', getExpensesByTypeAndIdentityNumber);



animalRouter.post('/animalSales', createAnimalSale);
animalRouter.get('/animalSales', getAllAnimalSales);
animalRouter.get('/animalSales/:id', getAnimalSaleById);
animalRouter.put('/animalSales/:id', updateAnimalSale);
animalRouter.delete('/animalSales/:id', deleteAnimalSale);
animalRouter.get('/animal-sales', getAnimalSalesByTypeAndDate);



export default animalRouter;
