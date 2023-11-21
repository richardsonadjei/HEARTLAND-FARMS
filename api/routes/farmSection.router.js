import express from 'express';
import { createFarmSection, getAllFarmSections } from '../controllers/farmSection.controller.js';

const sectionRouter = express.Router();

// Define a route to create a new farm section
sectionRouter.post('/farm-sections', createFarmSection);
sectionRouter.get('/all-sections', getAllFarmSections);

export default sectionRouter;
