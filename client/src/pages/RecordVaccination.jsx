import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';
import { useLocation } from 'react-router-dom';

const RecordVaccination = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // State to store form data
  const [formData, setFormData] = useState({
    batchNumber: searchParams.get('batchNumber') || '',
    breed: searchParams.get('breed') || '',
    vaccinationDate: '',
    vaccine: searchParams.get('vaccinationDue') || '',
    ageInDays: searchParams.get('ageInDays') || '',
    vaccinatedBy: '',
  });

  // State to manage success and error alerts
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to create a new bird vaccination record
      const response = await fetch('/api/add-bird-vaccinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // If the response is successful, show the success alert
        setShowSuccessAlert(true);
        // Reset the form data
        setFormData({
          batchNumber: '',
          breed: '',
          vaccinationDate: '',
          vaccine: '', // Updated property name
          ageInDays: '',
          vaccinatedBy: '',
        });
        // Navigate to "/medication"
        window.location.href = '/medication';
      } else {
        // If the response is not successful, handle the error
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error creating bird vaccination record');
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error('Error creating bird vaccination record:', error);
      setErrorMessage('Internal Server Error');
      setShowErrorAlert(true);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{ color: 'white' }}>Record Bird Vaccination</h2>
          {/* Success Alert */}
          {showSuccessAlert && (
            <Alert color="success" className="mt-3">
              Bird vaccination record created successfully!
            </Alert>
          )}
          <Form onSubmit={handleFormSubmit}>
            <Row form>
              <Col md={6}>
                {/* Batch Number Input */}
                <FormGroup>
                  <Label style={{ color: 'white' }} for="batchNumber">
                    Batch Number
                  </Label>
                  <Input
                    type="text"
                    name="batchNumber"
                    id="batchNumber"
                    value={formData.batchNumber}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {/* Breed Input */}
                <FormGroup>
                  <Label style={{ color: 'white' }} for="breed">
                    Breed
                  </Label>
                  <Input
                    type="text"
                    name="breed"
                    id="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                {/* Vaccination Date Input */}
                <FormGroup>
                  <Label style={{ color: 'white' }} for="vaccinationDate">
                    Vaccination Date
                  </Label>
                  <Input
                    type="date"
                    name="vaccinationDate"
                    id="vaccinationDate"
                    value={formData.vaccinationDate}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {/* Vaccine Input */}
                <FormGroup>
                  <Label style={{ color: 'white' }} for="vaccine">
                    Vaccine
                  </Label>
                  <Input
                    type="text"
                    name="vaccine"
                    id="vaccine"
                    value={formData.vaccine}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                {/* Age in Days Input */}
                <FormGroup>
                  <Label style={{ color: 'white' }} for="ageInDays">
                    Age in Days
                  </Label>
                  <Input
                    type="number"
                    name="ageInDays"
                    id="ageInDays"
                    value={formData.ageInDays}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                {/* Vaccinated By Input */}
                <FormGroup>
                  <Label style={{ color: 'white' }} for="vaccinatedBy">
                    Vaccinated By
                  </Label>
                  <Input
                    type="text"
                    name="vaccinatedBy"
                    id="vaccinatedBy"
                    value={formData.vaccinatedBy}
                    onChange={handleInputChange}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="primary" className="mt-3">
              Record Vaccination
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecordVaccination;
