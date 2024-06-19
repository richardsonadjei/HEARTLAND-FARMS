import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const NewCashCrop = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-new-cashcrop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });
      if (!response.ok) {
        throw new Error('Failed to create cash crop');
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/cash-cropsHome-page';
      }, 1000); // Redirect after 2 seconds
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add New Cash Crop</h1>
          {error && <p className="text-danger">{error}</p>}
          {success && (
            <p className="text-success">Cash crop created successfully. Redirecting...</p>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewCashCrop;
