import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const Vaccination = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [typeOptions, setTypeOptions] = useState([]);
  const [identityOptions, setIdentityOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    animalId: '',
    vaccineDetails: '',
    methodOfAdministration: '',
    dateAdministered: '',
    administeredBy: '',
    nextDueDate: '',
    notes: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Enumerated options for the method of administration
  const methodOptions = [
    { value: 'Injection', label: 'Injection' },
    { value: 'Oral', label: 'Oral' },
    { value: 'Nasal', label: 'Nasal' },
    { value: 'Topical', label: 'Topical' },
    { value: 'Intravenous', label: 'Intravenous' },
    { value: 'Intraocular', label: 'Intraocular' },
    { value: 'Subcutaneous Implant', label: 'Subcutaneous Implant' }
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/animal-vaccinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create animal vaccination record');
      }
      setSuccessMessage('Animal vaccination record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
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
      <h1 className="mt-5 mb-4">Record Animal Vaccination</h1>
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
        <FormGroup>
          <Label for="animalId">Animal ID</Label>
          <Select
            id="animalId"
            options={identityOptions}
            onChange={(selectedOption) => handleInputChange(selectedOption, 'animalId')}
            isSearchable
            placeholder="Select Animal ID"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="vaccineName">Vaccine Details</Label>
          <Input
            type="textarea"
            id="vaccineDetails"
            value={formData.vaccineDetails}
            onChange={(e) => handleInputChangeText(e, 'vaccineDetails')}
            placeholder="Enter Vaccine Name, Expiry Date etc"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="methodOfAdministration">Method of Administration</Label>
          <Select
            id="methodOfAdministration"
            options={methodOptions}
            onChange={(selectedOption) => handleInputChange(selectedOption, 'methodOfAdministration')}
            isSearchable
            placeholder="Select Method of Administration"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="dateAdministered">Date Administered</Label>
          <Input
            type="date"
            id="dateAdministered"
            value={formData.dateAdministered}
            onChange={(e) => handleInputChangeText(e, 'dateAdministered')}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="administeredBy">Administered By</Label>
          <Input
            type="text"
            id="administeredBy"
            value={formData.administeredBy}
            onChange={(e) => handleInputChangeText(e, 'administeredBy')}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="nextDueDate">Next Due Date</Label>
          <Input
            type="date"
            id="nextDueDate"
            value={formData.nextDueDate}
            onChange={(e) => handleInputChangeText(e, 'nextDueDate')}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input
            type="textarea"
            id="notes"
            value={formData.notes}
            onChange={(e) => handleInputChangeText(e, 'notes')}
          />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default Vaccination;

