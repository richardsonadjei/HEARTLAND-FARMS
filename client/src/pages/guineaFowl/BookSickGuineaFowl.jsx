import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const GuineaFowlHealthRecord = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [observationDate, setObservationDate] = useState('');
  const [details, setDetails] = useState('');
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState('');
  const [recordedBy, setRecordedBy] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBatchNumbers = async () => {
      try {
        const response = await fetch('/api/all-guinea-fowl');
        if (!response.ok) {
          throw new Error('Error fetching batch numbers');
        }
        const data = await response.json();
  
        if (data && Array.isArray(data)) {
          const formattedBatchNumbers = data.map((batch) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/add-guinea-fowl-health-record', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchNumber,
          observationDate,
          details,
          provisionalDiagnosis,
          recordedBy: currentUser ? currentUser.userName : '',
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating guinea fowl health record');
      }

      setMessage('Guinea fowl health record has been created successfully!');
      setTimeout(() => {
        window.location.href = '/guinea-fowl-dashboard';
      }, 3000);
    } catch (error) {
      setError('Error creating guinea fowl health record');
      setTimeout(() => {
        setError('');
      }, 3000);
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
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <h2 className="text-white">Record Guinea Fowl Health Condition</h2>
          {message && <div className="text-success">{message}</div>}
            {error && <div className="text-danger">{error}</div>}
          <Form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber" className="text-black">
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
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="observationDate" className="text-black">
                    Observation Date
                  </Label>
                  <Input
                    type="date"
                    id="observationDate"
                    name="observationDate"
                    value={observationDate}
                    onChange={(e) => setObservationDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="details" className="text-black">
                    Details
                  </Label>
                  <Input
                    type="textarea"
                    id="details"
                    name="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    style={{ height: '120px' }}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="provisionalDiagnosis" className="text-black">
                    Provisional Diagnosis
                  </Label>
                  <Input
                    type="textarea"
                    id="provisionalDiagnosis"
                    name="provisionalDiagnosis"
                    value={provisionalDiagnosis}
                    onChange={(e) => setProvisionalDiagnosis(e.target.value)}
                    style={{ height: '120px' }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="recordedBy" className="text-black">
                    Recorded By
                  </Label>
                  <Input
                    type="text"
                    id="recordedBy"
                    name="recordedBy"
                    value={recordedBy || (currentUser ? currentUser.userName : '')}
                    onChange={(e) => setRecordedBy(e.target.value)}
                    readOnly
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button type="submit" color="primary">
                Record Guinea Fowl Health Condition
              </Button>
            </FormGroup>
         
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default GuineaFowlHealthRecord;
