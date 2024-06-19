import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const VegeDirectPlanting = () => {
  const [vegetableOptions, setVegetableOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [formData, setFormData] = useState({
    vegetable: '',
    batchNumber: '',
    quantityDirectPlanted: '',
    plantingDate: '',
    expectedHarvestDate: '',
    numberOfBeds: '',
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
      const response = await fetch('/api/create-vege-direct-planting', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create vege direct planting record');
      }
      setSuccessMessage('Vegetable direct planting record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/all-farm-activities';
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Vegetable Direct Planting</h1>
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
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="quantityDirectPlanted">Quantity Direct Planted</Label>
              <Input
                type="text"
                id="quantityDirectPlanted"
                value={formData.quantityDirectPlanted}
                onChange={(e) => handleInputChangeText(e, 'quantityDirectPlanted')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="plantingDate">Planting Date</Label>
              <Input
                type="date"
                id="plantingDate"
                value={formData.plantingDate}
                onChange={(e) => handleInputChangeText(e, 'plantingDate')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="expectedHarvestDate">Expected Harvest Date</Label>
              <Input
                type="date"
                id="expectedHarvestDate"
                value={formData.expectedHarvestDate}
                onChange={(e) => handleInputChangeText(e, 'expectedHarvestDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="numberOfBeds">Number of Beds</Label>
              <Input
                type="number"
                id="numberOfBeds"
                value={formData.numberOfBeds}
                onChange={(e) => handleInputChangeText(e, 'numberOfBeds')}
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

export default VegeDirectPlanting;
