import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const AddVegeExpense = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [vegetableOptions, setVegetableOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    vegetable: '',
    batchNumber: '',
    description: '',
    amount: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategoryOptions();
  }, []);

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch('/api/all-expense-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch expense categories');
      }
      const categories = await response.json();
      
      // Sort categories alphabetically by name
      categories.sort((a, b) => a.name.localeCompare(b.name));
      
      const options = categories.map((category) => ({ value: category.name, label: category.name }));
      setCategoryOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const fetchVegetableOptions = async () => {
    try {
      const response = await fetch('/api/all-vegetables');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetables');
      }
      const vegetables = await response.json();
      
      // Sort vegetables alphabetically by name
      vegetables.sort((a, b) => a.name.localeCompare(b.name));
      
      const options = vegetables.map((vegetable) => ({ value: vegetable.name, label: vegetable.name }));
      setVegetableOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const fetchBatchOptions = async (vegetableName) => {
    // Fetch batch numbers based on selected vegetable
    try {
      const response = await fetch(`/api/all-batches/${vegetableName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batches');
      }
      const batches = await response.json();
      const options = batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
    if (field === 'category') {
      setVegetableOptions([]); // Clear vegetable options when category changes
      setBatchOptions([]); // Clear batch options when category changes
      fetchVegetableOptions();
    } else if (field === 'vegetable') {
      setBatchOptions([]); // Clear batch options when vegetable changes
      if (selectedOption.value !== 'All-Vegetables') {
        fetchBatchOptions(selectedOption.value);
      }
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-vege-expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create vegetable expense record');
      }
      setSuccessMessage('Vegetable expense record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/finance-veges';
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Add Vegetable Expense</h1>
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
              <Label for="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => handleInputChangeText(e, 'date')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="category">Category</Label>
              <Select
                id="category"
                options={categoryOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'category')}
                isSearchable
                placeholder="Select Category"
              />
            </FormGroup>
          </Col>
          {formData.category && !['Irrigation and Water Management', 'Equipment and Machinery','Farm Infrastructure', 'Miscellaneous','Fuel and oil'].includes(formData.category) && (
            <>
              <Col md={6}>
                <FormGroup>
                  <Label for="vegetable">Vegetable</Label>
                  <Select
                    id="vegetable"
                    options={vegetableOptions}
                    onChange={(selectedOption) => handleInputChange(selectedOption, 'vegetable')}
                    isSearchable
                    placeholder="Select Vegetable"
                  />
                </FormGroup>
              </Col>
              {formData.vegetable !== 'All-Vegetables' && (
                <Col md={6}>
                  <FormGroup>
                    <Label for="batchNumber">Batch Number</Label>
                    <Select
                      id="batchNumber"
                      options={batchOptions}
                      onChange={(selectedOption) => handleInputChange(selectedOption, 'batchNumber')}
                      isSearchable
                      placeholder="Select Batch Number"
                    />
                  </FormGroup>
                </Col>
              )}
            </>
          )}
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChangeText(e, 'description')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                value={formData.amount}
                onChange={(e) => handleInputChangeText(e, 'amount')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default AddVegeExpense;
