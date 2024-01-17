import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const AddPigMortality = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    pigIdentityNumber: '',
    dateOfDeath: '',
    causeOfDeath: '',
    recordedBy: currentUser ? currentUser.userName : '',
  });

  const [pigOptions, setPigOptions] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch pig identity numbers for the dropdown
    const fetchPigIdentityNumbers = async () => {
      try {
        const response = await fetch('/api/all-pigs');
        if (response.ok) {
          const data = await response.json();
          const options = data.pigStocks.map((pig) => ({
            value: pig.identityNumber,
            label: pig.identityNumber,
          }));
          setPigOptions(options);
        } else {
          console.error('Failed to fetch pig identity numbers');
        }
      } catch (error) {
        console.error('An unexpected error occurred while fetching pig identity numbers');
      }
    };

    fetchPigIdentityNumbers();
  }, []);

  const handleChange = (selectedOption, name) => {
    setFormData({ ...formData, [name]: selectedOption ? selectedOption.value : '' });
  };

  const handleDateChange = (e) => {
    setFormData({ ...formData, dateOfDeath: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/create-pig-mortality', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
        }),
      });

      if (response.ok) {
        setSuccessMessage('Pig mortality recorded successfully!');
        setTimeout(() => {
          setSuccessMessage('');
          // Replace with the actual route you want to navigate to
          window.location.href = '/pig-farm-dashboard';
        }, 2000);
      } else {
        setErrorMessage('Failed to record pig mortality. Please try again.');
        setTimeout(() => {
          setErrorMessage('');
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('An unexpected error occurred while recording pig mortality');
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
          <Form onSubmit={handleSubmit} className="record-mortality-form">
            <h2 className="mb-4">Record Pig Mortality</h2>
            {successMessage && <div className="mt-3 text-success">{successMessage}</div>}
            {errorMessage && <div className="mt-3 text-danger">{errorMessage}</div>}
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="pigIdentityNumber">Pig Identity Number</Label>
                  <Select
                    id="pigIdentityNumber"
                    name="pigIdentityNumber"
                    options={pigOptions}
                    value={{ value: formData.pigIdentityNumber, label: formData.pigIdentityNumber }}
                    onChange={(selectedOption) => handleChange(selectedOption, 'pigIdentityNumber')}
                    placeholder="Select Pig Identity Number"
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="dateOfDeath">Date of Death</Label>
                  <Input
                    type="date"
                    name="dateOfDeath"
                    id="dateOfDeath"
                    value={formData.dateOfDeath}
                    onChange={handleDateChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="causeOfDeath">Cause of Death</Label>
                  <textarea
  name="causeOfDeath"
  id="causeOfDeath"
  value={formData.causeOfDeath}
  onChange={(e) => handleChange({ value: e.target.value }, 'causeOfDeath')}
  rows="6" // You can adjust the number of rows as needed
  style={{ width: '100%', height: '150px' }} // Adjust the width and height as needed
/>



                </FormGroup>
              </Col>
              {/* Include the recordedBy input field */}
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
              Record Mortality
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddPigMortality;
