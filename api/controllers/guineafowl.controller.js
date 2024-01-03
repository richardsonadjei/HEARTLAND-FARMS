import GuineaFowlStock from '../models/guineaFowl.model.js'
import GuineaFowlStockUpdate from '../models/guineaFowlBatchUpdateHistory.model.js';
import GuineaFowlHealthRecords from '../models/guineaFowlHealthRecords.model.js';
import GuineaFowlTreatment from '../models/guineaFowlTreatment.model.js';


// Create a new Guinea Fowl entry
const createGuineaFowl = async (req, res) => {
  try {
    const guineaFowl = new GuineaFowlStock(req.body);
    await guineaFowl.save();
    res.status(201).json(guineaFowl);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllGuineaFowls = async (req, res) => {
  try {
    const guineaFowls = await GuineaFowlStock.find();
    res.status(200).json(guineaFowls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateGuineaFowlQuantity = async (req, res) => {
  try {
    const { batchNumber } = req.params;
    const { quantity, updatedBy } = req.body; // Extract updatedBy from req.body

    // Find the Guinea Fowl by batchNumber
    const guineaFowl = await GuineaFowlStock.findOne({ batchNumber });

    // Check if the Guinea Fowl with the specified batchNumber exists
    if (!guineaFowl) {
      return res.status(404).json({ error: 'Guinea Fowl not found' });
    }

    // Save the original quantity for updating the log
    const previousQuantity = guineaFowl.quantity;

    // Increment the existing quantity with the new quantity
    guineaFowl.quantity += parseInt(quantity, 10);

    // Save the updated Guinea Fowl
    await guineaFowl.save();

    // Create a new GuineaFowlStockUpdate instance
    const stockUpdate = new GuineaFowlStockUpdate({
      batchNumber,
      previousQuantity,
      newQuantity: guineaFowl.quantity,
      updatedBy, // Use the updatedBy from the req.body
      updatedAt: new Date(), // Optionally, update the updatedAt field
    });

    // Save the GuineaFowlStockUpdate instance
    await stockUpdate.save();

    // Respond with the updated Guinea Fowl
    res.json(guineaFowl);
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};



const viewBatchUpdatesWithinPeriod = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

    // Query for GuineaFowlStockUpdates within the specified period
    const batchUpdates = await GuineaFowlStockUpdate.find({
      updatedAt: { $gte: parsedStartDate, $lte: parsedEndDate },
    });

    res.json(batchUpdates);
  } catch (error) {
    console.error('Error retrieving batch updates:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// Function to calculate age based on arrival date
const calculateAge = (arrivalDate) => {
  const today = new Date();
  const arrival = new Date(arrivalDate);
  const ageInMilliseconds = today - arrival;
  const ageInDays = Math.floor(ageInMilliseconds / (24 * 60 * 60 * 1000));
  return ageInDays;
};

// Function to update the currentAge for all guinea fowls
export const updateGuineaFowlCurrentAge = async (req, res) => {
  try {
    // Find all guinea fowls in the database
    const guineaFowls = await GuineaFowlStock.find();

    // Update the currentAge for each guinea fowl
    guineaFowls.forEach(async (guineaFowl) => {
      guineaFowl.currentAge = calculateAge(guineaFowl.arrivalDate);
      await guineaFowl.save();
    });

    res.status(200).json({ success: true, message: 'Updated currentAge for all guinea fowls now' });
  } catch (error) {
    console.error('Error updating currentAge:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



// Controller function to move a batch of guinea fowls to another farm section
export const moveGuineaFowlBatch = async (req, res) => {
  try {
    // Extract data from the request body
    const { batchNumber, fromFarmSection, toFarmSection, quantity, movementBy, movementReason } = req.body;

    // Fetch the batch from the 'fromFarmSection'
    const sourceBatch = await GuineaFowlStock.findOne({ batchNumber, farmSection: fromFarmSection });

    if (!sourceBatch) {
      return res.status(404).json({ success: false, error: 'Batch not found in the specified farm section' });
    }

    // Check if the quantity being moved is not more than the available quantity
    if (quantity > sourceBatch.quantity) {
      return res.status(400).json({ success: false, error: 'Not enough guinea fowls to move' });
    }

    // If the quantity being moved is equal to the available quantity, update both quantity and farm section
    if (quantity === sourceBatch.quantity) {
      // Update the quantity of guinea fowls and farm section in the 'fromFarmSection'
      sourceBatch.quantity -= quantity;
      sourceBatch.farmSection = toFarmSection;
      await sourceBatch.save();
    } else {
      // Create a new batch with the quantity being moved
      const newBatch = new GuineaFowlStock({
        quantity,
        currentAge: sourceBatch.currentAge,
        arrivalDate: sourceBatch.arrivalDate,
        createdBy: sourceBatch.createdBy,
        farmSection: toFarmSection,
      });
      // Save the new batch to the database
      await newBatch.save();

      // Update the quantity of guinea fowls in the 'fromFarmSection'
      sourceBatch.quantity -= quantity;
      await sourceBatch.save();
    }

    // Create a new GuineaFowlMovement instance
    const movement = new GuineaFowlMovement({
      batchNumber,
      fromFarmSection,
      toFarmSection,
      quantity,
      movementBy,
      movementReason,
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




const viewGuineaFowlBatchByNumber = async (req, res) => {
  try {
    const { batchNumber } = req.params;

    // Find the Guinea Fowl by batchNumber
    const guineaFowl = await GuineaFowlStock.findOne({ batchNumber });

    // Check if the Guinea Fowl with the specified batchNumber exists
    if (!guineaFowl) {
      return res.status(404).json({ success: false, error: 'Guinea Fowl not found' });
    }

    // Respond with the details of the found Guinea Fowl batch
    res.status(200).json({ success: true, guineaFowl });
  } catch (error) {
    // Handle errors and send an error response
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};




export {
  createGuineaFowl,
  getAllGuineaFowls,
  updateGuineaFowlQuantity,
  viewBatchUpdatesWithinPeriod,
  viewGuineaFowlBatchByNumber, 
};





// HEALTH RECORDS CONTROLLERS
// controllers/guineaFowlHealthRecordsController.js


// Create a new health record
export const createHealthRecord = async (req, res) => {
  try {
    const newHealthRecord = new GuineaFowlHealthRecords(req.body);
    const savedHealthRecord = await newHealthRecord.save();
    res.status(201).json(savedHealthRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all health records
export const getAllHealthRecords = async (req, res) => {
  try {
    const healthRecords = await GuineaFowlHealthRecords.find();
    res.status(200).json(healthRecords);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific health record by ID
export const getHealthRecordById = async (req, res) => {
  try {
    const healthRecord = await GuineaFowlHealthRecords.findById(req.params.id);
    if (!healthRecord) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.status(200).json(healthRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a health record by ID
export const updateHealthRecord = async (req, res) => {
  try {
    const updatedHealthRecord = await GuineaFowlHealthRecords.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedHealthRecord) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.status(200).json(updatedHealthRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a health record by ID
export const deleteHealthRecord = async (req, res) => {
  try {
    const deletedHealthRecord = await GuineaFowlHealthRecords.findByIdAndRemove(req.params.id);
    if (!deletedHealthRecord) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.status(200).json(deletedHealthRecord);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// TREATMENT CONTROLLERS


// Controller to create a new GuineaFowlTreatment record
export const createGuineaFowlTreatment = async (req, res) => {
  try {
    const guineaFowlTreatment = new GuineaFowlTreatment(req.body);
    await guineaFowlTreatment.save();
    res.status(201).json({ success: true, data: guineaFowlTreatment });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Controller to get all GuineaFowlTreatment records
export const getAllGuineaFowlTreatments = async (req, res) => {
  try {
    const guineaFowlTreatments = await GuineaFowlTreatment.find();
    res.status(200).json({ success: true, data: guineaFowlTreatments });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to get a single GuineaFowlTreatment record by ID
export const getGuineaFowlTreatmentById = async (req, res) => {
  try {
    const guineaFowlTreatment = await GuineaFowlTreatment.findById(req.params.id);
    if (!guineaFowlTreatment) {
      res.status(404).json({ success: false, error: 'GuineaFowlTreatment not found' });
      return;
    }
    res.status(200).json({ success: true, data: guineaFowlTreatment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to update a GuineaFowlTreatment record by ID
export const updateGuineaFowlTreatment = async (req, res) => {
  try {
    const guineaFowlTreatment = await GuineaFowlTreatment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!guineaFowlTreatment) {
      res.status(404).json({ success: false, error: 'GuineaFowlTreatment not found' });
      return;
    }
    res.status(200).json({ success: true, data: guineaFowlTreatment });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Controller to delete a GuineaFowlTreatment record by ID
export const deleteGuineaFowlTreatment = async (req, res) => {
  try {
    const guineaFowlTreatment = await GuineaFowlTreatment.findByIdAndDelete(req.params.id);
    if (!guineaFowlTreatment) {
      res.status(404).json({ success: false, error: 'GuineaFowlTreatment not found' });
      return;
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
