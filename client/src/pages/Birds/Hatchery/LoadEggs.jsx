import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Select from 'react-select';

const LoadEggBatch = () => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [breedOptions, setBreedOptions] = useState([]);
  const [incubatorOptions, setIncubatorOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    breed: '',
    dateLoaded: '',
    numberOfEggs: 0,
    incubatorId: '',
    notes: '',
    expectedHatchDate: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTypeOptions();
    fetchBreedOptions();
    fetchIncubatorOptions();
  }, []);

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

  const fetchBreedOptions = async () => {
    try {
      const response = await fetch('/api/breeds');
      if (!response.ok) {
        throw new Error('Failed to fetch bird breeds');
      }
      const breeds = await response.json();
      const sortedBreeds = breeds.sort((a, b) => a.breedName.localeCompare(b.breedName));
      const options = sortedBreeds.map((breed) => ({ value: breed.breedName, label: breed.breedName }));
      setBreedOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchIncubatorOptions = async () => {
    try {
      const response = await fetch('/api/all-incubators');
      if (!response.ok) {
        throw new Error('Failed to fetch incubators');
      }
      const incubators = await response.json();
      const options = incubators.map((incubator) => ({ value: incubator.incubatorId, label: incubator.incubatorId }));
      setIncubatorOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption ? selectedOption.value : '' });
  };

  const handleInputChangeText = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/load-egg-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create egg batch');
      }
      const result = await response.json();
      setSuccessMessage('Egg batch loaded successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload(); // Refresh page after successful addition
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
      <h1 className="mt-5 mb-4">Load Egg Batch</h1>
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
          <Label for="breed">Breed</Label>
          <Select
            id="breed"
            options={breedOptions}
            onChange={(selectedOption) => handleInputChange(selectedOption, 'breed')}
            isSearchable
            placeholder="Select Breed"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="incubatorId">Incubator</Label>
          <Select
            id="incubatorId"
            options={incubatorOptions}
            onChange={(selectedOption) => handleInputChange(selectedOption, 'incubatorId')}
            isSearchable
            placeholder="Select Incubator"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="numberOfEggs">Number of Eggs</Label>
          <Input
            type="number"
            id="numberOfEggs"
            name="numberOfEggs"
            value={formData.numberOfEggs}
            onChange={handleInputChangeText}
            min="1"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="dateLoaded">Date Loaded</Label>
          <Input
            type="date"
            id="dateLoaded"
            name="dateLoaded"
            value={formData.dateLoaded}
            onChange={handleInputChangeText}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="expectedHatchDate">Expected Hatch Date</Label>
          <Input
            type="date"
            id="expectedHatchDate"
            name="expectedHatchDate"
            value={formData.expectedHatchDate}
            onChange={handleInputChangeText}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input
            type="textarea"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChangeText}
          />
        </FormGroup>
        <Button color="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default LoadEggBatch;
