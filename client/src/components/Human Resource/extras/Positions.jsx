import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const PositionRegistration = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/positions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error('Failed to create position');
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Redirect after 1 second
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add New Position</h1>
          {error && <p className="text-danger">{error}</p>}
          {success && (
            <p className="text-success">Position created successfully. Redirecting...</p>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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

export default PositionRegistration;
