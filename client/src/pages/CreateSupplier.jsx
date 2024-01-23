import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const CreateSupplier = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    SupplierName: '',
    StreetAddress: '',
    City: '',
    Region: '',
    GhanaPostGPS: '',
    Country: '',
    PhoneNumber: '',
    Email: '',
    SalesRepName: '',
    SalesRepPhoneNumber: '',
  });

  // State to hold success or error messages
  const [message, setMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new supplier
      const response = await fetch('/api/create-supplier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

       // Display success or error message
       setMessage(data.message);

       // If successful, navigate to /poultry-dashboard
       if (data.success) {
         setTimeout(() => {
           window.location.href = '/';
         }, 2000); // Redirect after 2 seconds (adjust as needed)
       }
    } catch (error) {
      console.error('Error creating supplier:', error);
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
      <h2>Create Supplier</h2>
      {message && (
        <p style={{ color: message.includes('success') ? 'green' : 'red' }}>{message}</p>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="SupplierName">Supplier Name:</Label>
              <Input
                type="text"
                name="SupplierName"
                id="SupplierName"
                value={formData.SupplierName}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="StreetAddress">Street Address:</Label>
              <Input
                type="text"
                name="StreetAddress"
                id="StreetAddress"
                value={formData.StreetAddress}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          {/* Repeat similar structure for other fields */}
          {/* City */}
          <Col md={6}>
            <FormGroup>
              <Label for="City">City:</Label>
              <Input
                type="text"
                name="City"
                id="City"
                value={formData.City}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>

          {/* Region */}
          <Col md={6}>
            <FormGroup>
              <Label for="Region">Region:</Label>
              <Input
                type="text"
                name="Region"
                id="Region"
                value={formData.Region}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          {/* GhanaPost GPS */}
          <Col md={6}>
            <FormGroup>
              <Label for="GhanaPostGPS">GhanaPost GPS:</Label>
              <Input
                type="text"
                name="GhanaPostGPS"
                id="GhanaPostGPS"
                value={formData.GhanaPostGPS}
                onChange={handleChange}
              />
            </FormGroup>
          </Col>

          {/* Country */}
          <Col md={6}>
            <FormGroup>
              <Label for="Country">Country:</Label>
              <Input
                type="text"
                name="Country"
                id="Country"
                value={formData.Country}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          {/* Phone Number */}
          <Col md={6}>
            <FormGroup>
              <Label for="PhoneNumber">Phone Number:</Label>
              <Input
                type="text"
                name="PhoneNumber"
                id="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>

          {/* Email */}
          <Col md={6}>
            <FormGroup>
              <Label for="Email">Email:</Label>
              <Input
                type="email"
                name="Email"
                id="Email"
                value={formData.Email}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Row>
          {/* Sales Representative Name */}
          <Col md={6}>
            <FormGroup>
              <Label for="SalesRepName">Sales Representative Name:</Label>
              <Input
                type="text"
                name="SalesRepName"
                id="SalesRepName"
                value={formData.SalesRepName}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>

          {/* Sales Representative Phone Number */}
          <Col md={6}>
            <FormGroup>
              <Label for="SalesRepPhoneNumber">Sales Representative Phone Number:</Label>
              <Input
                type="text"
                name="SalesRepPhoneNumber"
                id="SalesRepPhoneNumber"
                value={formData.SalesRepPhoneNumber}
                onChange={handleChange}
                required
              />
            </FormGroup>
          </Col>
        </Row>

        <Button type="submit">Create Supplier</Button>
      </Form>
    </Container>
  );
};

export default CreateSupplier;
