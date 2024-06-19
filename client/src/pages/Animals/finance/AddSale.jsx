import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const AddAnimalSale = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [typeOptions, setTypeOptions] = useState([]);
  const [identityOptions, setIdentityOptions] = useState([]);
  const [formData, setFormData] = useState({
    animalId: '',
    saleDate: '',
    buyerName: '',
    buyerContact: '',
    salePrice: '',
    recordedBy: currentUser ? currentUser.userName : '',
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
      fetchIdentityOptions(selectedOption.value);
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/animalSales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create animal sale record');
      }
      setSuccessMessage('Animal sale record created successfully');
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
      <h1 className="mt-5 mb-4">Add Animal Sale</h1>
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
              <Label for="saleDate">Sale Date</Label>
              <Input
                type="date"
                id="saleDate"
                value={formData.saleDate}
                onChange={(e) => handleInputChangeText(e, 'saleDate')}
                required
              />
            </FormGroup>
          </Col>
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
              <Input
                type="select"
                id="animalId"
                value={formData.animalId}
                onChange={(e) => handleInputChangeText(e, 'animalId')}
                required
              >
                <option value="" disabled>Select Animal ID</option>
                {identityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="buyerName">Buyer Name</Label>
              <Input
                type="text"
                id="buyerName"
                value={formData.buyerName}
                onChange={(e) => handleInputChangeText(e, 'buyerName')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="buyerContact">Buyer Contact</Label>
              <Input
                type="text"
                id="buyerContact"
                value={formData.buyerContact}
                onChange={(e) => handleInputChangeText(e, 'buyerContact')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="salePrice">Sale Price</Label>
              <Input
                type="number"
                id="salePrice"
                value={formData.salePrice}
                onChange={(e) => handleInputChangeText(e, 'salePrice')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
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

export default AddAnimalSale;
