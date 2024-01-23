import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const CreateMedicationCategory = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [alert, setAlert] = useState(null);

  const handleCreateMedication = async () => {
    try {
      const response = await fetch('/api/add-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        setAlert('Medication created successfully!');
        // You can navigate to /medication here without using useHistory
        window.location.href = '/poultry-getting-started';
      } else {
        const data = await response.json();
        setAlert(`Error: ${data.error}`);
      }
    } catch (error) {
      setAlert(`Error: ${error.message}`);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-white">Create Medication Category</h2>
          <Form>
            <FormGroup row>
              <Label for="name" className="text-white" md={2}>
                Name
              </Label>
              <Col md={10}>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Medication Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" className="text-white" md={2}>
                Description
              </Label>
              <Col md={10}>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Medication Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 10, offset: 2 }}>
                <Button color="primary" onClick={handleCreateMedication}>
                  Create Medication
                </Button>
              </Col>
            </FormGroup>
          </Form>
          {alert && <div className="alert alert-success">{alert}</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateMedicationCategory;
