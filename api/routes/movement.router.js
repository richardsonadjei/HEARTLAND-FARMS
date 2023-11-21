import express from 'express';
import { getAllMovements, getMovementsByPeriod, moveBirdBatch } from '../controllers/movement.controller.js';

const movementRouter = express.Router();

// Define the route for moving a batch of birds
movementRouter.post('/move-birds', moveBirdBatch);
movementRouter.get('/all-movements', getAllMovements);
movementRouter.get('/date-movements', getMovementsByPeriod);

export default movementRouter;
