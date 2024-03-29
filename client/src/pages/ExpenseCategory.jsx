import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const ExpenseCategory = () => {
  // State to hold form data and success/error message
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [message, setMessage] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create the expense category
      const response = await fetch('/api/expense-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Display success or error message
      setMessage(data.message);

      // If successful, redirect to '/' after 2 seconds
      if (data.success) {
        setTimeout(() => {
          window.location.href = '/'; // Redirect after 2 seconds (adjust as needed)
        }, 2000);
      }
    } catch (error) {
      console.error('Error creating expense category:', error);
      setMessage('Internal Server Error. Please try again later.');
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h2>Create Expense Category</h2>
      <Form onSubmit={handleSubmit}>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Category Name:</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="description">Category Description:</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit">Create Category</Button>
      </Form>

      {message && <p>{message}</p>}
    </Container>
  );
};

export default ExpenseCategory;
