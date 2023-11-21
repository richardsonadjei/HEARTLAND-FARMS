import express from 'express';
import { createPoultryBreed, getAllBreeds } from '../controllers/breed.controller.js';

const breedRouter = express.Router();

// Route to create a new poultry breed
breedRouter.post('/create-breed', createPoultryBreed);
breedRouter.get('/all-breeds', getAllBreeds);

export default breedRouter;
