import Department from "../models/departments.model.js";
import HRFinanceCategory from "../models/hrFinanceCategories.model.js";
import Employee from "../models/newEmployee.model.js";
import OtherPayments from "../models/otherEmployeePayment.model.js";
import Payroll from "../models/payroll.model.js";
import Position from "../models/positions.model.js";


// Controller function to create a new employee
const createEmployee = async (req, res) => {
  try {
    const employee = await Employee.create(req.body);
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createEmployee };


// Controller function to get all employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get a single employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getEmployees, getEmployeeById };



// Controller function to update an employee by ID
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { updateEmployee };



// Controller function to delete an employee by ID
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { deleteEmployee };



// Controller to create a new department
export const createDepartment = async (req, res) => {
  const { name, description } = req.body;

  try {
    // Check if department with the same name already exists
    const existingDepartment = await Department.findOne({ name });
    if (existingDepartment) {
      return res.status(400).json({ message: 'Department with this name already exists' });
    }

    // Create new department instance
    const newDepartment = new Department({
      name,
      description,
      isActive: true // Default to active
    });

    // Save the department to the database
    await newDepartment.save();

    res.status(201).json(newDepartment); // Return the newly created department
  } catch (error) {
    console.error('Error creating department:', error);
    res.status(500).json({ message: 'Failed to create department' });
  }
};

// Controller to get all departments
export const getDepartments = async (req, res) => {
    try {
      const departments = await Department.find();
      res.status(200).json(departments); // Return array of departments
    } catch (error) {
      console.error('Error fetching departments:', error);
      res.status(500).json({ message: 'Failed to fetch departments' });
    }
  };

  
  // Controller to get a department by ID
export const getDepartmentById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const department = await Department.findById(id);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
      res.status(200).json(department); // Return the department object
    } catch (error) {
      console.error('Error fetching department by ID:', error);
      res.status(500).json({ message: 'Failed to fetch department' });
    }
  };

  
  // Controller to update a department
export const updateDepartment = async (req, res) => {
    const { id } = req.params;
    const { name, description, isActive } = req.body;
  
    try {
      const department = await Department.findById(id);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      department.name = name;
      department.description = description;
      department.isActive = isActive;
  
      await department.save();
  
      res.status(200).json(department); // Return the updated department
    } catch (error) {
      console.error('Error updating department:', error);
      res.status(500).json({ message: 'Failed to update department' });
    }
  };

  
  // Controller to delete a department
export const deleteDepartment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const department = await Department.findById(id);
      if (!department) {
        return res.status(404).json({ message: 'Department not found' });
      }
  
      await department.remove();
  
      res.status(200).json({ message: 'Department deleted successfully' });
    } catch (error) {
      console.error('Error deleting department:', error);
      res.status(500).json({ message: 'Failed to delete department' });
    }
  };
  


// Controller function to create a new position
export const createPosition = async (req, res) => {
  const { title, description } = req.body;

  try {
    // Validate title presence
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Check if position with the same title already exists
    const existingPosition = await Position.findOne({ title });
    if (existingPosition) {
      return res.status(400).json({ error: 'Position with this title already exists' });
    }

    // Create new position
    const newPosition = new Position({ title, description });
    await newPosition.save();
    res.status(201).json(newPosition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get all positions
export const getPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to update a position by ID
export const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const updatedPosition = await Position.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );
    res.status(200).json(updatedPosition);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to delete a position by ID
export const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;
    await Position.findByIdAndDelete(id);
    res.status(200).json({ message: 'Position deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Create a new finance category
export const createFinanceCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new HRFinanceCategory({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: 'Error creating finance category', error });
  }
};

// Read all finance categories
export const getFinanceCategories = async (req, res) => {
  try {
    const categories = await HRFinanceCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching finance categories', error });
  }
};

// Read a single finance category by ID
export const getFinanceCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await HRFinanceCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Finance category not found' });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching finance category', error });
  }
};

