import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const AddMedication = () => {
  const [medication, setMedication] = useState({
    name: '',
    description: '',
    ageRangeStart: '',
    ageRangeEnd: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedication({ ...medication, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-medication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication),
      });

      if (response.ok) {
        // Medication created successfully
        alert('Medication created successfully');
        window.location.href = '/medication'; // Navigate to /medication
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating medication:', error);
      alert('Error creating medication');
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-white mb-4">Add Medication</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="name" className="text-white" md={3}>
                Name
              </Label>
              <Col md={9}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Medication Name"
                  value={medication.name}
                  onChange={handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" className="text-white" md={3}>
                Description
              </Label>
              <Col md={9}>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Medication Description"
                  value={medication.description}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ageRangeStart" className="text-white" md={3}>
                Age Range Start
              </Label>
              <Col md={4}>
                <Input
                  type="number"
                  name="ageRangeStart"
                  id="ageRangeStart"
                  placeholder="Start Age"
                  value={medication.ageRangeStart}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Label for="ageRangeEnd" className="text-white" md={2}>
                Age Range End
              </Label>
              <Col md={3}>
                <Input
                  type="number"
                  name="ageRangeEnd"
                  id="ageRangeEnd"
                  placeholder="End Age"
                  value={medication.ageRangeEnd}
                  onChange={handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 9, offset: 3 }}>
                <Button type="submit" color="primary">
                  Create Medication
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddMedication;
