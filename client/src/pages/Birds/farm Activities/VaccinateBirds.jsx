import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const VaccinateBird = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [typeOptions, setTypeOptions] = useState([]);
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [vaccineOptions, setVaccineOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    batchNumber: '',
    vaccinationDate: '',
    vaccineName: '',
    dosage: '',
    administrationMethod: '',
    comments: '',
    additionalDetails: '',
    status: '',
    amount: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTypeOptions();
    fetchVaccineOptions();
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

  const fetchVaccineOptions = async () => {
    try {
      const response = await fetch('/api/bird-drugs');
      if (!response.ok) {
        throw new Error('Failed to fetch vaccine names');
      }
      const vaccines = await response.json();
      const sortedVaccines = vaccines.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedVaccines.map((vaccine) => ({ value: vaccine.name, label: vaccine.name }));
      setVaccineOptions(options);
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
      const response = await fetch('/api/bird-vaccination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create bird vaccination record');
      }
      setSuccessMessage('Bird vaccination record created successfully');
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
      <h1 className="mt-5 mb-4">Vaccinate Bird</h1>
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
          {!formData.type || formData.type !== 'All-Birds' ? (
            <Col md={6}>
              <FormGroup>
                <Label for="batchNumber">Batch Number</Label>
                <Select
                  id="batchNumber"
                  options={batchNumberOptions}
                  onChange={(selectedOption) => handleInputChange(selectedOption, 'batchNumber')}
                  isSearchable
                  placeholder="Select Batch Number"
                />
              </FormGroup>
            </Col>
          ) : null}
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="vaccinationDate">Vaccination Date</Label>
              <Input
                type="date"
                id="vaccinationDate"
                value={formData.vaccinationDate}
                onChange={(e) => handleInputChangeText(e, 'vaccinationDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="vaccineName">Vaccine Name</Label>
              <Select
                id="vaccineName"
                options={vaccineOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'vaccineName')}
                isSearchable
                placeholder="Select Vaccine Name"
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="dosage">Dosage</Label>
              <Input
                type="text"
                id="dosage"
                value={formData.dosage}
                onChange={(e) => handleInputChangeText(e, 'dosage')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="administrationMethod">Administration Method</Label>
              <Input
                type="textarea"
                id="administrationMethod"
                value={formData.administrationMethod}
                onChange={(e) => handleInputChangeText(e, 'administrationMethod')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="comments">Comments</Label>
              <Input
                type="textarea"
                id="comments"
                value={formData.comments}
                onChange={(e) => handleInputChangeText(e, 'comments')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="additionalDetails">Expense Details</Label>
              <Input
                type="textarea"
                id="additionalDetails"
                value={formData.additionalDetails}
                onChange={(e) => handleInputChangeText(e, 'additionalDetails')}
                required
                placeholder='Enter the details of the amount charged by the Veterinary Officer'
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="status">Status</Label>
              <Select
                id="status"
                options={[
                  { value: 'Done', label: 'Done' },
                  { value: 'Not Done', label: 'Not Done' }
                ]}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'status')}
                isSearchable
                placeholder="Select Status"
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="amount">Amount Charged</Label>
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

export default VaccinateBird;
