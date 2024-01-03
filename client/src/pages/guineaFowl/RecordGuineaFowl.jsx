import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';
import Select from 'react-select'; // Assuming you have installed react-select
import { useSelector } from 'react-redux';

const RecordGuineaFowl = () => {
    const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    quantity: 0,
    arrivalDate: new Date().toISOString().slice(0, 10),
    createdBy: currentUser ? currentUser.userName : '',
    farmSection: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [farmSections, setFarmSections] = useState([]);

  useEffect(() => {
    // Fetch farm sections when the component mounts
    const fetchFarmSections = async () => {
      try {
        const response = await fetch('/api/all-sections');
        const data = await response.json();
        setFarmSections(data);
      } catch (error) {
        console.error('Error fetching farm sections:', error);
      }
    };

    fetchFarmSections();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the server to record guinea fowl
      const response = await fetch('/api/add-guinea-fowl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed (e.g., show a success message)
      if (response.ok) {
        setSuccessMessage('New Batch recorded successfully');
        // Clear the form after successful submission
        setFormData({
          quantity: 0,
          arrivalDate: new Date().toISOString().slice(0, 10),
          createdBy: currentUser ? currentUser.userName : '',
          farmSection: '',
        });
        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
          // Redirect to /guinea-fowl-dashboard after 3 seconds
          window.location.href = '/guinea-fowl-dashboard';
        }, 3000);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.error}`);
        // Hide error message after 3 seconds
        setTimeout(() => {
          setErrorMessage(null);
          // Refresh the page on error
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      // Handle errors (e.g., show an error message)
      console.error('Error recording guinea fowl:', error);
      setErrorMessage('Error recording guinea fowl');
      // Hide error message after 3 seconds
      setTimeout(() => {
        setErrorMessage(null);
        // Refresh the page on error
        window.location.reload();
      }, 3000);
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
      <Row className="justify-content-center mt-5">
        <Col md={8}>
          <Form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.8)', borderRadius: '15px', padding: '20px' }}>
            <h2 className="text-dark mb-4">Record Guinea Fowl</h2>
            {successMessage && <Alert color="success">{successMessage}</Alert>}
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
            <FormGroup row>
              <Label for="quantity" sm={3} className="text-dark">
                Quantity
              </Label>
              <Col sm={9}>
                <Input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Enter quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="arrivalDate" sm={3} className="text-dark">
                Arrival Date
              </Label>
              <Col sm={9}>
                <Input
                  type="date"
                  name="arrivalDate"
                  id="arrivalDate"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  required
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="farmSection" sm={3} className="text-dark">
                Farm Section
              </Label>
              <Col sm={9}>
                <Select
                  options={farmSections.map((section) => ({
                    value: section.sectionName,
                    label: section.sectionName,
                  }))}
                  onChange={(selectedOption) =>
                    setFormData((prevData) => ({
                      ...prevData,
                      farmSection: selectedOption.value,
                    }))
                  }
                  value={{ value: formData.farmSection, label: formData.farmSection }}
                  placeholder="Select Farm Section"
                  isSearchable
                  styles={customStyles}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="createdBy" sm={3} className="text-dark">
                Created By
              </Label>
              <Col sm={9}>
                <Input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  value={currentUser ? currentUser.userName : ''}
                  readOnly
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col sm={{ size: 9, offset: 3 }}>
                <Button type="submit" color="primary">
                  Add New Batch 
                </Button>
              </Col>
            </FormGroup>
          </Form>
         
        </Col>
      </Row>
    </Container>
  );
};

export default RecordGuineaFowl;
