// Import the Bird model
import Bird from '../models/poultry.model.js'; // Adjust the path based on your file structure
import BatchUpdate from '../models/batchUpdate.model.js'; 
import BatchAddition from '../models/batchAddition.model.js';
// Import the FeedCategory model
import FeedCategory from '../models/feedCategory.model.js'; // Adjust the path as needed


// Function to calculate age based on arrival date
const calculateAge = (arrivalDate) => {
  const currentDate = new Date();
  const parsedArrivalDate = new Date(arrivalDate);
  
  const ageInMilliseconds = currentDate - parsedArrivalDate;
  const ageInDays = Math.floor(ageInMilliseconds / (1000 * 60 * 60 * 24));

  const months = Math.floor(ageInDays / 30);
  const days = ageInDays % 30;

  return `${months} months ${days} days`;
};

// Controller to handle the creation of a new batch of birds
export const createBirdBatch = async (req, res) => {
  try {
    // Extract bird data from the request body
    const { quantity, breed, arrivalDate, createdBy, color, age, farmSection } = req.body;

    // Calculate the initial age based on the provided age
    const initialAge = age;

    // Create a new bird instance
    const newBird = new Bird({
      quantity,
      breed,
      age: initialAge,
      currentAge: calculateAge(arrivalDate),  // Initial calculation based on arrival date
      color,
      arrivalDate,
      createdBy,
      farmSection
    });

    // Save the bird to the database
    const savedBird = await newBird.save();

    // Respond with the saved bird data
    res.status(201).json(savedBird);
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





export const getAllBirdBatches = async (req, res) => {
  try {
    // Extract startDate and endDate from the request query parameters
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Fetch all batches within the specified date range from the database
    const batchesWithinPeriod = await Bird.find({
      createdAt: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Respond with the fetched data
    res.status(200).json(batchesWithinPeriod);
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllBirdBatchesNoDates = async (req, res) => {
  try {
    // Query all batches from the Bird model
    const batches = await Bird.find().exec();

    // Send the batches as a JSON response
    res.status(200).json({ success: true, data: batches });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Controller function to generate a report based on the currentAge of the birds
const generateAgeReport = async (req, res) => {
  try {
    const { minAge, maxAge } = req.query;

    // Convert age range from weeks to months for comparison with currentAge in data
    const minAgeInMonths = minAge / 4.33; // 1 month = 4.33 weeks
    const maxAgeInMonths = maxAge / 4.33;

    // Fetch data from the database based on the age range
    const batches = await Bird.find({
      $and: [
        { 'currentAge': { $gte: `${minAgeInMonths} months` } },
        { 'currentAge': { $lte: `${maxAgeInMonths} months` } }
      ]
    });

    res.json({ success: true, data: batches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export { generateAgeReport };


const getBatchByNumber = async (req, res) => {
  const { batchNumber } = req.params;

  try {
    // Find the batch by batchNumber
    const batch = await Bird.findOne({ batchNumber });

    if (!batch) {
      return res.status(404).json({ success: false, error: 'Batch not found' });
    }

    // Return the batch data
    res.status(200).json({ success: true, data: batch });
  } catch (error) {
    console.error('Error fetching batch:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

export {
  getBatchByNumber,
};


// Controller function to update the quantity of an existing batch and save a record
export const updateBatchQuantity = async (req, res) => {
  try {
    // Extract data from the request body
    const { batchNumber, newQuantity, updatedBy } = req.body;

    // Find the batch by batchNumber
    const batch = await Bird.findOne({ batchNumber });

    if (!batch) {
      return res.status(404).json({ success: false, error: 'Batch not found' });
    }

    // Save the previous quantity for the update record
    const previousQuantity = batch.quantity;

    // Update the quantity of the batch
    batch.quantity = newQuantity;

    // Save the updated batch
    await batch.save();

    // Create a new BatchUpdate record
    const batchUpdate = new BatchUpdate({
      batchNumber,
      previousQuantity,
      newQuantity,
      updatedBy,
    });

    // Save the BatchUpdate record
    await batchUpdate.save();

    // Respond with success message
    res.status(200).json({ success: true, message: 'Batch quantity updated successfully' });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




// Controller function to view all BatchUpdate records within a particular period
export const getBatchUpdatesWithinPeriod = async (req, res) => {
  try {
    // Extract startDate and endDate from the request query parameters
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Fetch all BatchUpdate records within the specified date range from the database
    const updatesWithinPeriod = await BatchUpdate.find({
      updatedAt: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Respond with the fetched data
    res.status(200).json(updatesWithinPeriod);
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



export const addBirdsToBatch = async (req, res) => {
  try {
    // Extract data from the request body
    const { batchNumber, quantityToAdd, addedBy } = req.body;

    // Find the batch by batchNumber
    const batch = await Bird.findOne({ batchNumber });

    if (!batch) {
      return res.status(404).json({ success: false, error: 'Batch not found' });
    }

    // Save the previous quantity for the batch update record
    const previousQuantity = batch.quantity;

    // Convert quantityToAdd and batch.quantity to numbers before adding
    const numericQuantityToAdd = Number(quantityToAdd);
    const numericBatchQuantity = Number(batch.quantity);

    // Update the quantity of the batch
    batch.quantity = numericBatchQuantity + numericQuantityToAdd;

    // Save the updated batch
    await batch.save();

    // Calculate the new total quantity
    const newQuantity = batch.quantity;

    // Create a new BatchAddition record
    const batchAddition = new BatchAddition({
      batchNumber,
      addedQuantity: numericQuantityToAdd,
      addedBy,
      newQuantity, // Add the newQuantity field to the BatchAddition record
    });

    // Save the BatchAddition record
    await batchAddition.save();

    // Respond with success message
    res.status(200).json({ success: true, message: 'Birds added to batch successfully' });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




export const getAdditionsByDateRange = async (req, res) => {
  try {
    // Extract start and end dates from request query parameters
    const { startDate, endDate } = req.query;

    // Ensure both start and end dates are provided
    if (!startDate || !endDate) {
      return res.status(400).json({ success: false, error: 'Both start and end dates are required' });
    }

    // Parse the dates into JavaScript Date objects with the specified format
    const parsedStartDate = new Date(`${startDate}T00:00:00.000Z`);
    const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);

    // Ensure the dates are valid
    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({ success: false, error: 'Invalid date format' });
    }

    // Fetch additions within the specified date range
    const additions = await BatchAddition.find({
      createdAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.status(200).json({ success: true, data: additions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};






// Function to update the currentAge for all birds
export const updateCurrentAge = async (req, res) => {
  try {
    // Find all birds in the database
    const birds = await Bird.find();

    // Update the currentAge for each bird
    birds.forEach(async (bird) => {
      bird.currentAge = calculateAge(bird.arrivalDate);
      await bird.save();
    });
    res.status(200).json({ success: true, message: 'Updated currentAge for all birds in now' });
  } catch (error) {
    console.error('Error updating currentAge:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




// Controller to create a new feed category
export const createFeedCategory = async (req, res) => {
  try {
    // Extract data from the request body
    const { name, description } = req.body;

    // Check if the feed category with the given name already exists
    const existingCategory = await FeedCategory.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ error: 'Feed category with this name already exists.' });
    }

    // Create a new feed category
    const newFeedCategory = new FeedCategory({ name, description });

    // Save the new feed category to the database
    await newFeedCategory.save();

    // Return a success response
    res.status(201).json({ success: true, data: newFeedCategory });
  } catch (error) {
    console.error('Error creating feed category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllFeedCategories = async (req, res) => {
  try {
    // Fetch all feed categories from the database
    const feedCategories = await FeedCategory.find();

    // Return the feed categories as a JSON response
    res.status(200).json({ success: true, data: feedCategories });
  } catch (error) {
    console.error('Error fetching feed categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Controller function to view all batches of birds in a given section
export const getBatchesBySection = async (req, res) => {
  try {
    // Extract section name from the request parameters
    const { section } = req.params;

    // Find all batches in the specified farm section
    const batchesInSection = await Bird.find({ farmSection: section }).exec();

    // Respond with the fetched data
    res.status(200).json({ success: true, data: batchesInSection });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};
