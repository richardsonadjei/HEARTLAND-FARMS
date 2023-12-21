import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';
import Select from 'react-select';

const RecordMortality = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [date, setDate] = useState('');
  const [count, setCount] = useState('');
  const [cause, setCause] = useState('');
  const [notes, setNotes] = useState('');
  const [recordedBy, setRecordedBy] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('');

  useEffect(() => {
    const fetchBatchNumbers = async () => {
      try {
        const batchResponse = await fetch('/api/all-batchesNoDates');
        if (!batchResponse.ok) {
          throw new Error('Error fetching batch numbers');
        }
        const batchData = await batchResponse.json();

        if (batchData && batchData.data && Array.isArray(batchData.data)) {
          const formattedBatchNumbers = batchData.data.map((batch) => ({
            value: batch.batchNumber,
            label: batch.batchNumber,
          }));
          setBatchNumbers(formattedBatchNumbers);
        } else {
          setBatchNumbers([]);
        }
      } catch (error) {
        console.error('Error fetching batch numbers:', error.message);
      }
    };

    fetchBatchNumbers();
  }, []);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? 'blue' : 'white',
    }),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/record-mortality', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchNumber,
          date,
          count,
          cause,
          notes,
          recordedBy,
        }),
      });

      if (!response.ok) {
        throw new Error('Error recording mortality');
      }

      setAlertMessage('Mortality recorded successfully');
      setAlertColor('success');
      setShowAlert(true);

      // Clear the form
      setBatchNumber('');
      setDate('');
      setCount('');
      setCause('');
      setNotes('');
      setRecordedBy('');

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowAlert(false);
        // Redirect to '/move-birds'
        window.location.href = '/poultry-dashboard';
      }, 3000);
    } catch (error) {
      console.error('Error recording mortality:', error.message);
      setAlertMessage('Error recording mortality');
      setAlertColor('danger');
      setShowAlert(true);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-white">Record Mortality</h2>
          {showAlert && <Alert color={alertColor}>{alertMessage}</Alert>}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="batchNumber" className="text-white">
                Batch Number
              </Label>
              <Select
                id="batchNumber"
                name="batchNumber"
                value={batchNumbers.find((option) => option.value === batchNumber)}
                onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
                options={batchNumbers}
                placeholder="Select Batch Number"
                isSearchable
                styles={customStyles}
              />
            </FormGroup>
            <FormGroup>
              <Label for="date" className="text-white">
                Date
              </Label>
              <Input
                type="date"
                id="date"
                name="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="count" className="text-white">
                Count
              </Label>
              <Input
                type="number"
                id="count"
                name="count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="cause" className="text-white">
                Cause
              </Label>
              <Input
                type="text"
                id="cause"
                name="cause"
                value={cause}
                onChange={(e) => setCause(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="notes" className="text-white">
                Notes
              </Label>
              <Input
                type="textarea"
                id="notes"
                name="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="recordedBy" className="text-white">
                Recorded By
              </Label>
              <Input
                type="text"
                id="recordedBy"
                name="recordedBy"
                value={recordedBy}
                onChange={(e) => setRecordedBy(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit" color="primary">
                Record Mortality
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecordMortality;
