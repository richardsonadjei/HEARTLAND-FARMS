import PoultryBreed from '../models/breed.model.js';

// Controller function to create a new poultry breed
const createPoultryBreed = async (req, res) => {
  try {
    const {
      name,
      description,
      averageLifespan,
      averageEggsPerYear,
      colorVarieties,
      origin,
      size,
      // Add other properties specific to poultry breeds
    } = req.body;

    // Check if the breed with the same name already exists
    const existingBreed = await PoultryBreed.findOne({ name });

    if (existingBreed) {
      return res.status(400).json({ message: 'Breed with this name already exists' });
    }

    // Create a new PoultryBreed instance
    const newPoultryBreed = new PoultryBreed({
      name,
      description,
      averageLifespan,
      averageEggsPerYear,
      colorVarieties,
      origin,
      size,
      // Set other properties based on the request body
    });

    // Save the new breed to the database
    await newPoultryBreed.save();

    return res.status(201).json({ message: 'Poultry breed created successfully', breed: newPoultryBreed });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export { createPoultryBreed };

const getAllBreeds = async (req, res) => {
    try {
      const breeds = await PoultryBreed.find();
      return res.status(200).json(breeds);
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  export { getAllBreeds };