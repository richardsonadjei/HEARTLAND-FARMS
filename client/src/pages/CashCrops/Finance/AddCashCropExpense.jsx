import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const AddCashCropExpense = () => {
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [cropOptions, setCropOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [formData, setFormData] = useState({
    date: '', // New field: date
    category: '',
    type: '',
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
      const options = categories.map((category) => ({ value: category.name, label: category.name }));
      setCategoryOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchCropOptions = async () => {
    try {
      const response = await fetch('/api/all-cashcrops');
      if (!response.ok) {
        throw new Error('Failed to fetch crops');
      }
      const crops = await response.json();
      const options = crops.map((crop) => ({ value: crop.name, label: crop.name }));
      setCropOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchBatchOptions = async (cropName) => {
    try {
      const response = await fetch(`/api/cashcrop-batches/${cropName}`);
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
      setCropOptions([]);
      setBatchOptions([]);
      fetchCropOptions();
    } else if (field === 'type') {
      setBatchOptions([]);
      fetchBatchOptions(selectedOption.value);
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-cashcrop-expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create cash crop expense record');
      }
      setSuccessMessage('Cash crop expense record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/cashCrop-finance-home';
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
      <h1 className="mt-5 mb-4">Add Cash Crop Expense</h1>
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
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
          {formData.category && !['Irrigation and Water Management', 'Equipment and Machinery', 'Transportation', 'Miscellaneous'].includes(formData.category) && (
            <>
              <Col md={6}>
                <FormGroup>
                  <Label for="type">Crop</Label>
                  <Select
                    id="type"
                    options={cropOptions}
                    onChange={(selectedOption) => handleInputChange(selectedOption, 'type')}
                    isSearchable
                    placeholder="Select Crop"
                  />
                </FormGroup>
              </Col>
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

export default AddCashCropExpense;
