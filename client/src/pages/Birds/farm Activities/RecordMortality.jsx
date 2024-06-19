import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const RecordBirdMortality = () => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    batchNumber: '',
    mortalityDate: '',
    causeOfDeath: '',
    notes: '',
    batchDetails: [
      {
        gender: 'male',
        quantity: 0,
      },
      {
        gender: 'female',
        quantity: 0,
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
      fetchBatchNumberOptions(formData.type);
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

  const fetchBatchNumberOptions = async (selectedType) => {
    try {
      const response = await fetch('/api/all-bird-batches');
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const filteredBatches = batches.filter(batch => batch.type === selectedType);
      const options = filteredBatches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bird-mortality', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to record bird mortality');
      }
      setSuccessMessage('Bird mortality recorded successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Record Bird Mortality</h1>
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
                required
              />
            </FormGroup>
          </Col>
          {formData.type && (
            <Col md={6}>
              <FormGroup>
                <Label for="batchNumber">Batch Number</Label>
                <Select
                  id="batchNumber"
                  options={batchNumberOptions}
                  onChange={(selectedOption) => handleInputChange(selectedOption, 'batchNumber')}
                  isSearchable
                  placeholder="Select Batch Number"
                  required
                />
              </FormGroup>
            </Col>
          )}
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="mortalityDate">Mortality Date</Label>
              <Input
                type="date"
                id="mortalityDate"
                value={formData.mortalityDate}
                onChange={(e) => handleInputChangeText(e, 'mortalityDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="causeOfDeath">Cause of Death</Label>
              <Input
                type="text"
                id="causeOfDeath"
                value={formData.causeOfDeath}
                onChange={(e) => handleInputChangeText(e, 'causeOfDeath')}
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
          <Col md={12}>
            <FormGroup>
              <Label for="notes">Notes</Label>
              <Input
                type="textarea"
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChangeText(e, 'notes')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default RecordBirdMortality;
