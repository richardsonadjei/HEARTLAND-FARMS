import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';
import { useSelector } from 'react-redux';

const AddNewPig = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    identityTag: '',
    breed: '',
    quantity: 1,
    arrivalDate: '',
    farmSection: '',
    gender: '',
    createdBy: currentUser ? currentUser.userName : '',
  });

  const [breeds, setBreeds] = useState([]);
  const [farmSections, setFarmSections] = useState([]);
  const [alert, setAlert] = useState({ type: '', message: '' });

  useEffect(() => {
    // Fetch pig breeds
    fetch('/api/all-pig-breeds')
      .then((response) => response.json())
      .then((data) => setBreeds(data));

    // Fetch farm sections
    fetch('/api/all-sections')
      .then((response) => response.json())
      .then((data) => setFarmSections(data));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-new-pig-stock', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({ type: 'success', message: 'New pig recorded successfully' });
        setTimeout(() => {
          // Redirect to pig-farm-dashboard after 3 seconds
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
      console.error('Error recording new pig:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="transparent-form">
            <h2 className="text-white mb-4">Add New Pig</h2>

            {alert.message && <Alert color={alert.type}>{alert.message}</Alert>}

            <FormGroup row>
              <Label for="identityTag" className="text-white">
                Identity Tag
              </Label>
              <Input
                type="select"
                name="identityTag"
                id="identityTag"
                onChange={handleChange}
                value={formData.identityTag}
                required
              >
                <option value="">Select Identity Tag</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="White">White</option>
                <option value="Orange">Orange</option>
                <option value="Green">Green</option>
                <option value="Yellow">Yellow</option>
              </Input>
            </FormGroup>

            <FormGroup row>
              <Label for="breed" className="text-white">
                Breed
              </Label>
              <Input
                type="select"
                name="breed"
                id="breed"
                onChange={handleChange}
                value={formData.breed}
                required
              >
                <option value="">Select Breed</option>
                {breeds.map((breed) => (
                  <option key={breed._id} value={breed.name}>
                    {breed.name}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup row>
              <Label for="quantity" className="text-white">
                Quantity
              </Label>
              <Input type="text" name="quantity" id="quantity" value={formData.quantity} readOnly />
            </FormGroup>

            <FormGroup row>
              <Label for="arrivalDate" className="text-white">
                Arrival Date
              </Label>
              <Input
                type="date"
                name="arrivalDate"
                id="arrivalDate"
                onChange={handleChange}
                value={formData.arrivalDate}
                required
              />
            </FormGroup>

            <FormGroup row>
              <Label for="farmSection" className="text-white">
                Farm Section
              </Label>
              <Input
                type="select"
                name="farmSection"
                id="farmSection"
                onChange={handleChange}
                value={formData.farmSection}
                required
              >
                <option value="">Select Farm Section</option>
                {farmSections.map((section) => (
                  <option key={section._id} value={section.sectionName}>
                    {section.sectionName}
                  </option>
                ))}
              </Input>
            </FormGroup>

            <FormGroup row>
              <Label for="gender" className="text-white">
                Gender
              </Label>
              <Input
                type="select"
                name="gender"
                id="gender"
                onChange={handleChange}
                value={formData.gender}
                required
              >
                <option value="">Select Gender</option>
                <option value="sow">Sow</option>
                <option value="boar">Boar</option>
              </Input>
            </FormGroup>

            <Button type="submit" color="primary" className="mt-3">
              Add New Pig
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddNewPig;
