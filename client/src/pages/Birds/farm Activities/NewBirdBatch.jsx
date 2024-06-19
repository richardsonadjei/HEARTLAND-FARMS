import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import { BsPlusCircle, BsFillTrashFill } from 'react-icons/bs';

const NewBirdBatch = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [typeOptions, setTypeOptions] = useState([]);
  const [breedOptions, setBreedOptions] = useState([]);
  const [farmSections, setFarmSections] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    breed: '',
    birthDate: '',
    batchDetails: [],
    farmHouseLocation: '',
    additionalDetails: '',
    recordedBy: currentUser ? currentUser.userName : '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTypeOptions();
    fetchBreedOptions();
    fetchFarmSections();
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

  const fetchFarmSections = async () => {
    try {
      const response = await fetch('/api/all-bird-farm-sections');
      if (!response.ok) {
        throw new Error('Failed to fetch farm sections');
      }
      const sections = await response.json();
      const options = sections.map((section) => ({ value: section.sectionName , label: section.sectionName }));
      setFarmSections(options);
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

  const handleBatchDetailsChange = (index, field, value) => {
    const newBatchDetails = [...formData.batchDetails];
    newBatchDetails[index][field] = value;
    setFormData({ ...formData, batchDetails: newBatchDetails });
  };

  const addBirdDetail = () => {
    setFormData({
      ...formData,
      batchDetails: [...formData.batchDetails, { gender: '', healthStatus: 'Healthy', quantity: 0 }]
    });
  };

  const removeBirdDetail = (index) => {
    const newBatchDetails = [...formData.batchDetails];
    newBatchDetails.splice(index, 1);
    setFormData({ ...formData, batchDetails: newBatchDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/birdBatches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create bird batch record');
      }
      setSuccessMessage('Bird batch record created successfully');
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
      <h1 className="mt-5 mb-4">Add New Bird Batch</h1>
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
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="birthDate">Birth Date</Label>
              <Input
                type="date"
                id="birthDate"
                value={formData.birthDate}
                onChange={(e) => handleInputChangeText(e, 'birthDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label>Batch Details</Label>
              {formData.batchDetails.map((bird, index) => (
                <Row key={index} className="mb-3 align-items-center">
                  <Col md={3}>
                    <Input
                      type="select"
                      value={bird.gender}
                      onChange={(e) => handleBatchDetailsChange(index, 'gender', e.target.value)}
                      required
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Input>
                  </Col>
                  <Col md={3}>
                    <Input
                      type="select"
                      value={bird.healthStatus}
                      onChange={(e) => handleBatchDetailsChange(index, 'healthStatus', e.target.value)}
                      required
                    >
                      <option value="Healthy">Healthy</option>
                      <option value="Sick">Sick</option>
                      <option value="Recovered">Recovered</option>
                    </Input>
                  </Col>
                  <Col md={3}>
                    <Input
                      type="number"
                      placeholder="Quantity"
                      value={bird.quantity}
                      onChange={(e) => handleBatchDetailsChange(index, 'quantity', e.target.value)}
                      required
                    />
                  </Col>
                  <Col md={1}>
                    <BsFillTrashFill
                      color="red"
                      size={20}
                      onClick={() => removeBirdDetail(index)}
                      style={{ cursor: 'pointer' }}
                    />
                  </Col>
                </Row>
              ))}
              <BsPlusCircle
                color="blue"
                size={20}
                onClick={addBirdDetail}
                style={{ cursor: 'pointer' }}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="farmHouseLocation">Farm House Location</Label>
              <Select
                id="farmHouseLocation"
                options={farmSections}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'farmHouseLocation')}
                isSearchable
                placeholder="Select Farm House Location"
              />
            </FormGroup>
          </Col>
          <Col md={12}>
            <FormGroup>
              <Label for="additionalDetails">Additional Details</Label>
              <Input
                type="textarea"
                id="additionalDetails"
                value={formData.additionalDetails}
                onChange={(e) => handleInputChangeText(e, 'additionalDetails')}
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

export default NewBirdBatch;
