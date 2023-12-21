// routes/healthConditionRouter.js
import express from 'express';
import * as healthConditionController from '../controllers/healthCondition.controller.js';

const healthConditionRouter = express.Router();

healthConditionRouter.post('/add-healthConditions', healthConditionController.createHealthCondition);
healthConditionRouter.get('/healthConditions', healthConditionController.getAllHealthConditions);
healthConditionRouter.get('/healthConditions/:id', healthConditionController.getHealthConditionById);
healthConditionRouter.put('/healthConditions/:id', healthConditionController.updateHealthCondition);


export default healthConditionRouter;
