import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const AnimalBirth = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [typeOptions, setTypeOptions] = useState([]);
  const [identityOptions, setIdentityOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    animalId: '',
    dateOfBirth: '',
    numberOfKids: '',
    birthDetails: [],
    notes: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTypeOptions();
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
      setIdentityOptions([]); // Clear identity options when type changes
      fetchIdentityOptions(selectedOption.value); // Fetch identity numbers
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleBirthDetailsChange = (index, field, value) => {
    const newBirthDetails = [...formData.birthDetails];
    newBirthDetails[index][field] = value;
    setFormData({ ...formData, birthDetails: newBirthDetails });
  };

  const addKidDetail = () => {
    setFormData({
      ...formData,
      birthDetails: [...formData.birthDetails, { gender: '', weight: '', healthStatus: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate number of kids entered
    if (formData.birthDetails.length !== parseInt(formData.numberOfKids)) {
      setErrorMessage('Number of kids entered does not match the number of kid details');
      return;
    }
  
    try {
      const response = await fetch('/api/animal-births', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create animal birth record');
      }
      setSuccessMessage('Animal birth record created successfully');
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
      <h1 className="mt-5 mb-4">Add Animal Birth Record</h1>
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
          <Col md={6}>
            <FormGroup>
              <Label for="parentGoatId">Parent Goat</Label>
              <Select
                id="parentGoatId"
                options={identityOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'animalId')}
                isSearchable
                placeholder="Select Parent Goat"
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="dateOfBirth">Date of Birth</Label>
              <Input
                type="date"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChangeText(e, 'dateOfBirth')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="numberOfKids">Number of Kids</Label>
              <Input
                type="number"
                id="numberOfKids"
                value={formData.numberOfKids}
                onChange={(e) => handleInputChangeText(e, 'numberOfKids')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label>Kids Details</Label>
              {formData.birthDetails.map((kid, index) => (
                <Row key={index} className="mb-3">
                  <Col md={3}>
                    <Input
                      type="select"
                      value={kid.gender}
                      onChange={(e) => handleBirthDetailsChange(index, 'gender', e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Input>
                  </Col>
                  <Col md={3}>
                    <Input
                      type="text"
                      placeholder="Weight"
                      value={kid.weight}
                      onChange={(e) => handleBirthDetailsChange(index, 'weight', e.target.value)}
                    />
                  </Col>
                  <Col md={4}>
                  <Input
  type="select"
  value={kid.healthStatus}
  onChange={(e) => handleBirthDetailsChange(index, 'healthStatus', e.target.value)}
  required
>
  <option value="" disabled>Select Health Status</option>
  <option value="Healthy">Healthy</option>
  <option value="Weak">Weak</option>
  <option value="Critical">Critical</option>
</Input>

                  </Col>
                </Row>
              ))}
              <Button color="secondary" onClick={addKidDetail}>Add Kid</Button>
            </FormGroup>
          </Col>
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

export default AnimalBirth;
