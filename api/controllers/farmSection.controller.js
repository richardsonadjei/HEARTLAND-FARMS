import FarmSection from '../models/farmSection.model.js';

// Controller to create a new farm section
const createFarmSection = async (req, res) => {
  try {
    const {
      sectionName,
      description,
      capacity,
      lighting,
      layingPoints,
      feeders,
      drinkers,
    } = req.body;

    // Create a new farm section instance
    const newFarmSection = new FarmSection({
      sectionName,
      description,
      capacity,
      lighting,
      layingPoints,
      feeders,
      drinkers,
    });

    // Save the farm section to the database
    const savedFarmSection = await newFarmSection.save();

    res.status(201).json(savedFarmSection);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { createFarmSection };

const getAllFarmSections = async (req, res) => {
  try {
    // Fetch all farm sections from the database
    const farmSections = await FarmSection.find();

    res.status(200).json(farmSections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { getAllFarmSections };
