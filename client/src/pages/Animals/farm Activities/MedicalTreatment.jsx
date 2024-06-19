import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const AddAnimalTreatmentRecord = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [typeOptions, setTypeOptions] = useState([]);
  const [identityOptions, setIdentityOptions] = useState([]);
  const [treatmentTypeOptions, setTreatmentTypeOptions] = useState([]); // Added state for treatment types
  const [formData, setFormData] = useState({
    type: '',
    animalId: '',
    treatmentType: '',
    treatmentDate: '',
    medicationAndDosage: '',
    veterinarian: '',
    notes: '',
    recordedBy: currentUser ? currentUser.userName : '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTypeOptions();
    fetchTreatmentTypeOptions(); // Fetch treatment types when component mounts
  }, []);

  const fetchTypeOptions = async () => {
    try {
      const response = await fetch('/api/all-animal-types');
      if (!response.ok) {
        throw new Error('Failed to fetch animal types');
      }
      const types = await response.json();
      const sortedTypes = types.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedTypes.map((type) => ({ value: type.name, label: type.name }));
      setTypeOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchTreatmentTypeOptions = async () => {
    try {
      const response = await fetch('/api/animal-medical-treatment-groups');
      if (!response.ok) {
        throw new Error('Failed to fetch treatment types');
      }
      const types = await response.json();
      const options = types.map((type) => ({ value: type.name, label: type.name }));
      setTreatmentTypeOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchIdentityOptions = async (type) => {
    try {
      const response = await fetch(`/api/all-identity-numbers/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch identity numbers');
      }
      const identityNumbers = await response.json();
      const options = identityNumbers.map((identity) => ({ value: identity, label: identity }));
      setIdentityOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
    if (field === 'type') {
      setIdentityOptions([]);
      fetchIdentityOptions(selectedOption.value);
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/medical-treatment-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create animal treatment record');
      }
      setSuccessMessage('Animal treatment record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/animal-farm-activity';
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
      <h1 className="mt-5 mb-4">Add Animal Treatment Record</h1>
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
              <Label for="animalId">Animal ID</Label>
              <Select
                id="animalId"
                options={identityOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'animalId')}
                isSearchable
                placeholder="Select Animal ID"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="treatmentType">Treatment Type</Label>
              <Select
                id="treatmentType"
                options={treatmentTypeOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'treatmentType')}
                isSearchable
                placeholder="Select Treatment Type"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="treatmentDate">Treatment Date</Label>
              <Input
                type="date"
                id="treatmentDate"
                value={formData.treatmentDate}
                onChange={(e) => handleInputChangeText(e, 'treatmentDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="medicationAndDosage">Medication and Dosage</Label>
              <Input
                type="textarea"
                id="medicationAndDosage"
                value={formData.medicationAndDosage}
                onChange={(e) => handleInputChangeText(e, 'medicationAndDosage')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="veterinarian">Veterinarian</Label>
              <Input
                type="text"
                id="veterinarian"
                value={formData.veterinarian}
                onChange={(e) => handleInputChangeText(e, 'veterinarian')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
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
          <Col md={6}>
  <FormGroup>
    <Label for="recordedBy">Recorded By</Label>
    <Input
      type="text"
      id="recordedBy"
      value={formData.recordedBy}
      onChange={(e) => handleInputChangeText(e, 'recordedBy')}
      required
      disabled // Assuming this field should not be editable
    />
  </FormGroup>
</Col>

        </Row>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default AddAnimalTreatmentRecord;
