import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const AddBirdVaccinationChart = () => {
  const [drugOptions, setDrugOptions] = useState([]);
  const [selectedDrug, setSelectedDrug] = useState(null);
  const [description, setDescription] = useState('');
  const [ageRangeStart, setAgeRangeStart] = useState('');
  const [ageRangeEnd, setAgeRangeEnd] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchDrugOptions();
  }, []);

  const fetchDrugOptions = async () => {
    try {
      const response = await fetch('/api/bird-drugs');
      if (!response.ok) {
        throw new Error('Failed to fetch bird drugs');
      }
      const data = await response.json();
      const options = data.map(drug => ({ value: drug._id, label: drug.name }));
      setDrugOptions(options);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/vaccination-chart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ drugName: selectedDrug.label, description, ageRangeStart: Number(ageRangeStart), ageRangeEnd: Number(ageRangeEnd) }),
      });
      if (!response.ok) {
        throw new Error('Failed to create vaccine');
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Redirect after 1 second
    } catch (error) {
      setError(error.message);
    }
  };
  

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add New Vaccin Routine To Chart</h1>
          {error && <p className="text-danger">{error}</p>}
          {success && (
            <p className="text-success">Vaccine created successfully. Redirecting...</p>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="drug">Drug Name</Label>
              <Select
                options={drugOptions}
                value={selectedDrug}
                onChange={setSelectedDrug}
                placeholder="Select drug..."
                isSearchable
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ageRangeStart">Age Range Start</Label>
              <Input
                type="number"
                id="ageRangeStart"
                value={ageRangeStart}
                onChange={(e) => setAgeRangeStart(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="ageRangeEnd">Age Range End</Label>
              <Input
                type="number"
                id="ageRangeEnd"
                value={ageRangeEnd}
                onChange={(e) => setAgeRangeEnd(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBirdVaccinationChart;
