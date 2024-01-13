import express from 'express';
import pigStockController, { createPigBreed, getAllPigStocks, getPigBreeds, updatePigCurrentAge, } from '../controllers/pigFarm.controller.js';

const pigFarmRouter = express.Router();

// Route to record a new stock of pig
pigFarmRouter.post('/add-new-pig-stock', pigStockController.recordNewPigStock);

// Route for updating the currentAge of all pigs
pigFarmRouter.post('/update-pig-current-age', updatePigCurrentAge);


// PIG BREED ROUTERS
pigFarmRouter.post('/add-pig-breeds', createPigBreed);
pigFarmRouter.get('/all-pig-breeds', getPigBreeds);


pigFarmRouter.get('/all-pigs', getAllPigStocks);



export default pigFarmRouter;
