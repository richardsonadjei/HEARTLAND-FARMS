import express from 'express';
// Change the import statement to use a relative path
import * as guineaFowlController from '../controllers/guineafowl.controller.js';


const guineaFowlRouter = express.Router();

guineaFowlRouter.post('/add-guinea-fowl', guineaFowlController.createGuineaFowl);
guineaFowlRouter.get('/all-guinea-fowl', guineaFowlController.getAllGuineaFowls);
guineaFowlRouter.put('/:batchNumber/update-quantity', guineaFowlController.updateGuineaFowlQuantity);
guineaFowlRouter.get('/batch-updates', guineaFowlController.viewBatchUpdatesWithinPeriod);
guineaFowlRouter.get('/update-all-guinea-ages', guineaFowlController.updateGuineaFowlCurrentAge);
guineaFowlRouter.post('/move-guinea-batch', guineaFowlController.moveGuineaFowlBatch);
guineaFowlRouter.get('/guinea-fowls/:batchNumber', guineaFowlController.viewGuineaFowlBatchByNumber);


export default guineaFowlRouter;
