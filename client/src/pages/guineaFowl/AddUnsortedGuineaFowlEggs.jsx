import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const RecordUnsortedGuineFowlEggs = () => {
  const [farmSections, setFarmSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [formState, setFormState] = useState({
    farmSection: '',
    date: '',
    crates: 0, // Set default value to 0
    looseEggs: 0, // Set default value to 0
    category: 'unsorted',
    grading: 'good-condition',
    pickedBy: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    // Fetch farm section names from /api/all-sections
    fetch('/api/all-sections')
      .then((response) => response.json())
      .then((data) => {
        // Transform data into options expected by React Select
        const options = data.map((section) => ({ value: section.sectionName, label: section.sectionName }));
        setFarmSections(options);
      })
      .catch((error) => console.error('Error fetching farm sections:', error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Perform the logic to save the record (use formState values)
      const response = await fetch('/api/add-guinea-fowl-unsorted-egg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        // Handle the case where the record creation failed
        alert('Failed to create record. Please try again.');
        return;
      }

      // Show alert and navigate to /poultry
      alert('Record created successfully!');
      window.location.href = '/guinea-fowl-dashboard';
    } catch (error) {
      console.error('Error creating record:', error);
      // Handle other errors if needed
      alert('An error occurred. Please try again later.');
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'white',
    }),
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 style={{ color: 'white' }}>Record Unsorted Eggs</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="farmSection" style={{ color: 'white' }}>Select Farm Section:</Label>
              <Select
                id="farmSection"
                name="farmSection"
                value={selectedSection}
                onChange={(value) => {
                  setSelectedSection(value);
                  setFormState((prevState) => ({ ...prevState, farmSection: value.value }));
                }}
                options={farmSections}
                placeholder="Select Farm Section"
                styles={customStyles}
              />
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label for="date" style={{ color: 'white' }}>Date:</Label>
                <Input
                  type="date"
                  id="date"
                  name="date"
                  value={formState.date}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Label for="crates" style={{ color: 'white' }}>Crates:</Label>
                <Input
                  type="number"
                  id="crates"
                  name="crates"
                  value={formState.crates}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Label for="looseEggs" style={{ color: 'white' }}>Loose Eggs:</Label>
                <Input
                  type="number"
                  id="looseEggs"
                  name="looseEggs"
                  value={formState.looseEggs}
                  onChange={handleInputChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label for="category" style={{ color: 'white' }}>Category:</Label>
                <Input
                  type="text"
                  id="category"
                  name="category"
                  value={formState.category}
                  onChange={handleInputChange}
                  readOnly
                />
              </Col>
              <Col>
                <Label for="grading" style={{ color: 'white' }}>Grading:</Label>
                <Input
                  type="select"
                  id="grading"
                  name="grading"
                  value={formState.grading}
                  onChange={handleInputChange}
                >
                  <option value="good-condition">Good Condition</option>
                  <option value="deformed">Deformed</option>
                  <option value="cracked">Cracked</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup>
              <Label for="pickedBy" style={{ color: 'white' }}>Picked By:</Label>
              <Input
                type="text"
                id="pickedBy"
                name="pickedBy"
                value={formState.pickedBy}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" type="submit">Record Eggs</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecordUnsortedGuineFowlEggs;
