
import AnimalBirths from "../models/animalBirth.model.js";
import AnimalFarmExpense from "../models/animalFarmExpense.model.js";
import AnimalMedicalTreatmentRecord from "../models/animalMedicalTreatment.model.js";
import AnimalMedicalTreatmentGroup from "../models/animalMedicalTreatmentGroup.model.js";
import AnimalMortality from "../models/animalMortality.model.js";
import AnimalIdentities from "../models/animalNumber.model.js";
import AnimalSale from "../models/animalSale.model.js";
import AnimalVaccination from "../models/animalVaccination.model.js";
import AnimalWeight from "../models/animalWeight.model.js";
import newAnimalModel from "../models/newAnimal.model.js";






// Create a new animal
export const createAnimal = async (req, res) => {
  const { name, notes } = req.body;

  const newAnimal = new newAnimalModel({
    name,
    notes,
  });

  try {
    const savedAnimal = await newAnimal.save();
    res.status(201).json(savedAnimal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all animals
export const getAllAnimals = async (req, res) => {
  try {
    const animals = await newAnimalModel.find();
    res.status(200).json(animals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single animal by ID
export const getAnimalById = async (req, res) => {
  try {
    const animal = await newAnimalModel.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }
    res.status(200).json(animal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an animal by ID
export const updateAnimal = async (req, res) => {
  const { name, notes } = req.body;

  try {
    const animal = await newAnimalModel.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }

    animal.name = name || animal.name;
    animal.notes = notes || animal.notes;

    const updatedAnimal = await animal.save();
    res.status(200).json(updatedAnimal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete an animal by ID
export const deleteAnimal = async (req, res) => {
  try {
    const animal = await newAnimalModel.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: 'Animal not found' });
    }

    await animal.remove();
    res.status(200).json({ message: 'Animal deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};








// Create a new animal identity and possibly a new animal expense
export const createAnimalIdentity = async (req, res) => {
  try {
    // Create new animal identity
    const newAnimalIdentity = new AnimalIdentities(req.body);
    await newAnimalIdentity.save();

    // Check if the user provided details for an animal expense
    const { date, type, identityNumber, additionalDetails, amount, recordedBy } = req.body;

    if (date && amount && recordedBy) {
      // Create new animal expense
      const newAnimalExpense = new AnimalFarmExpense({
        date,
        category: 'Animal Purchase', // Default category
        type: type || newAnimalIdentity.type,
        identityNumber: identityNumber || newAnimalIdentity.identityNumber,
        additionalDetails: additionalDetails || '',
        amount,
        recordedBy
      });
      await newAnimalExpense.save();
    }

    res.status(201).json(newAnimalIdentity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get all animal identities
export const getAllAnimalIdentities = async (req, res) => {
  try {
    const animalIdentities = await AnimalIdentities.find();
    res.status(200).json(animalIdentities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all animal identities of a certain type
export const getAnimalIdentitiesByType = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({ error: 'Type parameter is required' });
    }

    const animalIdentities = await AnimalIdentities.find({ type });
    res.status(200).json(animalIdentities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getIDNumberByType = async (req, res) => {
  const animalType = req.params.type; // Assuming the type is passed as a parameter
  try {
    const batches = await AnimalIdentities.find({ type: animalType });
    if (batches.length === 0) {
      return res.status(404).json({ message: 'No batches found for the specified animal type' });
    }
    // Extracting identity numbers from batches
    const identityNumbers = batches.map(batch => batch.identityNumber);
    res.json(identityNumbers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getIDNumberByType };


// Get a single animal identity by ID
export const getAnimalIdentityById = async (req, res) => {
  try {
    const animalIdentity = await AnimalIdentities.findById(req.params.id);
    if (!animalIdentity) {
      return res.status(404).json({ error: 'Animal identity not found' });
    }
    res.status(200).json(animalIdentity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an animal identity by ID
export const updateAnimalIdentity = async (req, res) => {
  try {
    const updatedAnimalIdentity = await AnimalIdentities.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedAnimalIdentity) {
      return res.status(404).json({ error: 'Animal identity not found' });
    }
    res.status(200).json(updatedAnimalIdentity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an animal identity by ID
export const deleteAnimalIdentity = async (req, res) => {
  try {
    const deletedAnimalIdentity = await AnimalIdentities.findByIdAndDelete(req.params.id);
    if (!deletedAnimalIdentity) {
      return res.status(404).json({ error: 'Animal identity not found' });
    }
    res.status(200).json({ message: 'Animal identity deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// BIRTHS


// Create a new birth record
export const createAnimalBirth = async (req, res) => {
  try {
    const newBirth = new AnimalBirths(req.body);
    const savedBirth = await newBirth.save();
    res.status(201).json(savedBirth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all birth records
export const getAllAnimalBirths = async (req, res) => {
  try {
    const births = await AnimalBirths.find();
    res.status(200).json(births);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimalBirthsByType = async (req, res) => {
  const { type } = req.params; // Get the type of animal from the request parameters
  try {
    // Query the database for births of the specified type
    const births = await AnimalBirths.find({ type });
    res.status(200).json(births); // Send the matching births as a JSON response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Handle any errors
  }
};

// Get a single birth record by ID
export const getAnimalBirthById = async (req, res) => {
  try {
    const birth = await AnimalBirths.findById(req.params.id);
    if (!birth) return res.status(404).json({ message: 'Birth record not found' });
    res.status(200).json(birth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a birth record by ID
export const updateAnimalBirth = async (req, res) => {
  try {
    const updatedBirth = await AnimalBirths.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBirth) return res.status(404).json({ message: 'Birth record not found' });
    res.status(200).json(updatedBirth);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a birth record by ID
export const deleteAnimalBirth = async (req, res) => {
  try {
    const deletedBirth = await AnimalBirths.findByIdAndDelete(req.params.id);
    if (!deletedBirth) return res.status(404).json({ message: 'Birth record not found' });
    res.status(200).json({ message: 'Birth record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// Controller to create a new animal vaccination record
export const createAnimalVaccination = async (req, res) => {
  try {
    const newVaccination = await AnimalVaccination.create(req.body);
    res.status(201).json(newVaccination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get all animal vaccination records
export const getAllAnimalVaccinations = async (req, res) => {
  try {
    const vaccinations = await AnimalVaccination.find();
    res.status(200).json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to fetch vaccinations of a particular type of animal
export const getAnimalVaccinationsByType = async (req, res) => {
  const { type } = req.params; // Extract the type from the request parameters
  try {
    // Find all animal vaccinations with the specified type
    const vaccinations = await AnimalVaccination.find({ type });
    res.status(200).json(vaccinations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to get a single animal vaccination record by ID
export const getAnimalVaccinationById = async (req, res) => {
  try {
    const vaccination = await AnimalVaccination.findById(req.params.id);
    if (!vaccination) {
      return res.status(404).json({ message: 'Animal vaccination record not found' });
    }
    res.status(200).json(vaccination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update an animal vaccination record
export const updateAnimalVaccination = async (req, res) => {
  try {
    const updatedVaccination = await AnimalVaccination.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedVaccination) {
      return res.status(404).json({ message: 'Animal vaccination record not found' });
    }
    res.status(200).json(updatedVaccination);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete an animal vaccination record
export const deleteAnimalVaccination = async (req, res) => {
  try {
    const deletedVaccination = await AnimalVaccination.findByIdAndDelete(req.params.id);
    if (!deletedVaccination) {
      return res.status(404).json({ message: 'Animal vaccination record not found' });
    }
    res.status(200).json({ message: 'Animal vaccination record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// MEDICAL TREATMENT GROUP


// Controller to create a new animal medical treatment group
export const createAnimalMedicalTreatmentGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newAnimalMedicalTreatmentGroup = new AnimalMedicalTreatmentGroup({ name, description });
    const savedGroup = await newAnimalMedicalTreatmentGroup.save();
    res.status(201).json(savedGroup);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all animal medical treatment groups
export const getAllAnimalMedicalTreatmentGroups = async (req, res) => {
  try {
    const groups = await AnimalMedicalTreatmentGroup.find();
    res.status(200).json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a single animal medical treatment group by ID
export const getAnimalMedicalTreatmentGroupById = async (req, res) => {
  try {
    const group = await AnimalMedicalTreatmentGroup.findById(req.params.id);
    if (!group) {
      res.status(404).json({ message: 'Group not found' });
      return;
    }
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update an animal medical treatment group
export const updateAnimalMedicalTreatmentGroup = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedGroup = await AnimalMedicalTreatmentGroup.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
    if (!updatedGroup) {
      res.status(404).json({ message: 'Group not found' });
      return;
    }
    res.status(200).json(updatedGroup);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete an animal medical treatment group
export const deleteAnimalMedicalTreatmentGroup = async (req, res) => {
  try {
    const deletedGroup = await AnimalMedicalTreatmentGroup.findByIdAndDelete(req.params.id);
    if (!deletedGroup) {
      res.status(404).json({ message: 'Group not found' });
      return;
    }
    res.status(200).json({ message: 'Group deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// MEDICAL TREATMENT RECORDS
// Import necessary modules


// Controller to create a new medical treatment record
export const createMedicalTreatmentRecord = async (req, res) => {
    try {
        const { type, animalId, treatmentType, treatmentDate, medicationAndDosage, veterinarian, notes,recordedBy } = req.body;
        const newRecord = new AnimalMedicalTreatmentRecord({
            type,
            animalId,
            treatmentType,
            treatmentDate,
            medicationAndDosage,
            veterinarian,
            notes,
            recordedBy
        });
        await newRecord.save();
        res.status(201).json(newRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get all medical treatment records
export const getAllMedicalTreatmentRecords = async (req, res) => {
    try {
        const records = await AnimalMedicalTreatmentRecord.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to get all medical treatment records of a particular type of animal
export const getAllMedicalTreatmentRecordsByType = async (req, res) => {
  const { type } = req.query;
  try {
      const records = await AnimalMedicalTreatmentRecord.find({ type: type });
      res.status(200).json(records);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Controller to get a single medical treatment record by ID
export const getMedicalTreatmentRecordById = async (req, res) => {
    const { id } = req.params;
    try {
        const record = await AnimalMedicalTreatmentRecord.findById(id);
        if (!record) {
            res.status(404).json({ message: 'Medical treatment record not found' });
            return;
        }
        res.status(200).json(record);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to update a medical treatment record
export const updateMedicalTreatmentRecord = async (req, res) => {
    const { id } = req.params;
    const { type, animalId, treatmentType, treatmentDate, medicationAndDosage, veterinarian, notes } = req.body;
    try {
        const updatedRecord = await AnimalMedicalTreatmentRecord.findByIdAndUpdate(id, {
            type,
            animalId,
            treatmentType,
            treatmentDate,
            medicationAndDosage,
            veterinarian,
            notes
        }, { new: true });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller to delete a medical treatment record
export const deleteMedicalTreatmentRecord = async (req, res) => {
    const { id } = req.params;
    try {
        await AnimalMedicalTreatmentRecord.findByIdAndDelete(id);
        res.status(200).json({ message: 'Medical treatment record deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Create a new weight record
export const createWeightRecord = async (req, res) => {
  try {
    const { animalId, weight, dateRecorded, recordedBy, notes,type } = req.body;

    const newWeightRecord = new AnimalWeight({
      type,
      animalId,
      weight,
      dateRecorded,
      recordedBy,
      notes
    });

    await newWeightRecord.save();
    res.status(201).json(newWeightRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all weight records
export const getAllWeightRecords = async (req, res) => {
  try {
    const weightRecords = await AnimalWeight.find();
    res.status(200).json(weightRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getWeightRecordsByType = async (req, res) => {
  const { type } = req.params;
  try {
    const weightRecords = await AnimalWeight.find({ type });
    if (weightRecords.length === 0) {
      return res.status(404).json({ message: `No weight records found for animal type: ${type}` });
    }
    res.status(200).json(weightRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single weight record by ID
export const getWeightRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const weightRecord = await AnimalWeight.findById(id);

    if (!weightRecord) {
      return res.status(404).json({ message: 'Weight record not found' });
    }

    res.status(200).json(weightRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a weight record by ID
export const updateWeightRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const { animalId, weight, dateRecorded, recordedBy, notes } = req.body;

    const updatedWeightRecord = await AnimalWeight.findByIdAndUpdate(
      id,
      { animalId, weight, dateRecorded, recordedBy, notes },
      { new: true }
    );

    if (!updatedWeightRecord) {
      return res.status(404).json({ message: 'Weight record not found' });
    }

    res.status(200).json(updatedWeightRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a weight record by ID
export const deleteWeightRecordById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedWeightRecord = await AnimalWeight.findByIdAndDelete(id);

    if (!deletedWeightRecord) {
      return res.status(404).json({ message: 'Weight record not found' });
    }

    res.status(200).json({ message: 'Weight record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





// Create a new mortality record

export const createAnimalMortalityRecord = async (req, res) => {
  try {
    const { type, animalId, date, cause, recordedBy, notes } = req.body;

    const newMortalityRecord = new AnimalMortality({
      type,
      animalId,
      date,
      cause,
      recordedBy,
      notes
    });

    // Save the new mortality record
    await newMortalityRecord.save();

    // Find the corresponding AnimalIdentities document by animalId
    const animalIdentity = await AnimalIdentities.findOne({ identityNumber: animalId });

    // Update the isActive field to false
    if (animalIdentity) {
      animalIdentity.isActive = false;
      await animalIdentity.save();
    }

    res.status(201).json(newMortalityRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all mortality records
export const getAllAnimalMortalityRecords = async (req, res) => {
  try {
    const mortalityRecords = await AnimalMortality.find();
    res.status(200).json(mortalityRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all mortality records of a particular type of farm animal
export const getAnimalMortalityByType = async (req, res) => {
  const { type } = req.params; // Assuming the type is passed as a parameter
  try {
    const mortalityRecords = await AnimalMortality.find({ type: type });
    if (mortalityRecords.length === 0) {
      return res.status(404).json({ message: "No mortality records found for this type." });
    }
    res.status(200).json(mortalityRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Get a single mortality record by ID
export const getAnimalMortalityRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const mortalityRecord = await AnimalMortality.findById(id);
    if (!mortalityRecord) {
      return res.status(404).json({ message: 'Mortality record not found' });
    }
    res.status(200).json(mortalityRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a mortality record
export const updateAnimalMortalityRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, animalId, date, cause, recordedBy, notes } = req.body;

    const existingRecord = await AnimalMortality.findById(id);
    if (!existingRecord) {
      return res.status(404).json({ message: 'Mortality record not found' });
    }

    existingRecord.type = type;
    existingRecord.animalId = animalId;
    existingRecord.date = date;
    existingRecord.cause = cause;
    existingRecord.recordedBy = recordedBy;
    existingRecord.notes = notes;

    await existingRecord.save();

    res.status(200).json(existingRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a mortality record
export const deleteAnimalMortalityRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRecord = await AnimalMortality.findByIdAndRemove(id);
    if (!deletedRecord) {
      return res.status(404).json({ message: 'Mortality record not found' });
    }
    res.status(200).json({ message: 'Mortality record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to fetch all records of a particular type of farm animal
export const getAllRecordsByType = async (req, res) => {
  const { type } = req.params;

  try {
    const births = await AnimalBirths.find({ type });
    const medicalTreatments = await AnimalMedicalTreatmentRecord.find({ type });
    const mortalities = await AnimalMortality.find({ type });
    const vaccinations = await AnimalVaccination.find({ type });
    const weights = await AnimalWeight.find({ type });
    const expenses = await AnimalFarmExpense.find({ type });

    res.status(200).json({
      births,
      medicalTreatments,
      mortalities,
      vaccinations,
      weights,
      expenses
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





export const createExpense = async (req, res) => {
  try {
    const newExpense = new AnimalFarmExpense(req.body);
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await AnimalFarmExpense.find();
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getExpensesByTypeAndPeriod = async (req, res) => {
  const { type, startDate, endDate } = req.query;

  // Validate input
  if (!type || !startDate || !endDate) {
    return res.status(400).json({ message: 'Type, startDate, and endDate are required' });
  }

  // Parse startDate and endDate strings into Date objects in UTC format
  const parsedStartDate = new Date(startDate + 'T00:00:00Z'); // Assuming startDate is in YYYY-MM-DD format
  const parsedEndDate = new Date(endDate + 'T23:59:59.999Z'); // Assuming endDate is in YYYY-MM-DD format

  try {
    const expenses = await AnimalFarmExpense.find({
      type: type,
      date: {
        $gte: parsedStartDate,
        $lte: parsedEndDate
      }
    });

    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getExpensesByTypeAndIdentityNumber = async (req, res) => {
  const { type, identityNumber } = req.query;

  // Validate input
  if (!type || !identityNumber) {
    return res.status(400).json({ message: 'Type and identityNumber are required' });
  }

  try {
    const expenses = await AnimalFarmExpense.find({ type, identityNumber });

    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getExpenseById = async (req, res) => {
  try {
    const expense = await AnimalFarmExpense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateExpense = async (req, res) => {
  try {
    const updatedExpense = await AnimalFarmExpense.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const deletedExpense = await AnimalFarmExpense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const createAnimalSale = async (req, res) => {
  try {
    const animalSale = new AnimalSale(req.body);
    await animalSale.save();
    res.status(201).json(animalSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllAnimalSales = async (req, res) => {
  try {
    const animalSales = await AnimalSale.find();
    res.status(200).json(animalSales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAnimalSaleById = async (req, res) => {
  try {
    const animalSale = await AnimalSale.findById(req.params.id);
    if (!animalSale) {
      return res.status(404).json({ message: 'Animal Sale not found' });
    }
    res.status(200).json(animalSale);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateAnimalSale = async (req, res) => {
  try {
    const animalSale = await AnimalSale.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!animalSale) {
      return res.status(404).json({ message: 'Animal Sale not found' });
    }
    res.status(200).json(animalSale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteAnimalSale = async (req, res) => {
  try {
    const animalSale = await AnimalSale.findByIdAndDelete(req.params.id);
    if (!animalSale) {
      return res.status(404).json({ message: 'Animal Sale not found' });
    }
    res.status(200).json({ message: 'Animal Sale deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Function to fetch animal sales by type and date range
export const getAnimalSalesByTypeAndDate = async (req, res) => {
  const { type, startDate, endDate } = req.query;

  try {
    // Parse startDate and endDate strings into Date objects in UTC format
    const parsedStartDate = new Date(startDate + 'T00:00:00Z');
    const parsedEndDate = new Date(endDate + 'T23:59:59.999Z');

    // Fetch animal sales of the given type within the specified date range
    const animalSales = await AnimalSale.find({
      type: type,
      saleDate: {
        $gte: parsedStartDate,
        $lte: parsedEndDate,
      },
    });

    // Check if any sales were found
    if (!animalSales.length) {
      return res.status(404).json({ message: 'No animal sales found for the given type and date range' });
    }

    // Return the fetched animal sales
    res.status(200).json(animalSales);
  } catch (error) {
    console.error('Error fetching animal sales:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
