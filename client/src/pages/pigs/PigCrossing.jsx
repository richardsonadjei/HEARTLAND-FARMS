import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const PigCrossing = () => {
  const [formData, setFormData] = useState({
    sowIdentityNumber: '',
    boarBreed: '',
    date: '',
    notes: '',
  });

  const [sowOptions, setSowOptions] = useState([]);
  const [message, setMessage] = useState(null);
  const [pigStocks, setPigStocks] = useState([]);

  useEffect(() => {
    // Fetch sow stock data to populate the dropdown options
    const fetchSowStock = async () => {
      try {
        const response = await fetch('/api/all-sow-stock');
        if (response.ok) {
          const data = await response.json();
          const sowOptions = data.pigStocks.map((sow) => ({
            value: sow.identityNumber,
            label: sow.identityNumber,
          }));
          setSowOptions(sowOptions);
          setPigStocks(data.pigStocks); // Save pigStocks data for reference
        } else {
          console.error('Failed to fetch sow stock data');
        }
      } catch (error) {
        console.error('An unexpected error occurred while fetching sow stock data');
      }
    };

    fetchSowStock();
  }, []);

  const handleChange = (selectedOption) => {
    setFormData({ ...formData, sowIdentityNumber: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-pig-crossings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Pig crossing recorded successfully' });
        setTimeout(() => {
          setMessage(null);
          // Redirect to /pig-farm-dashboard after 3 seconds
          window.location.href = '/pig-farm-dashboard';
        }, 3000);
      } else {
        const data = await response.json();
        setMessage({ type: 'error', text: data.error || 'Failed to record pig crossing' });
        setTimeout(() => {
          setMessage(null);
          // Refresh the page after 3 seconds on error
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An unexpected error occurred' });
      setTimeout(() => {
        setMessage(null);
        // Refresh the page after 3 seconds on error
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
      <Row className="mt-5">
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="pig-crossing-form">
            <h2 className="text-white mb-4">Record Pig Crossing</h2>
            {message && (
            <div className={`mt-3 alert alert-${message.type}`} role="alert">
              {message.text}
            </div>
          )}
            <FormGroup>
              <Label for="sowIdentityNumber" className="text-white">Sow Identity Number</Label>
              <Select
                id="sowIdentityNumber"
                name="sowIdentityNumber"
                options={sowOptions}
                value={sowOptions.find((option) => option.value === formData.sowIdentityNumber)}
                onChange={handleChange}
                isSearchable
                placeholder="Select Sow Identity Number"
                styles={customStyles}
              />
            </FormGroup>
            <FormGroup>
              <Label for="boarBreed" className="text-white">Boar Breed</Label>
              <Input
                type="text"
                name="boarBreed"
                id="boarBreed"
                placeholder="Enter Boar Breed"
                value={formData.boarBreed}
                onChange={(e) => setFormData({ ...formData, boarBreed: e.target.value })}
              />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="date" className="text-white">Date</Label>
                  <Input
                    type="date"
                    name="date"
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="notes" className="text-white">Notes</Label>
                  <Input
                    type="textarea"
                    name="notes"
                    id="notes"
                    placeholder="Enter Notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">Submit</Button>
          </Form>
          
        </Col>
      </Row>
    </Container>
  );
};

export default PigCrossing;
