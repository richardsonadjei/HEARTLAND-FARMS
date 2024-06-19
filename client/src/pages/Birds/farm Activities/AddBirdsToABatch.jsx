import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import Select from 'react-select';
import { BsPlusCircle, BsFillTrashFill } from 'react-icons/bs';

const AddBirdsToBatch = () => {
  const [typeOptions, setTypeOptions] = useState([]);
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    batchNumber: '',
    birdDetails: [{ gender: '', healthStatus: '', quantity: 0 }],
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTypeOptions();
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

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
  };

  const handleInputChangeText = (e, field, index) => {
    const newBirdDetails = [...formData.birdDetails];
    newBirdDetails[index][field] = e.target.value;
    setFormData({ ...formData, birdDetails: newBirdDetails });
  };

  const handleAddBird = () => {
    setFormData({
      ...formData,
      birdDetails: [...formData.birdDetails, { gender: '', healthStatus: '', quantity: 0 }]
    });
  };

  const handleRemoveBird = (index) => {
    const newBirdDetails = [...formData.birdDetails];
    newBirdDetails.splice(index, 1);
    setFormData({ ...formData, birdDetails: newBirdDetails });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/bird-batches/${formData.batchNumber}/add-birds`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData.birdDetails),
      });
      if (!response.ok) {
        throw new Error('Failed to add birds to batch');
      }
      setSuccessMessage('Birds added to batch successfully');
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
      <h1 className="mt-5 mb-4">Add Birds to Batch</h1>
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
        {formData.type && (
          <FormGroup>
            <Label for="batchNumber">Batch Number</Label>
            <Select
              id="batchNumber"
              options={batchNumberOptions}
              onChange={(selectedOption) => handleInputChange(selectedOption, 'batchNumber')}
              isSearchable
              placeholder="Select Batch Number"
              required
            />
          </FormGroup>
        )}
        <FormGroup>
          <Label>Batch Details</Label>
          {formData.birdDetails.map((bird, index) => (
            <div key={index}>
              <FormGroup>
                <Label for={`gender${index}`}>Gender</Label>
                <Input
                  type="select"
                  id={`gender${index}`}
                  value={bird.gender}
                  onChange={(e) => handleInputChangeText(e, 'gender', index)}
                  required
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for={`healthStatus${index}`}>Health Status</Label>
                <Input
                  type="select"
                  id={`healthStatus${index}`}
                  value={bird.healthStatus}
                  onChange={(e) => handleInputChangeText(e, 'healthStatus', index)}
                  required
                >
                  <option value="" disabled>Select Health Status</option>
                  <option value="Healthy">Healthy</option>
                  <option value="Sick">Sick</option>
                  <option value="Recovered">Recovered</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label for={`quantity${index}`}>Quantity</Label>
                <Input
                  type="number"
                  id={`quantity${index}`}
                  value={bird.quantity}
                  onChange={(e) => handleInputChangeText(e, 'quantity', index)}
                  min="1"
                  required
                />
              </FormGroup>
              {index !== 0 && (
                <div style={{ display: 'flex', alignItems: 'center', marginTop: '5px' }}>
                  <BsFillTrashFill
                    color="red"
                    size={20}
                    onClick={() => handleRemoveBird(index)}
                    style={{ cursor: 'pointer', marginRight: '5px' }}
                  />
                  <span style={{ fontSize: '14px', color: 'red' }}>Remove Bird</span>
                </div>
              )}
            </div>
          ))}
          <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <BsPlusCircle
              color="blue"
              size={20}
              onClick={handleAddBird}
              style={{ cursor: 'pointer', marginRight: '10px' }}
            />
            <span style={{ fontSize: '16px' }}>Add Bird</span>
          </div>
        </FormGroup>
        <Button color="primary" type="submit" style={{ marginTop: '10px' }}>Submit</Button>
      </Form>
    </Container>
  );
};

export default AddBirdsToBatch;
