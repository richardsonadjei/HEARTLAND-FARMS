// Import the Supplier model
import Supplier from '../models/supplier.model.js'; // Adjust the path based on your file structure

// Controller to create a new supplier
const createSupplier = async (req, res) => {
  try {
    // Extract data from the request body
    const {
      SupplierName,
      StreetAddress,
      City,
      Region,
      GhanaPostGPS,
      Country,
      PhoneNumber,
      Email,
      SalesRepName,
      SalesRepPhoneNumber,
    } = req.body;

    // Create a new supplier instance
    const newSupplier = new Supplier({
      SupplierName,
      StreetAddress,
      City,
      Region,
      GhanaPostGPS,
      Country,
      PhoneNumber,
      Email,
      SalesRepName,
      SalesRepPhoneNumber,
    });

    // Save the new supplier to the database
    await newSupplier.save();

    // Respond with a success message
    return res.status(201).json({ success: true, message: 'Supplier created successfully.' });
  } catch (error) {
    console.error('Error creating supplier:', error);
    // Respond with an error message
    return res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
};

// Export the controller
export { createSupplier };


// Controller to get all suppliers
const getAllSuppliers = async (req, res) => {
    try {
      // Retrieve all suppliers from the database
      const suppliers = await Supplier.find();
  
      // Respond with the list of suppliers
      return res.status(200).json({ success: true, data: suppliers });
    } catch (error) {
      console.error('Error getting suppliers:', error);
      // Respond with an error message
      return res.status(500).json({ success: false, message: 'Internal Server Error.' });
    }
  };
  
  // Export the controller
  export { getAllSuppliers };

 

 


// READ - Get a specific supplier by ID
export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    if (supplier) {
      res.status(200).json(supplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE - Update a supplier by ID
export const updateSupplierById = async (req, res) => {
  try {
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (updatedSupplier) {
      res.status(200).json(updatedSupplier);
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE - Delete a supplier by ID


export const deleteSupplierById = async (req, res) => {
  try {
    const deletedSupplier = await Supplier.findByIdAndDelete(req.params.id);
    if (deletedSupplier) {
      res.status(200).json({ message: 'Supplier deleted successfully' });
    } else {
      res.status(404).json({ message: 'Supplier not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
