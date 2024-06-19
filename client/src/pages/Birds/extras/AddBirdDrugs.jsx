import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const AddBirdDrug = () => {
  const [name, setName] = useState('');
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dosage, setDosage] = useState('');
  const [usageInstructions, setUsageInstructions] = useState('');
  const [warnings, setWarnings] = useState('');
  const [precautions, setPrecautions] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCategoryOptions();
  }, []);

  const fetchCategoryOptions = async () => {
    try {
      const response = await fetch('/api/medication-categories');
      if (!response.ok) {
        throw new Error('Failed to fetch medication categories');
      }
      const data = await response.json();
      const options = data.map(category => ({ value: category._id, label: category.name }));
      setCategoryOptions(options);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bird-drugs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category: selectedCategory.value, dosage, usageInstructions, warnings, precautions }),
      });
      if (!response.ok) {
        throw new Error('Failed to create bird drug');
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
          <h1>Add New Bird Drug</h1>
          {error && <p className="text-danger">{error}</p>}
          {success && (
            <p className="text-success">Bird drug created successfully. Redirecting...</p>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="category">Category</Label>
              <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={setSelectedCategory}
                placeholder="Select category..."
                isSearchable
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="dosage">Dosage</Label>
              <Input
                type="text"
                id="dosage"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="usageInstructions">Usage Instructions</Label>
              <Input
                type="textarea"
                id="usageInstructions"
                value={usageInstructions}
                onChange={(e) => setUsageInstructions(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="warnings">Warnings</Label>
              <Input
                type="textarea"
                id="warnings"
                value={warnings}
                onChange={(e) => setWarnings(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="precautions">Precautions</Label>
              <Input
                type="textarea"
                id="precautions"
                value={precautions}
                onChange={(e) => setPrecautions(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBirdDrug;
