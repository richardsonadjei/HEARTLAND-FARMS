import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const AddBirdExpense = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [breedOptions, setBreedOptions] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    type: '',
    batchNumber: '',
    additionalDetails: '',
    amount: '',
    recordedBy: currentUser ? currentUser.userName : '',
    breed: '',
    birthDate: '',
    batchDetails: [],
    farmHouseLocation: '',
    additionalBatchDetails: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchCategoryOptions();
    fetchTypeOptions();
    fetchBreedOptions();
  }, []);

  useEffect(() => {
    if (formData.type && formData.type !== 'All-Birds' && formData.category !== 'Breeding Stock') {
      fetchBatchNumberOptions();
    }
  }, [formData.type]);

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch('/api/get-all-bird-expense-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch expense categories');
      }
      const categories = await response.json();
      const sortedCategories = categories.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedCategories.map((category) => ({ value: category.name, label: category.name }));
      setCategoryOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

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

  const fetchBatchNumberOptions = async () => {
    try {
      const response = await fetch('/api/all-bird-batches');
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const options = batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchNumberOptions(options);
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

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleBatchDetailsChange = (index, field, value) => {
    const updatedBatchDetails = formData.batchDetails.map((bird, i) => 
      i === index ? { ...bird, [field]: value } : bird
    );
    setFormData({ ...formData, batchDetails: updatedBatchDetails });
  };
  

  const addBirdDetail = () => {
    setFormData({
      ...formData,
      batchDetails: [...formData.batchDetails, { gender: '', healthStatus: '', quantity: '' }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-bird-expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create bird farm expense record');
      }
      setSuccessMessage('Bird farm expense record created successfully');
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
      <h1 className="mt-5 mb-4">Add Bird Farm Expense</h1>
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
              <Label for="category">Category</Label>
              <Select
                id="category"
                options={categoryOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'category')}
                isSearchable
                placeholder="Select Category"
              />
            </FormGroup>
          </Col>
        </Row>
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
          {formData.type !== 'All-Birds' && formData.category !== 'Breeding Stock' && (
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
          )}
        </Row>
        {formData.category === 'Breeding Stock' && (
          <>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="breed">Breed</Label>
                  <Select
                    id="breed"
                    options={breedOptions}
                    onChange={(selectedOption) => handleInputChange(selectedOption, 'breed')}
                    isSearchable
                    placeholder="Select Breed"
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
            </Row>
            <FormGroup>
              <Label>Batch Details</Label>
              {formData.batchDetails.map((bird, index) => (
                <Row key={index} className="mb-3">
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
    <option value="" disabled>Select Health Status</option>
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
                </Row>
              ))}
              <Button color="secondary" onClick={addBirdDetail}>Add Bird</Button>
            </FormGroup>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="farmHouseLocation">Farm House Location</Label>
                  <Input
                    type="text"
                    id="farmHouseLocation"
                    value={formData.farmHouseLocation}
                    onChange={(e) => handleInputChangeText(e, 'farmHouseLocation')}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="additionalBatchDetails">Additional Batch Details</Label>
                  <Input
                    type="textarea"
                    id="additionalBatchDetails"
                    value={formData.additionalBatchDetails}
                    onChange={(e) => handleInputChangeText(e, 'additionalBatchDetails')}
                  />
                </FormGroup>
              </Col>
            </Row>
          </>
        )}
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="additionalDetails">Additional Expense Details</Label>
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
              <Label for="amount">Amount</Label>
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
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="recordedBy">Recorded By</Label>
              <Input
                type="text"
                id="recordedBy"
                value={formData.recordedBy}
                onChange={(e) => handleInputChangeText(e, 'recordedBy')}
                readOnly
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

export default AddBirdExpense;
