import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, } from 'reactstrap';
import Select from 'react-select';

const CashCropPestAndDiseaseControl = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [cashCropOptions, setCashCropOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    batchNumber: '',
    date: '',
    pestOrDiseaseName: '',
    controlMethod: '',
    controlAgentUsed: '',
    quantityUsed: '',
    spaceAffected: '',
    applicationMethod: 'Spraying',
    recordedBy: currentUser ? currentUser.userName : '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCashCropOptions();
  }, []);

  const fetchCashCropOptions = async () => {
    try {
      const response = await fetch('/api/all-cashcrops');
      if (!response.ok) {
        throw new Error('Failed to fetch cash crops');
      }
      const cashCrops = await response.json();
      const options = cashCrops.map((cashCrop) => ({ value: cashCrop.name, label: cashCrop.name }));
      setCashCropOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchBatchOptions = async (cashCropType) => {
    try {
      const response = await fetch(`/api/cashcrop-batches/${cashCropType}`);
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
    if (field === 'type') {
      fetchBatchOptions(selectedOption.value);
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/pest-disease-control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create pest and disease control record');
      }
      setSuccessMessage('Pest and disease control record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/cash-crops-farm-activities';
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
      <h1 className="mt-5 mb-4">Cash Crop Pest and Disease Control</h1>
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
              <Label for="type">Cash Crop Type</Label>
              <Select
                id="type"
                options={cashCropOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'type')}
                isSearchable
                placeholder="Select Cash Crop Type"
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
  <Label for="pestOrDiseaseName">Pest or Disease Name</Label>
  <textarea
    id="pestOrDiseaseName"
    value={formData.pestOrDiseaseName}
    onChange={(e) => handleInputChangeText(e, 'pestOrDiseaseName')}
    required
    placeholder="Enter Pest or Disease Name"
  />
</FormGroup>

          </Col>
        </Row>
        <Row>
          <Col md={6}>
          <FormGroup>
  <Label for="controlMethod">Control Method</Label>
  <textarea
    id="controlMethod"
    value={formData.controlMethod}
    onChange={(e) => handleInputChangeText(e, 'controlMethod')}
    required
    placeholder="Describe the method used to control the pest or disease"
  />
</FormGroup>

          </Col>
          <Col md={6}>
          <FormGroup>
  <Label for="controlAgentUsed">Control Agent Used</Label>
  <textarea
    id="controlAgentUsed"
    value={formData.controlAgentUsed}
    onChange={(e) => handleInputChangeText(e, 'controlAgentUsed')}
    required
    placeholder="Enter Control Agent Used: Name, Expiry Dates etc"
  />
</FormGroup>

          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="quantityUsed">Quantity Used</Label>
              <Input
                type="text"
                id="quantityUsed"
                value={formData.quantityUsed}
                onChange={(e) => handleInputChangeText(e, 'quantityUsed')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="spaceAffected">Space Affected</Label>
              <Input
                type="text"
                id="spaceAffected"
                value={formData.spaceAffected}
                onChange={(e) => handleInputChangeText(e, 'spaceAffected')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="recordedBy">Recorded By</Label>
              <Input
                type="text"
                id="recordedBy"
                value={formData.recordedBy}
                onChange={(e) => handleInputChangeText(e, 'recordedBy')}
                required
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default CashCropPestAndDiseaseControl;
