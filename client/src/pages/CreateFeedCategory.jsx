import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const CreateFeedCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, description } = formData;

    // Check if required fields are not empty
    if (!name) {
      console.error('Required fields are missing');
      return;
    }

    // Construct the request body
    const requestBody = {
      name,
      description,
    };

    // Use the formData state to send data to the server
    fetch('/api/create-feed-category', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response
        if (data.success) {
          // Display success message
          setSuccessMessage('Feed category created successfully!');
          // Redirect to /poultry-dashboard after a short delay
          setTimeout(() => {
            window.location.href = '/poultry-dashboard';
          }, 2000); // 2000 milliseconds (2 seconds)
        } else {
          console.error('Error creating feed category:', data.error);
        }
      })
      .catch(error => console.error('Error submitting form:', error));
  };

  return (
    <Container>
      <h2>Create Feed Category</h2>
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="name">Category Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
        </Row>

        <Button color="primary" type="submit">Create Feed Category</Button>
      </Form>
    </Container>
  );
};

export default CreateFeedCategory;
