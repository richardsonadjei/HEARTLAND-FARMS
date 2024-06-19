import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const LoadEggs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [typeOptions, setTypeOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    dateLoaded: '',
    numberOfEggs: '',
    incubatorId: '',
    expectedHatchDate: '', // Added expectedHatchDate field
    notes: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTypeOptions();
  }, []);

  const fetchTypeOptions = async () => {
    try {
      const response = await fetch('/api/all-birds-types');
      if (!response.ok) {
        throw new Error('Failed to fetch bird types');
      }
      const types = await response.json();
      const sortedTypes = types.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedTypes.map((type) => ({ value: type.name, label: type.name }));
      setTypeOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bird-eggs-incubator-loading', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to load bird eggs into incubator');
      }
      setSuccessMessage('Bird eggs loaded into incubator successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
        window.location.reload();
      }, 1000000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Load Bird Eggs into Incubator</h1>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="type">Type</Label>
              <Select
                id="type"
                options={typeOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'type')}
                isSearchable
                placeholder="Select Type"
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="dateLoaded">Date Loaded</Label>
              <Input
                type="date"
                id="dateLoaded"
                value={formData.dateLoaded}
                onChange={(e) => handleInputChangeText(e, 'dateLoaded')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="numberOfEggs">Number of Eggs</Label>
              <Input
                type="number"
                id="numberOfEggs"
                value={formData.numberOfEggs}
                onChange={(e) => handleInputChangeText(e, 'numberOfEggs')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="expectedHatchDate">Expected Hatch Date</Label>
              <Input
                type="date"
                id="expectedHatchDate"
                value={formData.expectedHatchDate}
                onChange={(e) => handleInputChangeText(e, 'expectedHatchDate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="incubatorId">Incubator ID</Label>
              <Input
                type="text"
                id="incubatorId"
                value={formData.incubatorId}
                onChange={(e) => handleInputChangeText(e, 'incubatorId')}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="notes">Notes</Label>
              <Input
                type="textarea"
                id="notes"
                value={formData.notes}
                onChange={(e) => handleInputChangeText(e, 'notes')}
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default LoadEggs;