// Update a finance category
export const updateFinanceCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const category = await HRFinanceCategory.findById(id);
    if (!category) {
      return res.status(404).json({ message: 'Finance category not found' });
    }

    category.name = name || category.name;
    category.description = description || category.description;
    await category.save();

    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Error updating finance category', error });
  }
};

// Delete a finance category
export const deleteFinanceCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await HRFinanceCategory.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: 'Finance category not found' });
    }
    res.status(200).json({ message: 'Finance category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting finance category', error });
  }
};




// Create a new payroll record
export const createPayroll = async (req, res) => {
  const { employeeId, payPeriodStart, payPeriodEnd, baseSalary, otherBenefits, deductions } = req.body;

  try {
    const payroll = new Payroll({
      employeeId,
      payPeriodStart,
      payPeriodEnd,
      baseSalary,
      otherBenefits,
      deductions
    });
    
    await payroll.save();
    res.status(201).json(payroll);
  } catch (error) {
    res.status(400).json({ message: 'Error creating payroll record', error });
  }
};

// Read all payroll records
export const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find();
    res.status(200).json(payrolls);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payrolls', error });
  }
};

// Read a single payroll record by ID
export const getPayrollById = async (req, res) => {
  const { id } = req.params;

  try {
    const payroll = await Payroll.findById(id);
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }
    res.status(200).json(payroll);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payroll record', error });
  }
};

// Update a payroll record
export const updatePayroll = async (req, res) => {
  const { id } = req.params;
  const { employeeId, payPeriodStart, payPeriodEnd, baseSalary, otherBenefits, deductions } = req.body;

  try {
    const payroll = await Payroll.findById(id);
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }

    payroll.employeeId = employeeId;
    payroll.payPeriodStart = payPeriodStart;
    payroll.payPeriodEnd = payPeriodEnd;
    payroll.baseSalary = baseSalary;
    payroll.otherBenefits = otherBenefits;
    payroll.deductions = deductions;

    await payroll.save();
    res.status(200).json(payroll);
  } catch (error) {
    res.status(400).json({ message: 'Error updating payroll record', error });
  }
};

// Delete a payroll record
export const deletePayroll = async (req, res) => {
  const { id } = req.params;

  try {
    const payroll = await Payroll.findByIdAndDelete(id);
    if (!payroll) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }
    res.status(200).json({ message: 'Payroll record deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting payroll record', error });
  }
};


// Controller functions

// Create a new other payment record
const createOtherPayment = async (req, res) => {
  try {
    const { employeeId, category, amount, paymentDate, description } = req.body;

    const newPayment = new OtherPayments({
      employeeId,
      category,
      amount,
      paymentDate: paymentDate || Date.now(), // Use provided paymentDate or default to current date
      description
    });

    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all other payments
const getAllOtherPayments = async (req, res) => {
  try {
    const payments = await OtherPayments.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Controller to get all other payments for a particular employee
const getOtherPaymentsForEmployee = async (req, res) => {
  const { employeeId } = req.params; // Assuming employeeId is passed as a URL parameter
  try {
    // Find all other payments where employeeId matches
    const payments = await OtherPayments.find({ employeeId });

    if (!payments) {
      return res.status(404).json({ message: 'No payments found for this employee' });
    }

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getOtherPaymentsForEmployee };


// Get a single other payment by ID
const getOtherPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await OtherPayments.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an existing other payment record
const updateOtherPayment = async (req, res) => {
  const { id } = req.params;
  const { employeeId, category, amount, paymentDate, description } = req.body;

  try {
    const updatedPayment = await OtherPayments.findByIdAndUpdate(
      id,
      {
        employeeId,
        category,
        amount,
        paymentDate: paymentDate || Date.now(),
        description
      },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    res.status(200).json(updatedPayment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an existing other payment record
const deleteOtherPayment = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPayment = await OtherPayments.findByIdAndDelete(id);
    if (!deletedPayment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createOtherPayment, getAllOtherPayments, getOtherPaymentById, updateOtherPayment, deleteOtherPayment };
