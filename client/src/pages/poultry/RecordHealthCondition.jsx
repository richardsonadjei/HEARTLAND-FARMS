import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux'; // Import the useSelector hook

// Define the RecordHealthCondition component
const RecordHealthCondition = () => {
  // State variables for form data
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [batchNumber, setBatchNumber] = useState('');
  const [observationDate, setObservationDate] = useState('');
  const [details, setDetails] = useState('');
  const [provisionalDiagnosis, setProvisionalDiagnosis] = useState('');
  const [recordedBy, setRecordedBy] = useState('');
  
  // Fetch the current user from the Redux store
  const { currentUser } = useSelector((state) => state.user);

  // Fetch batch numbers on component mount
// Fetch batch numbers on component mount
useEffect(() => {
  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-batchesNoDates');
      if (!response.ok) {
        throw new Error('Error fetching batch numbers');
      }
      const data = await response.json();

      // Check if the data.data.batches property exists and is an array
      if (data && data.data && data.data.batches && Array.isArray(data.data.batches)) {
        const formattedBatchNumbers = data.data.batches.map((batch) => ({
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
}, []); // The empty dependency array ensures that this effect runs only once on component mount


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a health condition record
      const response = await fetch('/api/add-healthConditions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchNumber,
          observationDate,
          details,
          provisionalDiagnosis,
          recordedBy: currentUser ? currentUser.userName : '', // Set recordedBy to the current user
        }),
      });

      if (!response.ok) {
        throw new Error('Error creating health condition record');
      }

      // Display success message and navigate to /move-birds
      alert('Health condition record has been created successfully!');
      window.location.href = '/poultry-getting-started';
    } catch (error) {
      console.error('Error creating health condition record:', error.message);
    }
  };

  // Custom styles for the Select component
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
          <h2 className="text-white">Diagnose Birds</h2>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
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
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="observationDate" className="text-white">
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
                  <Label for="details" className="text-white">
                    Details
                  </Label>
                  <Input
                    type="textarea" // Changed input type to textarea
                    id="details"
                    name="details"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    style={{ height: '120px' }} // Increased textarea height
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
  <FormGroup>
    <Label for="provisionalDiagnosis" className="text-white">
      Provisional Diagnosis
    </Label>
    <Input
      type="textarea"  // Change input type to textarea
      id="provisionalDiagnosis"
      name="provisionalDiagnosis"
      value={provisionalDiagnosis}
      onChange={(e) => setProvisionalDiagnosis(e.target.value)}
      style={{ height: '120px' }}  // Set the desired height for the textarea
    />
  </FormGroup>
</Col>

            </Row>
            <Row form>
              <Col md={6}>
              <FormGroup>
                  <Label for="recordedBy" className="text-white">
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
                Record Health Condition
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RecordHealthCondition;
