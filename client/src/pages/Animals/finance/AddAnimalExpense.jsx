import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux'; // Import useSelector hook
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa'; // Import icons for add and remove functionality

const AddAnimalExpense = () => {
  const { currentUser } = useSelector((state) => state.user); // Get currentUser from Redux state
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [identityOptions, setIdentityOptions] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    type: '',
    identityNumber: '',
    description: '',
    amount: '',
    recordedBy: currentUser ? currentUser.userName : '', // Set recordedBy to currentUser's name
    additionalDetails: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showIdentityInput, setShowIdentityInput] = useState(false);
  const [showDetailsInput, setShowDetailsInput] = useState(false);

  useEffect(() => {
    fetchCategoryOptions();
    fetchTypeOptions();
  }, []);

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch('/api/all-animal-expense-categories');
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
      setIdentityOptions([]);
      setShowIdentityInput(false); // Reset showIdentityInput when type changes
      fetchIdentityOptions(selectedOption.value); // Fetch identity numbers
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleToggleIdentityInput = () => {
    setShowIdentityInput(!showIdentityInput);
    if (!showIdentityInput) {
      setFormData({ ...formData, identityNumber: '' }); // Clear identityNumber when toggling off
    }
  };

  const handleToggleDetailsInput = () => {
    setShowDetailsInput(!showDetailsInput);
    if (!showDetailsInput) {
      setFormData({ ...formData, additionalDetails: '' }); // Clear additionalDetails when toggling off
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/animal-expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create animal farm expense record');
      }
      setSuccessMessage('Animal farm expense record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/animal-farm-finance';
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
      <h1 className="mt-5 mb-4">Add Animal Farm Expense</h1>
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
              <Label for="identityNumber">Identity Number</Label>
              <div className="d-flex align-items-center">
                {showIdentityInput && (
                  <Select
                    id="identityNumber"
                    options={identityOptions}
                    onChange={(selectedOption) => handleInputChange(selectedOption, 'identityNumber')}
                    isSearchable
                    placeholder="Select Identity Number"
                    className="mr-2"
                  />
                )}
                <Button
                  color="link"
                  className="p-0 text-primary"
                  onClick={handleToggleIdentityInput}
                  title={showIdentityInput ? 'Hide Identity Number' : 'Add Identity Number'}
                >
                  {showIdentityInput ? <FaMinusCircle size={20} /> : <FaPlusCircle size={20} />}
                </Button>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChangeText(e, 'description')}
                required
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
              <Label for="additionalDetails">Additional Details</Label>
              <div className="d-flex align-items-center">
                {showDetailsInput && (
                  <Input
                    type="textarea"
                    id="additionalDetails"
                    value={formData.additionalDetails}
                    onChange={(e) => handleInputChangeText(e, 'additionalDetails')}
                    required={showDetailsInput}
                    placeholder="Enter Details"
                    className="mr-2"
                  />
                )}
                <Button
                  color="link"
                  className="p-0 text-primary"
                  onClick={handleToggleDetailsInput}
                  title={showDetailsInput ? 'Hide Additional Details' : 'Add Additional Details'}
                >
                  {showDetailsInput ? <FaMinusCircle size={20} /> : <FaPlusCircle size={20} />}
                </Button>
              </div>
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
                readOnly // Make it readOnly to prevent user input
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

export default AddAnimalExpense;
