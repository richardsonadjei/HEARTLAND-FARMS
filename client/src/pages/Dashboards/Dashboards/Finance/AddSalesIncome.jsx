import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';

const RecordSalesIncome = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    date: '',
    farmCategory: '',
    amount: '',
    description: '',
    recordedBy: currentUser ? currentUser.userName : '',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sales-income', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to record sales income');
      }
      setSuccessMessage('Sales income recorded successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.href = '/accounts';
      }, 3000);
      setFormData({
        date: '',
        farmCategory: '',
        amount: '',
        description: '',
        recordedBy: currentUser ? currentUser.userName : '',
      }); // Clear form fields after successful submission
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
        // Handle error as needed
      }, 3000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Record Sales Income</h1>
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
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="farmCategory">Farm Category</Label>
              <Input
                type="select"
                id="farmCategory"
                name="farmCategory"
                value={formData.farmCategory}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Farm Category</option>
                <option value="CashCrop">Cash Crop</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Farm-Animals">Farm Animals</option>
                <option value="Birds">Birds</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
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
                name="recordedBy"
                value={formData.recordedBy}
                onChange={handleInputChange}
                required
                disabled // Disable editing for recordedBy, assuming it's automatically filled
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default RecordSalesIncome;
