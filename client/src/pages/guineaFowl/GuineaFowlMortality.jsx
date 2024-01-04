import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const GuineaFowlMortality = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [batchNumber, setBatchNumber] = useState('');
  const [quantity, setQuantity] = useState('');
  const [cause, setCause] = useState('');
  const [recordedBy, setRecordedBy] = useState(currentUser ? currentUser.userName : '');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [batchOptions, setBatchOptions] = useState([]);

  useEffect(() => {
    // Fetch available batch options when the component mounts
    fetchBatchOptions();
  }, []);

  const fetchBatchOptions = async () => {
    try {
      const response = await fetch('/api/all-guinea-fowl');
      if (!response.ok) {
        throw new Error('Error fetching batch options');
      }
      const batches = await response.json();

      if (Array.isArray(batches)) {
        const options = batches.map((batch) => ({
          value: batch.batchNumber,
          label: `${batch.batchNumber} - Stock: ${batch.quantity}`,
          quantity: parseInt(batch.quantity, 10) || 0,
        }));
        setBatchOptions(options);
      } else {
        throw new Error('Invalid data structure in the response');
      }
    } catch (error) {
      console.error('Error fetching batch options:', error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/recordGuineaFowlMortality', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchNumber,
          quantity,
          cause,
          recordedBy,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrorMessage(data.message);
        setSuccessMessage('');
      } else {
        setSuccessMessage('Bird mortality recorded successfully!');

        // Display success message for 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
          // Redirect to /guinea-fowl-dashboard after a successful record
          window.location.href = '/guinea-fowl-dashboard';
        }, 3000);
      }
    } catch (error) {
      setErrorMessage('Error recording bird mortality');

      // Display error message for 3 seconds
      setTimeout(() => {
        setErrorMessage('');
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
      backgroundColor: 'transparent',
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }),
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Record Guinea Fowl Mortality</h2>
          {errorMessage && <div className="text-danger text-center">{errorMessage}</div>}
          {successMessage && <div className="text-success text-center">{successMessage}</div>}
          <Form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <FormGroup>
              <Label for="batchNumber" className="text-black">Batch Number:</Label>
              <Select
                id="batchNumber"
                name="batchNumber"
                value={batchOptions.find((opt) => opt.value === batchNumber)}
                onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
                options={batchOptions}
                isSearchable
                styles={customStyles}
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantity" className="text-black">Quantity:</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="cause" className="text-black">Cause:</Label>
              <Input
                type="textarea"
                id="cause"
                name="cause"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="recordedBy" className="text-black">Recorded By:</Label>
              <Input
                type="text"
                id="recordedBy"
                name="recordedBy"
                value={recordedBy}
                onChange={(e) => setRecordedBy(e.target.value)}
                required
                readOnly
              />
            </FormGroup>
            <FormGroup className="text-center">
              <Button type="submit" color="primary">Record Mortality</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default GuineaFowlMortality;
