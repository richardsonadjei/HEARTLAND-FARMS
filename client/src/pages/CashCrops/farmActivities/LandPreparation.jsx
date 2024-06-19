import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const CashCropLandPreparation = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [cashCropOptions, setCashCropOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [formData, setFormData] = useState({
    cashCrop: '',
    batchNumber: '',
    date: '',
    location: '',
    areaCleared: '',
    recordedBy: currentUser ? currentUser.userName : '', // Set default value to currentUser.userName
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
    if (field === 'cashCrop') {
      fetchBatchOptions(selectedOption.value);
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/create-new-cashcrop-landpreparation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create cash crop land preparation record');
      }
      setSuccessMessage('Cash crop land preparation record created successfully');
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
      <h1 className="mt-5 mb-4">Cash Crop Land Preparation</h1>
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
              <Label for="cashCrop">Cash Crop</Label>
              <Select
                id="cashCrop"
                options={cashCropOptions}
                onChange={(selectedOption) => {
                  handleInputChange(selectedOption, 'cashCrop');
                }}
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
              <Label for="location">Location</Label>
              <Input
                type="text"
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChangeText(e, 'location')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="areaCleared">Area Cleared</Label>
              <Input
                type="text"
                id="areaCleared"
                value={formData.areaCleared}
                onChange={(e) => handleInputChangeText(e, 'areaCleared')}
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
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default CashCropLandPreparation;
