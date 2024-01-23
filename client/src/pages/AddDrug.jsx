import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AddDrugs = () => {
  const [medication, setMedication] = useState({
    name: '',
    category: '',
    dosage: '',
    usageInstructions: '',
    warnings: '',
    precautions: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/view-medication-categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data); // Update the state with the correct data
        } else {
          setError('Unable to fetch medication categories');
        }
      } catch (error) {
        setError('An error occurred while fetching medication categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedication({ ...medication, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/create-drugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication),
      });

      if (response.ok) {
        setSuccess(true);
        setError(null);
        setMedication({
          name: '',
          category: '',
          dosage: '',
          usageInstructions: '',
          warnings: '',
          precautions: '',
        });

        // Navigate to /medication after a short delay (to allow the success message to be displayed)
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        const data = await response.json();
        setError(data.error);
        setSuccess(false);
      }
    } catch (error) {
      setError('An error occurred while creating the medication.');
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Row>
        <Col sm="12">
          <h2 style={{ color: 'white' }}>Create New Medication/Vaccine</h2>
        </Col>
      </Row>
      {success && (
        <Row>
          <Col sm="12">
            <div className="alert alert-success" role="alert">
              Medication created successfully!
            </div>
          </Col>
        </Row>
      )}
      {error && (
        <Row>
          <Col sm="12">
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          </Col>
        </Row>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label style={{ color: 'white' }}>Name</Label>
              <Input type="text" name="name" value={medication.name} onChange={handleInputChange} required />
            </FormGroup>
            <FormGroup>
              <Label style={{ color: 'white' }}>Category</Label>
              <Input type="select" name="category" value={medication.category} onChange={handleInputChange} required>
                <option value="" disabled>Select Category</option>
                {categories && categories.map((category) => (
                  <option key={category._id} value={category.name}>{category.name}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label style={{ color: 'white' }}>Dosage</Label>
              <Input type="text" name="dosage" value={medication.dosage} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Label style={{ color: 'white' }}>Usage Instructions</Label>
              <Input
                type="text"
                name="usageInstructions"
                value={medication.usageInstructions}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col sm="6">
            <FormGroup>
              <Label style={{ color: 'white' }}>Warnings</Label>
              <Input type="text" name="warnings" value={medication.warnings} onChange={handleInputChange} />
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label style={{ color: 'white' }}>Precautions</Label>
              <Input type="text" name="precautions" value={medication.precautions} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">
                Add Medication
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default AddDrugs;
