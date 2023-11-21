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

 


// Controller to update a supplier's details
const updateSupplier = async (req, res) => {
  const { SupplierName } = req.params;

  try {
    // Check if the supplier with the given name exists
    const existingSupplier = await Supplier.findOne({ SupplierName });

    if (!existingSupplier) {
      return res.status(404).json({ success: false, message: 'Supplier not found.' });
    }

    // Extract updated data from the request body
    const {
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

    // Update the supplier's details
    existingSupplier.StreetAddress = StreetAddress;
    existingSupplier.City = City;
    existingSupplier.Region = Region;
    existingSupplier.GhanaPostGPS = GhanaPostGPS;
    existingSupplier.Country = Country;
    existingSupplier.PhoneNumber = PhoneNumber;
    existingSupplier.Email = Email;
    existingSupplier.SalesRepName = SalesRepName;
    existingSupplier.SalesRepPhoneNumber = SalesRepPhoneNumber;

    // Save the updated supplier to the database
    await existingSupplier.save();

    // Respond with a success message
    return res.status(200).json({ success: true, message: 'Supplier updated successfully.' });
  } catch (error) {
    console.error('Error updating supplier:', error);
    // Respond with an error message
    return res.status(500).json({ success: false, message: 'Internal Server Error.' });
  }
};

// Export the controller
export { updateSupplier };
