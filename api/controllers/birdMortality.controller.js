import BirdMortality from '../models/birdMortality.model.js';
import Bird from '../models/poultry.model.js';
import BatchUpdate from '../models/batchUpdate.model.js';

export const recordBirdMortality = async (req, res) => {
    let savedBirdMortality;
  
    try {
      const { batchNumber, quantity, cause, recordedBy } = req.body;
  
      // Record bird mortality
      const newBirdMortality = new BirdMortality({
        batchNumber,
        quantity,
        cause,
        recordedBy,
      });
  
      // Save bird mortality
      savedBirdMortality = await newBirdMortality.save();
  
      // Update the quantity in the batch
      await Bird.updateOne({ batchNumber }, { $inc: { quantity: -quantity } });
  
      // Log batch update
      const birdInfo = await Bird.findOne({ batchNumber });
      const batchUpdate = new BatchUpdate({
        batchNumber,
        previousQuantity: birdInfo.quantity + quantity,
        newQuantity: birdInfo.quantity,
        updatedBy: recordedBy,
      });
  
      await batchUpdate.save();
  
      res.status(201).json({ success: true, data: savedBirdMortality });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };



export const generateMortalityReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Fetch bird mortalities within the specified period
    const mortalities = await BirdMortality.find({
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    res.status(200).json({ success: true, data: mortalities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export const viewBatchMortality = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Fetch bird mortalities for a particular batch
    const batchMortalities = await BirdMortality.find({ batchNumber });

    res.status(200).json({ success: true, data: batchMortalities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
