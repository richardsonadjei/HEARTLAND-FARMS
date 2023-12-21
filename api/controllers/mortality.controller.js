import MortalityModel from '../models/mortality.model.js';
import BirdModel from '../models/poultry.model.js';

const recordMortality = async (req, res) => {
  try {
    const { batchNumber, date, count, cause, notes, recordedBy } = req.body;

    // Validate if the batch exists
    const existingBatch = await BirdModel.findOne({ batchNumber });

    if (!existingBatch) {
      return res.status(404).json({ error: 'Batch not found' });
    }

    // Create a mortality record
    const mortalityRecord = new MortalityModel({
      batchNumber,
      date,
      count,
      cause,
      notes,
      recordedBy,
    });

    // Save the mortality record
    await mortalityRecord.save();

    // Update the quantity in the Bird model
    existingBatch.quantity -= count;

    // Save the updated Bird model
    await existingBatch.save();

    return res.status(201).json({ message: 'Mortality recorded successfully' });
  } catch (error) {
    console.error('Error recording mortality:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { recordMortality };



const viewMortalitiesByBatch = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    const mortalities = await MortalityModel.find({ batchNumber });

    return res.status(200).json({ data: mortalities });
  } catch (error) {
    console.error('Error fetching mortalities by batch:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { viewMortalitiesByBatch };




const viewMortalitiesByPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Validate date format
    const isValidDate = (dateString) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return dateString.match(regex);
    };

    if (!isValidDate(startDate) || !isValidDate(endDate)) {
      return res.status(400).json({ error: 'Invalid date format. Use YYYY-MM-DD.' });
    }

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    const mortalities = await MortalityModel.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    return res.status(200).json({ data: mortalities });
  } catch (error) {
    console.error('Error fetching mortalities by period:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { viewMortalitiesByPeriod };
