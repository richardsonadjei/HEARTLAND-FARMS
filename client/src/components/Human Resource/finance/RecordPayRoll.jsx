import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'; // Import icons for add and remove functionality

const AddPayroll = () => {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [benefitCategoryOptions, setBenefitCategoryOptions] = useState([]);
  const [deductionCategoryOptions, setDeductionCategoryOptions] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: '',
    payPeriodStart: '',
    payPeriodEnd: '',
    baseSalary: '',
    otherBenefits: [],
    deductions: [],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchEmployeeOptions();
    fetchBenefitCategoryOptions();
    fetchDeductionCategoryOptions();
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
        value: `${employee.firstName} ${employee.lastName}`, // Concatenate first name and last name
        label: `${employee.firstName} ${employee.lastName}`,
      }));
      setEmployeeOptions(options);
    } catch (error) {
      console.error('Error fetching employees:', error.message);
    }
  };

  const fetchBenefitCategoryOptions = async () => {
    try {
      const response = await fetch('/api/finance-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch benefit categories');
      }
      const categories = await response.json();
      const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedCategories.map((category) => ({ value: category.name, label: category.name }));
      setBenefitCategoryOptions(options);
    } catch (error) {
      console.error('Error fetching benefit categories:', error.message);
    }
  };

  const fetchDeductionCategoryOptions = async () => {
    try {
      const response = await fetch('/api/finance-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch deduction categories');
      }
      const categories = await response.json();
      const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedCategories.map((category) => ({ value: category.name, label: category.name }));
      setDeductionCategoryOptions(options);
    } catch (error) {
      console.error('Error fetching deduction categories:', error.message);
    }
  };

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleAddBenefit = () => {
    const newBenefit = { category: '', amount: 0 };
    setFormData({ ...formData, otherBenefits: [...formData.otherBenefits, newBenefit] });
  };

  const handleAddDeduction = () => {
    const newDeduction = { category: '', amount: 0 };
    setFormData({ ...formData, deductions: [...formData.deductions, newDeduction] });
  };

  const handleRemoveBenefit = (index) => {
    const updatedBenefits = [...formData.otherBenefits];
    updatedBenefits.splice(index, 1);
    setFormData({ ...formData, otherBenefits: updatedBenefits });
  };

  const handleRemoveDeduction = (index) => {
    const updatedDeductions = [...formData.deductions];
    updatedDeductions.splice(index, 1);
    setFormData({ ...formData, deductions: updatedDeductions });
  };

  const handleBenefitChange = (selectedOption, index) => {
    const updatedBenefits = [...formData.otherBenefits];
    updatedBenefits[index].category = selectedOption.value;
    setFormData({ ...formData, otherBenefits: updatedBenefits });
  };

  const handleDeductionChange = (selectedOption, index) => {
    const updatedDeductions = [...formData.deductions];
    updatedDeductions[index].category = selectedOption.value;
    setFormData({ ...formData, deductions: updatedDeductions });
  };

  const handleAmountChange = (e, index, type) => {
    const amount = parseFloat(e.target.value);
    if (type === 'benefit') {
      const updatedBenefits = [...formData.otherBenefits];
      updatedBenefits[index].amount = amount;
      setFormData({ ...formData, otherBenefits: updatedBenefits });
    } else if (type === 'deduction') {
      const updatedDeductions = [...formData.deductions];
      updatedDeductions[index].amount = amount;
      setFormData({ ...formData, deductions: updatedDeductions });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/payrolls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create payroll record');
      }
      setSuccessMessage('Payroll record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
        // Handle error state
      }, 1000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Add Payroll Record</h1>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="employee">Employee</Label>
              <Select
                id="employee"
                options={employeeOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'employeeId')}
                getOptionValue={(option) => option.label} // Specify how to get the value of each option
                isSearchable
                placeholder="Select Employee"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="payPeriodStart">Pay Period Start</Label>
              <Input
                type="date"
                id="payPeriodStart"
                value={formData.payPeriodStart}
                onChange={(e) => handleInputChangeText(e, 'payPeriodStart')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="payPeriodEnd">Pay Period End</Label>
              <Input
                type="date"
                id="payPeriodEnd"
                value={formData.payPeriodEnd}
                onChange={(e) => handleInputChangeText(e, 'payPeriodEnd')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="baseSalary">Base Salary</Label>
              <Input
                type="number"
                id="baseSalary"
                value={formData.baseSalary}
                onChange={(e) => handleInputChangeText(e, 'baseSalary')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label>Other Benefits</Label>
              {formData.otherBenefits.map((benefit, index) => (
                <div key={`benefit-${index}`} className="d-flex mb-2 align-items-center">
                  <Select
                    options={benefitCategoryOptions}
                    onChange={(selectedOption) => handleBenefitChange(selectedOption, index)}
                    value={benefitCategoryOptions.find((option) => option.value === benefit.category)}
                    isSearchable
                    placeholder="Select Benefit Category"
                    style={{ flex: '1 1 60%' }} // Adjust width of select field
                    className="mr-2"
                  />
                  <Input
                    type="number"
                    value={benefit.amount}
                    onChange={(e) => handleAmountChange(e, index, 'benefit')}
                    placeholder="Enter Amount"
                    style={{ flex: '1 1 40%', marginLeft: '10px' }} // Adjust width of input field
                    className="flex-grow-1"
                  />
                                    <Button
                    color="link"
                    onClick={() => handleRemoveBenefit(index)}
                    className="p-0 text-danger ml-2"
                    title="Remove Benefit"
                  >
                    <FaMinusCircle size={20} />
                  </Button>
                </div>
              ))}
              <Button color="link" onClick={handleAddBenefit} className="p-0 text-primary">
                <FaPlusCircle size={20} /> Add Benefit
              </Button>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label>Deductions</Label>
              {formData.deductions.map((deduction, index) => (
                <div key={`deduction-${index}`} className="d-flex mb-2 align-items-center">
                  <Select
                    options={deductionCategoryOptions}
                    onChange={(selectedOption) => handleDeductionChange(selectedOption, index)}
                    value={deductionCategoryOptions.find((option) => option.value === deduction.category)}
                    isSearchable
                    placeholder="Select Deduction Category"
                    style={{ flex: '1 1 70%' }} // Adjust width of select field
                    className="mr-2"
                  />
                  <Input
                    type="number"
                    value={deduction.amount}
                    onChange={(e) => handleAmountChange(e, index, 'deduction')}
                    placeholder="Enter Amount"
                    style={{ flex: '1 1 30%', marginLeft: '10px' }} // Adjust width of input field
                    className="flex-grow-1"
                  />
                  <Button
                    color="link"
                    onClick={() => handleRemoveDeduction(index)}
                    className="p-0 text-danger ml-2"
                    title="Remove Deduction"
                  >
                    <FaMinusCircle size={20} />
                  </Button>
                </div>
              ))}
              <Button color="link" onClick={handleAddDeduction} className="p-0 text-primary">
                <FaPlusCircle size={20} /> Add Deduction
              </Button>
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default AddPayroll;

