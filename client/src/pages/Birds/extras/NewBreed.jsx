import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const NewBirdBreed = () => {
  const [breedName, setBreedName] = useState('');
  const [origin, setOrigin] = useState('');
  const [characteristics, setCharacteristics] = useState('');
  const [purpose, setPurpose] = useState('Egg Production');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/breeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ breedName, origin, characteristics, purpose, notes }),
      });
      if (!response.ok) {
        throw new Error('Failed to add new bird breed');
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/bird-extras';
      }, 1000); // Redirect after 1 second
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add New Bird Breed</h1>
          {error && <p className="text-danger">{error}</p>}
          {success && (
            <p className="text-success">Bird breed added successfully. Redirecting...</p>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="breedName">Breed Name</Label>
              <Input
                type="text"
                id="breedName"
                value={breedName}
                onChange={(e) => setBreedName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="origin">Origin</Label>
              <Input
                type="text"
                id="origin"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="characteristics">Characteristics</Label>
              <Input
                type="textarea"
                id="characteristics"
                value={characteristics}
                onChange={(e) => setCharacteristics(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="purpose">Purpose</Label>
              <Input
                type="select"
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
              >
                <option value="Egg Production">Egg Production</option>
                <option value="Meat Production">Meat Production</option>
                <option value="Dual Purpose">Dual Purpose</option>
                <option value="Ornamental">Ornamental</option>
                <option value="Other">Other</option>
              </Input>
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

export default NewBirdBreed;
