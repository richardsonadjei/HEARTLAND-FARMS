import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const CashCropWeedicideApplication = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [cashCropOptions, setCashCropOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '', // Updated from cashCrop to type to match the model
    batchNumber: '',
    date: '',
    weedicideName: '',
    weedicideDescription: '',
    spaceApplied: '',
    applicationMethod: 'Spraying', // Default value set to 'Spraying'
    quantityApplied: '',
    recordedBy: currentUser ? currentUser.userName : '', // Default value will be set to currentUser.userName
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
      const options = cashCrops.map((cashCrop) => ({ value: cashCrop.name, label: cashCrop.name})); // Changed from name to type
      setCashCropOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchBatchOptions = async (cashCropType) => { // Changed from name to type
    try {
      const response = await fetch(`/api/cashcrop-batches/${cashCropType}`); // Changed from name to type
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
    if (field === 'type') { // Changed from cashCrop to type
      fetchBatchOptions(selectedOption.value);
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-cash-crop-weedicide-applications', { // Changed from /api/add-cash-crop-weedicide
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create cash crop weedicide application record');
      }
      setSuccessMessage('Cash crop weedicide application record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/cash-crops-farm-activities';
      }, 1000); // Reduced the timeout for demonstration purposes
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
        window.location.reload();
      }, 1000); // Reduced the timeout for demonstration purposes
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Cash Crop Weedicide Application</h1>
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
              <Label for="type">Cash Crop Type</Label> {/* Changed from cashCrop to type */}
              <Select
                id="type"
                options={cashCropOptions}
                onChange={(selectedOption) => {
                  handleInputChange(selectedOption, 'type'); // Changed from cashCrop to type
                }}
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
              <Label for="weedicideName">Weedicide Name</Label>
              <Input
                type="text"
                id="weedicideName"
                value={formData.weedicideName}
                onChange={(e) => handleInputChangeText(e, 'weedicideName')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="weedicideDescription">Weedicide Description</Label>
              <Input
                type="text"
                id="weedicideDescription"
                value={formData.weedicideDescription}
                onChange={(e) => handleInputChangeText(e, 'weedicideDescription')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="spaceApplied">Space Applied</Label>
              <Input
                type="text"
                id="spaceApplied"
                value={formData.spaceApplied}
                onChange={(e) => handleInputChangeText(e, 'spaceApplied')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="applicationMethod">Application Method</Label>
              <Input
                type="text"
                id="applicationMethod"
                value={formData.applicationMethod}
                onChange={(e) => handleInputChangeText(e, 'applicationMethod')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="quantityApplied">Quantity Applied</Label>
              <Input
                type="text"
                id="quantityApplied"
                value={formData.quantityApplied}
                onChange={(e) => handleInputChangeText(e, 'quantityApplied')}
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

export default CashCropWeedicideApplication;
