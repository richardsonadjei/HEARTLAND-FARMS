import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const NewAnimal = () => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/add-animals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, notes }),
      });
      if (!response.ok) {
        throw new Error('Failed to add new animal');
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/animals-extras';
      }, 1000); // Redirect after 1 second
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add New Animal</h1>
          {error && <p className="text-danger">{error}</p>}
          {success && (
            <p className="text-success">Animal added successfully. Redirecting...</p>
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
              <Label for="notes">Notes</Label>
              <Input
                type="textarea"
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewAnimal;
