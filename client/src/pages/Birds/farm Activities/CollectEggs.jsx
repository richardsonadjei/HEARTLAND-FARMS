import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const CollectEggs = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [farmSections, setFarmSections] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [formData, setFormData] = useState({
    farmSection: '',
    date: '',
    type: '',
    size: '',
    crates: 0,
    loose: 0,
    category: 'unsorted',
    grading: 'good-condition',
    recordedBy: currentUser ? currentUser.userName : '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSizes, setShowSizes] = useState(false);

  useEffect(() => {
    fetchFarmSections();
    fetchTypeOptions();
  }, []);

  const fetchFarmSections = async () => {
    try {
      const response = await fetch('/api/all-bird-farm-sections');
      if (!response.ok) {
        throw new Error('Failed to fetch farm sections');
      }
      const sections = await response.json();
      const options = sections.map((section) => ({ value: section.sectionName , label: section.sectionName }));
      setFarmSections(options);
    } catch (error) {
      console.error(error.message);
    }
  };

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
      const response = await fetch('/api/collect-eggs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to collect eggs');
      }
      setSuccessMessage('Eggs collected successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
        window.location.reload();
      }, 3000);
    }
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, category: value });
    setShowSizes(value === 'sorted');
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Collect Eggs</h1>
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
              <Label for="farmSection">Farm Section</Label>
              <Select
                id="farmSection"
                options={farmSections}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'farmSection')}
                isSearchable
                placeholder="Select Farm Section"
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="date"
                id="date"
                value={formData.date}
                onChange={(e) => handleInputChangeText(e, 'date')}
                required
              />
            </FormGroup>
          </Col>
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
          <Col md={6}>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                id="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
              >
                <option value="sorted">Sorted</option>
                <option value="unsorted">Unsorted</option>
              </Input>
            </FormGroup>
          </Col>
          {showSizes && (
            <>
              <Col md={6}>
                <FormGroup>
                  <Label for="size">Size</Label>
                  <Input
                    type="select"
                    id="size"
                    value={formData.size}
                    onChange={(e) => handleInputChangeText(e, 'size')}
                    required
                  >
                    <option value="">Select Size</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="extraLarge">Extra Large</option>
                  </Input>
                </FormGroup>
              </Col>
            </>
          )}
          <Col md={6}>
            <FormGroup>
              <Label for="crates">Crates</Label>
              <Input
                type="number"
                id="crates"
                value={formData.crates}
                onChange={(e) => handleInputChangeText(e, 'crates')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="loose">Loose</Label>
              <Input
                type="number"
                id="loose"
                value={formData.loose}
                onChange={(e) => handleInputChangeText(e, 'loose')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="grading">Grading</Label>
              <Input
                type="select"
                id="grading"
                value={formData.grading}
                onChange={(e) => handleInputChangeText(e, 'grading')}
                required
              >
                <option value="good-condition">Good Condition</option>
                <option value="deformed">Deformed</option>
                <option value="cracked">Cracked</option>
              </Input>
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="recordedBy">Recorded By</Label>
              <Input
                type="text"
                id="recordedBy"
                value={formData.recordedBy}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default CollectEggs;
