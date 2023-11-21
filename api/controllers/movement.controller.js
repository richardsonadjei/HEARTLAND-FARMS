// Import the Movement and Bird models
import Movement from '../models/movement.model.js';
import Bird from '../models/poultry.model.js';

// Controller function to move a batch of birds to another farm section
export const moveBirdBatch = async (req, res) => {
  try {
    // Extract data from the request body
    const { batchNumber, fromFarmSection, toFarmSection, quantity, movementBy, movementReason, breed } = req.body;

    // Fetch the batch from the 'fromFarmSection'
    const sourceBatch = await Bird.findOne({ batchNumber, farmSection: fromFarmSection });

    if (!sourceBatch) {
      return res.status(404).json({ success: false, error: 'Batch not found in the specified farm section' });
    }

    // Check if the quantity being moved is not more than the available quantity
    if (quantity > sourceBatch.quantity) {
      return res.status(400).json({ success: false, error: 'Not enough birds to move' });
    }

    // If the quantity being moved is equal to the available quantity, update both quantity and farm section
    if (quantity === sourceBatch.quantity) {
      // Update the quantity of birds and farm section in the 'fromFarmSection'
      sourceBatch.quantity -= quantity;
      sourceBatch.farmSection = toFarmSection;
      await sourceBatch.save();
    } else {
      // Create a new batch with the quantity being moved
      const newBatch = new Bird({
        quantity,
        breed: sourceBatch.breed,
        age: sourceBatch.age,
        currentAge: sourceBatch.currentAge,
        color: sourceBatch.color,
        arrivalDate: sourceBatch.arrivalDate,
        createdBy: sourceBatch.createdBy,
        farmSection: toFarmSection,
      });
      // Save the new batch to the database
      await newBatch.save();

      // Update the quantity of birds in the 'fromFarmSection'
      sourceBatch.quantity -= quantity;
      await sourceBatch.save();
    }

    // Create a new Movement instance
    const movement = new Movement({
      batchNumber,
      fromFarmSection,
      toFarmSection,
      quantity,
      movementBy,
      movementReason,
      breed, // Include the breed in the Movement model
    });

    // Save the movement data to the database
    await movement.save();

    // Respond with success message
    res.status(200).json({ success: true, message: 'Batch moved successfully' });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




// Controller function to get all movements
export const getAllMovements = async (req, res) => {
  try {
    // Fetch all movements from the database
    const movements = await Movement.find();

    // Respond with the list of movements
    res.status(200).json({ success: true, data: movements });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



// Controller function to get all movements within a particular period
export const getMovementsByPeriod = async (req, res) => {
  try {
    // Extract start and end dates from the request query parameters
    const { startDate, endDate } = req.query;

    // Parse the dates in the specified format
    const parsedStartDate = new Date(`${startDate}T00:00:00.000Z`);
    const parsedEndDate = new Date(`${endDate}T23:59:59.999Z`);

    // Fetch movements within the specified period from the database
    const movements = await Movement.find({
      movementDate: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Respond with the list of movements within the period
    res.status(200).json({ success: true, data: movements });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};


