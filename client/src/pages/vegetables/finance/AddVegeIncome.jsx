import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const AddCabbageIncome = () => {
  const [batchOptions, setBatchOptions] = useState([]);
  const [vegetableOptions, setVegetableOptions] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    batchNumber: '',
    vegetable: '',
    quantitySold: '',
    pricePerBag: '',
    additionalInformation: ''
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
    if (field === 'vegetable') {
      setBatchOptions([]); // Clear batch options when vegetable changes
      fetchBatchOptions(selectedOption.value);
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-vegetable-sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create cabbage income record');
      }
      setSuccessMessage('Vegetable Income Record Created Successfully');
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
      <h1 className="mt-5 mb-4">Add Vegetable Sales</h1>
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
              <Label for="vegetable">Vegetable</Label>
              <Select
                id="vegetable"
                options={vegetableOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'vegetable')}
                isSearchable
                placeholder="Select Vegetable"
                required
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
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="quantitySold">Quantity Sold</Label>
              <Input
                type="number"
                id="quantitySold"
                value={formData.quantitySold}
                onChange={(e) => handleInputChangeText(e, 'quantitySold')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="pricePerBag">Price Per Bag</Label>
              <Input
                type="number"
                id="pricePerBag"
                value={formData.pricePerBag}
                onChange={(e) => handleInputChangeText(e, 'pricePerBag')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="additionalInformation">Additional Information</Label>
              <Input
                type="textarea"
                id="additionalInformation"
                value={formData.additionalInformation}
                onChange={(e) => handleInputChangeText(e, 'additionalInformation')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default AddCabbageIncome;
