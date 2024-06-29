import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const AddFarmExpense = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    expenseCategory: '',
    farmCategory: 'CashCrop', // Default farm category
    description: '',
    amount: '',
    name: '',
    recordedBy: currentUser ? currentUser.userName : '', // Default value will be set to currentUser.userName
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showNameInput, setShowNameInput] = useState(false); // State to conditionally render name input

  useEffect(() => {
    fetchCategoryOptions();
  }, []);

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch('/api/all-expense-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch expense categories');
      }
      const categories = await response.json();
      const options = categories.map((category) => ({ value: category.name, label: category.name }));
      setCategoryOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
    if (field === 'expenseCategory') {
      setShowNameInput(selectedOption.value === 'Assets Purchase'); // Show name input if category is "Assets Purchase"
    }
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/farm-expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create farm expense record');
      }
      setSuccessMessage('Farm expense record created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/accounts';
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Add Farm Expense</h1>
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
              <Label for="expenseCategory">Category</Label>
              <Select
                id="expenseCategory"
                options={categoryOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'expenseCategory')}
                isSearchable
                placeholder="Select Category"
              />
            </FormGroup>
          </Col>
          {showNameInput && (
            <Col md={6}>
              <FormGroup>
                <Label for="name">Asset Name</Label>
                <Input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChangeText(e, 'name')}
                  required
                />
              </FormGroup>
            </Col>
          )}
          {formData.expenseCategory === 'Assets Purchase' && (
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
          )}
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
          {formData.expenseCategory !== 'Assets Purchase' && (
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
          )}
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="recordedBy">Recorded By</Label>
              <Input
                type="text"
                id="recordedBy"
                value={formData.recordedBy} // This will be automatically populated with currentUser.userName
                onChange={(e) => handleInputChangeText(e, 'recordedBy')}
                required
                disabled // Prevents user from editing this field
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default AddFarmExpense;
