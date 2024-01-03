import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useLocation } from 'react-router-dom';

const RecordGuineaFowlVaccination = () => {
  const [formData, setFormData] = useState({
    batchNumber: '',
    vaccinationDate: '',
    vaccine: '',
    ageInDays: '',
    vaccinatedBy: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const batchNumber = queryParams.get('batchNumber');
    const ageInDays = queryParams.get('ageInDays');
    const vaccinationDue = queryParams.get('vaccinationDue');

    setFormData({
      batchNumber: batchNumber || '',
      ageInDays: ageInDays || '',
      vaccine: vaccinationDue || '',
      vaccinationDate: '', // Set default values for other fields
      vaccinatedBy: '', // Set default values for other fields
    });
  }, [location.search]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/add-guineaFowlVaccinations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        setSuccessMessage('Vaccination record created successfully');
        setTimeout(() => {
          setSuccessMessage('');
          window.location.href = '/guinea-fowl-dashboard'; // Redirect to /guinea-fowl-dashboard after 3 seconds
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.error}`);
        setTimeout(() => {
          setErrorMessage('');
          window.location.reload(); // Refresh the page after 3 seconds
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{ color: 'white' }}>Record Guinea Fowl Vaccination</h2>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          <Form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <FormGroup row>
              <Label for="batchNumber" style={{ color: 'white' }}>Batch Number</Label>
              <Col>
                <Input
                  type="text"
                  name="batchNumber"
                  id="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </Col>
              <Label for="vaccinationDate" style={{ color: 'white' }}>Vaccination Date</Label>
              <Col>
                <Input
                  type="date"
                  name="vaccinationDate"
                  id="vaccinationDate"
                  value={formData.vaccinationDate}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="vaccine" style={{ color: 'white' }}>Vaccine</Label>
              <Col>
                <Input
                  type="text"
                  name="vaccine"
                  id="vaccine"
                  value={formData.vaccine}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </Col>
              <Label for="ageInDays" style={{ color: 'white' }}>Age in Days</Label>
              <Col>
                <Input
                  type="number"
                  name="ageInDays"
                  id="ageInDays"
                  value={formData.ageInDays}
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="vaccinatedBy" style={{ color: 'white' }}>Vaccinated By</Label>
              <Col>
                <Input
                  type="text"
                  name="vaccinatedBy"
                  id="vaccinatedBy"
                  value={formData.vaccinatedBy}
                  onChange={handleInputChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Button type="submit" color="primary">Submit</Button>
              </Col>
            </FormGroup>
          </Form>
          
        </Col>
      </Row>
    </Container>
  );
};

export default RecordGuineaFowlVaccination;
