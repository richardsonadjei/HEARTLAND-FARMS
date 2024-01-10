import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';


const CreatePigBreed = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    origin: '',
    averageWeight: '',
  });

  const [alert, setAlert] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-pig-breeds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ type: 'success', message: 'Pig breed created successfully' });
        setTimeout(() => {
          // Redirect to pig-fowl-dashboard after 3 seconds
          window.location.href = '/pig-farm-dashboard';
        }, 3000);
      } else {
        setAlert({ type: 'danger', message: data.message });
        setTimeout(() => {
          // Refresh the page after 3 seconds
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error('Error creating pig breed:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="transparent-form">
            <h2 className="text-white mb-4">Create Pig Breed</h2>

            {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}

            <FormGroup row>
              <Label for="name" className="text-white">Name</Label>
              <Input type="text" name="name" id="name" onChange={handleChange} value={formData.name} required />
            </FormGroup>

            <FormGroup row>
              <Label for="description" className="text-white">Description</Label>
              <Input type="textarea" name="description" id="description" onChange={handleChange} value={formData.description} required />
            </FormGroup>

            <FormGroup row>
              <Label for="origin" className="text-white">Origin</Label>
              <Input type="text" name="origin" id="origin" onChange={handleChange} value={formData.origin} required />
            </FormGroup>

            <FormGroup row>
              <Label for="averageWeight" className="text-white">Average Weight</Label>
              <Input type="text" name="averageWeight" id="averageWeight" onChange={handleChange} value={formData.averageWeight} required />
            </FormGroup>

            <Button type="submit" color="primary" className="mt-3">Create Pig Breed</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatePigBreed;
