import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const RecordOtherPayments = () => {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchEmployeeOptions();
    fetchCategoryOptions();
  }, []);

  const fetchEmployeeOptions = async () => {
    try {
      const response = await fetch('/api/employees');
      if (!response.ok) {
        throw new Error('Failed to fetch employees');
      }
      const employees = await response.json();
      const sortedEmployees = employees.sort((a, b) => a.lastName.localeCompare(b.lastName));
      const options = sortedEmployees.map((employee) => ({
        value: `${employee.firstName} ${employee.lastName}`, // Use employee ID as the value
        label: `${employee.firstName} ${employee.lastName}`,
      }));
      setEmployeeOptions(options);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
      setErrorMessage('Failed to fetch employees');
    }
  };

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch('/api/finance-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const categories = await response.json();
      const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedCategories.map((category) => ({
        value: category.name,
        label: category.name.replace('Benefit', ''), // Remove 'Benefit' from label
      }));
      setCategoryOptions(options);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      setErrorMessage('Failed to fetch categories');
    }
  };

  const handleEmployeeChange = (selectedOption) => {
    setSelectedEmployee(selectedOption);
  };

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/other-payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          employeeId: selectedEmployee.value, // Include selected employee ID
          category: selectedCategory.value,
          amount: parseFloat(amount),
          paymentDate: new Date(paymentDate),
          description: description.trim(),
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to record payment');
      }
      // Reset form state
      setSelectedEmployee(null);
      setSelectedCategory(null);
      setAmount('');
      setPaymentDate('');
      setDescription('');
      setErrorMessage('');
      alert('Payment recorded successfully!');
    } catch (error) {
      console.error('Error recording payment:', error.message);
      setErrorMessage('Failed to record payment');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Record Other Payments</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Select Employee</label>
            <Select
              options={employeeOptions}
              value={selectedEmployee}
              onChange={handleEmployeeChange}
              placeholder="Select Employee"
            />
          </div>
          <div className="col-md-6">
            <label>Select Category</label>
            <Select
              options={categoryOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
              placeholder="Select Category"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label>Amount</label>
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              required
            />
          </div>
          <div className="col-md-6">
            <label>Payment Date</label>
            <input
              type="date"
              className="form-control"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Description"
          />
        </div>
        <button type="submit" className="btn btn-primary">Record Payment</button>
      </form>
    </div>
  );
};

export default RecordOtherPayments;
