import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const CashCropPlanting = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [cashCropOptions, setCashCropOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    batchNumber: '',
    datePlanted: '',
    areaPlanted: '',
    expectedMaturityDate: '',
    recordedBy: currentUser ? currentUser.userName : '', // Default value will be set to currentUser.userName
    numberPlanted: '',
    additionalInformation: '',
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

  const fetchBatchOptions = async (cashCropName) => {
    try {
      const response = await fetch(`/api/cashcrop-batches/${cashCropName}`);
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
      const response = await fetch('/api/add-cash-crop-plantings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create cash crop planting record');
      }
      setSuccessMessage('Cash crop planting record created successfully');
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
      <h1 className="mt-5 mb-4">Cash Crop Planting</h1>
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
              <Label for="type">Cash Crop</Label>
              <Select
                id="type"
                options={cashCropOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'type')}
                isSearchable
                placeholder="Select Cash Crop"
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
              <Label for="datePlanted">Date Planted</Label>
              <Input
                type="date"
                id="datePlanted"
                value={formData.datePlanted}
                onChange={(e) => handleInputChangeText(e, 'datePlanted')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="areaPlanted">Space Planted</Label>
              <Input
                type="text"
                id="areaPlanted"
                value={formData.areaPlanted}
                onChange={(e) => handleInputChangeText(e, 'areaPlanted')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="expectedMaturityDate">Expected Maturity Date</Label>
              <Input
                type="date"
                id="expectedMaturityDate"
                value={formData.expectedMaturityDate}
                onChange={(e) => handleInputChangeText(e, 'expectedMaturityDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="recordedBy">Recorded By</Label>
              <Input
                type="text"
                id="recordedBy"
                value={formData.recordedBy} // This will be automatically populated with currentUser.userName
                onChange={(e) => handleInputChangeText(e, 'recordedBy')}
                required
                disabled // Prevents user from editing this field
              />
            </FormGroup>
          </Col>
        </Row>
        {formData.type !== 'Maize' && (
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="numberPlanted">Number Planted</Label>
                <Input
                  type="number"
                  id="numberPlanted"
                  value={formData.numberPlanted}
                  onChange={(e) => handleInputChangeText(e, 'numberPlanted')}
                />
              </FormGroup>
            </Col>
          </Row>
        )}
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

export default CashCropPlanting;
