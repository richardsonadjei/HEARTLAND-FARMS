import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const RecordBirdSale = () => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    batchNumber: '',
    saleDate: '',
    customerName: '',
    additionalDetails: '', // New field for additional details
    batchDetails: [
      {
        gender: 'male',
        quantity: 0,
        pricePerBird: 0,
      },
      {
        gender: 'female',
        quantity: 0,
        pricePerBird: 0,
      },
    ],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTypeOptions();
  }, []);

  useEffect(() => {
    if (formData.type) {
      fetchBatchNumberOptions();
    }
  }, [formData.type]);

  const fetchTypeOptions = async () => {
    try {
      const response = await fetch('/api/all-birds-types');
      if (!response.ok) {
        throw new Error('Failed to fetch bird types');
      }
      const types = await response.json();
      const sortedTypes = types.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedTypes.map((type) => ({ value: type.name, label: type.name }));
      setTypeOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchBatchNumberOptions = async () => {
    try {
      const response = await fetch('/api/all-bird-batches');
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const options = batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchNumberOptions(options);
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

  const handleQuantityChange = (e, gender) => {
    const updatedBatchDetails = formData.batchDetails.map((detail) =>
      detail.gender === gender ? { ...detail, quantity: parseInt(e.target.value) } : detail
    );
    setFormData({ ...formData, batchDetails: updatedBatchDetails });
  };

  const handlePriceChange = (e, gender) => {
    const updatedBatchDetails = formData.batchDetails.map((detail) =>
      detail.gender === gender ? { ...detail, pricePerBird: parseFloat(e.target.value) } : detail
    );
    setFormData({ ...formData, batchDetails: updatedBatchDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/birds-sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to record bird sale');
      }
      setSuccessMessage('Bird sale recorded successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
        window.location.reload();
      }, 100000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Record Bird Sale</h1>
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
              <Label for="type">Type</Label>
              <Select
                id="type"
                options={typeOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'type')}
                isSearchable
                placeholder="Select Type"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="batchNumber">Batch Number</Label>
              <Select
                id="batchNumber"
                options={batchNumberOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'batchNumber')}
                is                Searchable
                placeholder="Select Batch Number"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="saleDate">Sale Date</Label>
              <Input
                type="date"
                id="saleDate"
                value={formData.saleDate}
                onChange={(e) => handleInputChangeText(e, 'saleDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="customerName">Customer Name</Label>
              <Input
                type="text"
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChangeText(e, 'customerName')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="maleQuantity">Male Quantity</Label>
              <Input
                type="number"
                id="maleQuantity"
                value={formData.batchDetails[0].quantity}
                onChange={(e) => handleQuantityChange(e, 'male')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="femaleQuantity">Female Quantity</Label>
              <Input
                type="number"
                id="femaleQuantity"
                value={formData.batchDetails[1].quantity}
                onChange={(e) => handleQuantityChange(e, 'female')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="malePrice">Male Price</Label>
              <Input
                type="number"
                id="malePrice"
                value={formData.batchDetails[0].pricePerBird}
                onChange={(e) => handlePriceChange(e, 'male')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="femalePrice">Female Price</Label>
              <Input
                type="number"
                id="femalePrice"
                value={formData.batchDetails[1].pricePerBird}
                onChange={(e) => handlePriceChange(e, 'female')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
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

export default RecordBirdSale;

