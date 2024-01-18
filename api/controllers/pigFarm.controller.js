import PigStock from '../models/pigStock.model.js';
import mongoose from 'mongoose';


// Controller function to record a new stock of pig
const recordNewPigStock = async (req, res) => {
  try {
    const {
      identityTag,
      breed,
      quantity,
      arrivalDate,
      farmSection,
      createdBy,
      gender,
    } = req.body;

    // Create a new PigStock instance
    const newPigStock = new PigStock({
      identityTag,
      breed,
      quantity,
      arrivalDate,
      farmSection,
      createdBy,
      gender,
    });

    // Save the new pig stock to the database
    await newPigStock.save();

    return res.status(201).json({ success: true, message: 'New pig stock recorded successfully.' });
  } catch (error) {
    console.error('Error recording new pig stock:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};


const getAllPigStocks = async (req, res) => {
  try {
    // Retrieve pig stocks with quantity greater than zero from the database
    const pigStocks = await PigStock.find({ quantity: { $gt: 0 } });

    return res.status(200).json({ success: true, pigStocks });
  } catch (error) {
    console.error('Error retrieving pig stocks:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};



export { getAllPigStocks };

const getAllSowStocks = async (req, res) => {
  try {
    // Retrieve pig stocks with identity numbers starting with 'S' from the database
    const pigStocks = await PigStock.find({ identityNumber: /^S/ });

    return res.status(200).json({ success: true, pigStocks });
  } catch (error) {
    console.error('Error retrieving pig stocks:', error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
export { getAllSowStocks };




export default {
  recordNewPigStock,
  
};

// CALCULATE AGE
const calculateAge = (arrivalDate) => {
  const today = new Date();
  const arrival = new Date(arrivalDate);
  const ageInMilliseconds = today - arrival;
  const ageInDays = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));
  const ageInWeeks = Math.floor(ageInDays / 7);
  const daysRemaining = ageInDays % 7;

  return `${ageInWeeks} weeks ${daysRemaining} days`;
};


// Controller function to update the currentAge for all pigs
export const updatePigCurrentAge = async (req, res) => {
  try {
    // Find all pigs in the database
    const pigs = await PigStock.find();

    // Update the currentAge for each pig
    pigs.forEach(async (pig) => {
      pig.currentAge = calculateAge(pig.arrivalDate);
      await pig.save();
    });

    res.status(200).json({ success: true, message: 'Updated currentAge for all pigs now' });
  } catch (error) {
    console.error('Error updating currentAge:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


// PIG BREED CONGROLLERS
import PigBreed from '../models/pigBreed.model.js'; // Adjust the path based on your project structure

// Controller to create a new pig breed
export const createPigBreed = async (req, res) => {
  try {
    const { name, description, origin, averageWeight } = req.body;

    // Check if the pig breed with the same name already exists
    const existingBreed = await PigBreed.findOne({ name });

    if (existingBreed) {
      return res.status(400).json({ message: 'Pig breed with this name already exists' });
    }

    // Create a new pig breed
    const newPigBreed = new PigBreed({
      name,
      description,
      origin,
      averageWeight,
    });

    // Save the pig breed to the database
    await newPigBreed.save();

    res.status(201).json(newPigBreed);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get all pig breeds
export const getPigBreeds = async (req, res) => {
  try {
    const pigBreeds = await PigBreed.find();

    res.status(200).json(pigBreeds);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// CROSSING CONTROLLERS
import PigCrossing from '../models/pigCrossing.model.js'; // Adjust the path accordingly

// Controller for creating a new pig crossing record
const createPigCrossing = async (req, res) => {
  try {
    const { sowIdentityNumber, boarBreed, date, notes } = req.body;

    // Create a new PigCrossing instance
    const newPigCrossing = new PigCrossing({
      sowIdentityNumber,
      boarBreed,
      date,
      notes,
    });


    // Save the new pig crossing record to the database
    const savedPigCrossing = await newPigCrossing.save();

    res.status(201).json(savedPigCrossing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for retrieving pig crossing records within a particular period
const getPigCrossingsByPeriod = async (req, res) => {
  try {
    // Extract startDate and endDate from the request query
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Find pig crossing records within the specified date range
    const pigCrossings = await PigCrossing.find({
      date: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json(pigCrossings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for retrieving a specific pig crossing record by sowIdentityNumber
const getPigCrossingBySowIdentityNumber = async (req, res) => {
  try {
    const { sowIdentityNumber } = req.params;
    const pigCrossing = await PigCrossing.findOne({ sowIdentityNumber });
    
    if (!pigCrossing) {
      return res.status(404).json({ message: 'Pig crossing not found' });
    }
    
    res.status(200).json(pigCrossing);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller for deleting a pig crossing record by ID
const deletePigCrossingById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPigCrossing = await PigCrossing.findByIdAndDelete(id);
    if (!deletedPigCrossing) {
      return res.status(404).json({ message: 'Pig crossing not found' });
    }
    res.status(200).json({ message: 'Pig crossing deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createPigCrossing,
  getPigCrossingsByPeriod,
  getPigCrossingBySowIdentityNumber, 
  deletePigCrossingById,
};



// BIRTHS
import SowBirth from '../models/sowBirth.model.schema.js';

// Controller to create a new sow birth record
const createSowBirth = async (req, res) => {
  try {
    const {
      sowIdentityNumber,
      dateOfBirth,
      numberOfMalePiglets,
      numberOfFemalePiglets,
      recordedBy,
    } = req.body;

    const sowBirth = new SowBirth({
      sowIdentityNumber,
      dateOfBirth,
      numberOfMalePiglets,
      numberOfFemalePiglets,
      totalNumberOfPiglets: numberOfMalePiglets + numberOfFemalePiglets,
      recordedBy,
    });

    await sowBirth.save();

    res.status(201).json(sowBirth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  createSowBirth,
};

// Controller to get sow birth records within a particular period
const getSowBirthsByPeriod = async (req, res) => {
  try {
    // Extract startDate and endDate from the request query
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Find sow birth records within the specified date range
    const sowBirths = await SowBirth.find({
      dateOfBirth: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json(sowBirths);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getSowBirthsByPeriod };


// Controller to get a specific sow birth record by sowIdentityNumber
const getSowBirthBySowIdentityNumber = async (req, res) => {
  try {
    const { sowIdentityNumber } = req.params;
    const sowBirth = await SowBirth.findOne({ sowIdentityNumber });

    if (!sowBirth) {
      return res.status(404).json({ message: 'Sow birth record not found' });
    }

    res.status(200).json(sowBirth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getSowBirthBySowIdentityNumber };




// MORTALITY
import PigMortality from '../models/pigMortality.model.js';

// Controller to create a new pig mortality record and deduct the quantity from the available quantity
const createPigMortality = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { pigIdentityNumber, dateOfDeath, causeOfDeath, recordedBy } = req.body;

    // Find the corresponding pig in the PigStock collection
    const pigStock = await PigStock.findOne({ identityNumber: pigIdentityNumber });

    if (!pigStock) {
      return res.status(404).json({ message: `Pig with identity number ${pigIdentityNumber} not found` });
    }

    // Ensure the quantity is greater than 0 before deducting
    if (pigStock.quantity > 0) {
      // Deduct the quantity by 1
      pigStock.quantity -= 1;

      // Save the updated pigStock document
      await pigStock.save();

      // Create a new PigMortality record
      const pigMortality = new PigMortality({
        pigIdentityNumber,
        dateOfDeath,
        causeOfDeath,
        recordedBy,
      });

      // Save the PigMortality record
      await pigMortality.save();

      // Commit the transaction
      await session.commitTransaction();
      session.endSession();

      res.status(201).json({ pigMortality, message: 'Pig mortality recorded, and quantity deducted successfully' });
    } else {
      res.status(400).json({ message: 'Quantity is already zero for this pig' });
    }
  } catch (error) {
    // Rollback the transaction in case of an error
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ error: error.message });
  }
};



// Controller to get pig mortalities within a particular period
const getPigMortalitiesByPeriod = async (req, res) => {
  try {
    // Extract startDate and endDate from the request query
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Find pig mortalities within the specified date range
    const pigMortalities = await PigMortality.find({
      dateOfDeath: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json(pigMortalities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getPigMortalitiesByPeriod };



export {
  createPigMortality,
};



// PIG DRUGS
import PigMedication from '../models/pigDrugs.model.js';

// Controller for creating a new Pig Medication
const createPigMedication = async (req, res) => {
  try {
    const newMedication = await PigMedication.create(req.body);
    res.status(201).json(newMedication);
  } catch (error) {
    console.error('Error creating Pig Medication:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller for getting all Pig Medications
const getAllPigMedications = async (req, res) => {
  try {
    const medications = await PigMedication.find();
    res.status(200).json(medications);
  } catch (error) {
    console.error('Error getting Pig Medications:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





export {
  createPigMedication,
  getAllPigMedications,
  
};
