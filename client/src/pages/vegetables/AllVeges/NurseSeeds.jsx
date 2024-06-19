import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const NurseSeed = () => {
  const [vegetableOptions, setVegetableOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [formData, setFormData] = useState({
    vegetable: '',
    variety: '',
    batchNumber: '',
    quantityNursed: '',
    startDate: '',
    expectedTransplantingDate: '',
    additionalDetails: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchVegetableOptions();
  }, []);

  const fetchVegetableOptions = async () => {
    try {
      const response = await fetch('/api/all-vegetables');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetables');
      }
      const vegetables = await response.json();
      const options = vegetables.map((vegetable) => ({ value: vegetable.name, label: vegetable.name }));
      setVegetableOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchBatchOptions = async (vegetableName) => {
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
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create-vege-nursing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create vegetable nursing record');
      }
      setSuccessMessage('Vegetable nursing record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/all-farm-activities';
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
      <h1 className="mt-5 mb-4">Nurse Seed</h1>
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
              <Label for="vegetable">Vegetable</Label>
              <Select
                id="vegetable"
                options={vegetableOptions}
                onChange={(selectedOption) => {
                  handleInputChange(selectedOption, 'vegetable');
                  fetchBatchOptions(selectedOption.value);
                }}
                isSearchable
                placeholder="Select Vegetable"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="variety">Variety</Label>
              <Input
                type="text"
                id="variety"
                value={formData.variety}
                onChange={(e) => handleInputChangeText(e, 'variety')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
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
          <Col md={6}>
            <FormGroup>
              <Label for="quantityNursed">Quantity Nursed</Label>
              <Input
                 type="text"
                id="quantityNursed"
                value={formData.quantityNursed}
                onChange={(e) => handleInputChangeText(e, 'quantityNursed')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input
                type="date"
                id="startDate"
                value={formData.startDate}
                onChange={(e) => handleInputChangeText(e, 'startDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="expectedTransplantingDate">Expected Transplanting Date</Label>
              <Input
                type="date"
                id="expectedTransplantingDate"
                value={formData.expectedTransplantingDate}
                onChange={(e) => handleInputChangeText(e, 'expectedTransplantingDate')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormGroup>
              <Label for="additionalDetails">Additional Details</Label>
              <Input
                type="textarea"
                id="additionalDetails"
                value={formData.additionalDetails}
                onChange={(e) => handleInputChangeText(e, 'additionalDetails')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submit</Button>
      </Form>
      
    </Container>
  );
};

export default NurseSeed;
