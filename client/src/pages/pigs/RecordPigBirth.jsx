import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';

const RecordPigBirth = () => {
    const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    sowIdentityNumber: '',
    dateOfBirth: '',
    numberOfMalePiglets: 0,
    numberOfFemalePiglets: 0,
    recordedBy:  currentUser ? currentUser.userName : '',
  });

  const [sowOptions, setSowOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch sow identity numbers for the dropdown
    const fetchSowIdentityNumbers = async () => {
      try {
        const response = await fetch('/api/all-sow-stock');
        if (response.ok) {
          const data = await response.json();
          const options = data.pigStocks.map((sow) => ({
            value: sow.identityNumber,
            label: sow.identityNumber,
          }));
          setSowOptions(options);
        } else {
          console.error('Failed to fetch sow identity numbers');
        }
      } catch (error) {
        console.error('An unexpected error occurred while fetching sow identity numbers');
      }
    };

    fetchSowIdentityNumbers();
  }, []);

  const handleChange = (selectedOption, name) => {
    setFormData({ ...formData, [name]: selectedOption ? selectedOption.value : '' });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, dateOfBirth: e.target.value });
  };

  const handleNumberChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value, 10) || 0 });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-sow-births', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });

      if (response.ok) {
        setSuccessMessage('Sow birth recorded successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          // Replace with the actual route you want to navigate to
          window.location.href = '/pig-farm-dashboard';
        }, 3000);
      } else {
        setErrorMessage('Failed to record sow birth. Please try again.');
        setTimeout(() => {
          setErrorMessage('');
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.error('An unexpected error occurred while recording sow birth');
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#d3d3d3' : 'white',
      color: state.isFocused ? 'black' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="record-birth-form">
            <h2 className="mb-4">Record Sow Birth</h2>
            {successMessage && <div className="mt-3 text-success">{successMessage}</div>}
            {errorMessage && <div className="mt-3 text-danger">{errorMessage}</div>}
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="sowIdentityNumber">Sow Identity Number</Label>
                  <Select
                    id="sowIdentityNumber"
                    name="sowIdentityNumber"
                    options={sowOptions}
                    value={{ value: formData.sowIdentityNumber, label: formData.sowIdentityNumber }}
                    onChange={(selectedOption) => handleChange(selectedOption, 'sowIdentityNumber')}
                    placeholder="Select Sow Identity Number"
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="dateOfBirth">Date of Birth</Label>
                  <Input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="numberOfMalePiglets">Number of Male Piglets</Label>
                  <Input
                    type="number"
                    name="numberOfMalePiglets"
                    id="numberOfMalePiglets"
                    value={formData.numberOfMalePiglets}
                    onChange={handleNumberChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="numberOfFemalePiglets">Number of Female Piglets</Label>
                  <Input
                    type="number"
                    name="numberOfFemalePiglets"
                    id="numberOfFemalePiglets"
                    value={formData.numberOfFemalePiglets}
                    onChange={handleNumberChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* Include the recordedBy input field */}
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="recordedBy">Recorded By</Label>
                  <Input
                    type="text"
                    name="recordedBy"
                    id="recordedBy"
                    value={formData.recordedBy}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">
              Record Birth
            </Button>
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecordPigBirth;
