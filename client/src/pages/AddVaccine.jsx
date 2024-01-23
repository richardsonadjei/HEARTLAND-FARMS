import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';


const AddVaccine = () => {
  const [medication, setMedication] = useState({
    name: '',
    description: '',
    ageRangeStart: '',
    ageRangeEnd: '',
  });
  const [medicationNames, setMedicationNames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/all-drugs');
        if (response.ok) {
          const data = await response.json();
          const names = data.map((med) => ({ value: med.name, label: med.name }));
          setMedicationNames(names);
        } else {
          console.error('Failed to fetch medications');
        }
      } catch (error) {
        console.error(`Error: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMedication({ ...medication, [name]: value });
  };

  const handleNameChange = (selectedOption) => {
    setMedication({ ...medication, name: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-vaccination', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(medication),
      });

      if (response.ok) {
        // Medication created successfully
        alert('Medication created successfully');
        window.location.href = '/'; // Navigate to /medication
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error creating medication:', error);
      alert('Error creating medication');
    }
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? '2px solid #2684FF' : '1px solid #CED4DA',
      boxShadow: state.isFocused ? '0 0 0 0.1rem rgba(38, 132, 255, 0.25)' : null,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#2684FF' : 'white',
      color: state.isSelected ? 'white' : 'black',
    }),
  };
  return (
    <Container>
      <Row className="mt-4">
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-white mb-4">Add New Vaccine To Vaccination Cycle</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="name" className="text-white" md={3}>
                Name
              </Label>
              <Col md={9}>
                <Select
                  options={medicationNames}
                  isSearchable
                  placeholder="Select Medication"
                  onChange={handleNameChange}
                  styles={customStyles}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="description" className="text-white" md={3}>
                Description
              </Label>
              <Col md={9}>
                <Input
                  type="textarea"
                  name="description"
                  id="description"
                  placeholder="Medication Description"
                  value={medication.description}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="ageRangeStart" className="text-white" md={3}>
                Age Range Start
              </Label>
              <Col md={4}>
                <Input
                  type="number"
                  name="ageRangeStart"
                  id="ageRangeStart"
                  placeholder="Start Age"
                  value={medication.ageRangeStart}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Label for="ageRangeEnd" className="text-white" md={2}>
                Age Range End
              </Label>
              <Col md={3}>
                <Input
                  type="number"
                  name="ageRangeEnd"
                  id="ageRangeEnd"
                  placeholder="End Age"
                  value={medication.ageRangeEnd}
                  onChange={handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md={{ size: 9, offset: 3 }}>
                <Button type="submit" color="primary">
                  Add
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddVaccine;
