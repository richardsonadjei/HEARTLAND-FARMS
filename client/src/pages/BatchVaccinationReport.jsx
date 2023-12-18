import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const BatchVaccinationReport = () => {
  // State for form values
  const [selectedBatch, setSelectedBatch] = useState(null);

  // State for batch numbers fetched from the API
  const [allBatchNumbers, setAllBatchNumbers] = useState([]);

  // State for bird vaccinations for a particular batch
  const [birdVaccinations, setBirdVaccinations] = useState([]);

  // State to control report visibility
  const [showReport, setShowReport] = useState(false);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-batchesNoDates');
      if (!response.ok) {
        throw new Error('Error fetching batch numbers');
      }
      const responseData = await response.json();
  
      // Ensure data is an object with a truthy 'data' property
      if (responseData && responseData.data && Array.isArray(responseData.data)) {
        const formattedBatchNumbers = responseData.data.map(batch => ({
          value: batch.batchNumber,
          label: batch.batchNumber
        }));
        setAllBatchNumbers(formattedBatchNumbers);
      
      } else {
        setAllBatchNumbers([]);
        
      }
    } catch (error) {
      console.error('Error fetching batch numbers:', error.message);
    }
  };
  
  
  useEffect(() => {
   
    fetchBatchNumbers();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch bird vaccinations for the selected batchNumber
      const response = await fetch(`/api/birdVaccinations/batch/${selectedBatch.value}`);
      const data = await response.json();

      setBirdVaccinations(data);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching bird vaccinations:', error);
    }
  };

  

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="batchNumber" className="text-black">
                Select Batch Number
              </Label>
              <Select
                id="batchNumber"
                name="batchNumber"
                value={selectedBatch}
                onChange={(selectedOption) => setSelectedBatch(selectedOption)}
                options={allBatchNumbers}
                placeholder="Select Batch Number"
                isSearchable
                styles={{
                    option: (provided, state) => ({
                      ...provided,
                      color: 'black', // Set the desired text color for the options
                    }),
                  }}
              />
            </FormGroup>
            <FormGroup>
              <Button type="submit" color="primary">
                Generate Report
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>

      {showReport && (
        <Row className="mt-5">
          <Col>
            <h2 className="text-white">Bird Vaccination Report - Batch {selectedBatch.value}</h2>
            <Table bordered responsive className="mt-3">
              <thead>
                <tr>
                  <th>Breed</th>
                  <th>Vaccination Date</th>
                  <th>Vaccine</th>
                  <th>Age in Days</th>
                  <th>Vaccinated By</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(birdVaccinations) && birdVaccinations.length > 0 ? (
                  birdVaccinations.map((vaccination) => (
                    <tr key={vaccination._id}>
                      <td>{vaccination.breed}</td>
                      <td>{new Date(vaccination.vaccinationDate).toLocaleDateString()}</td>
                      <td>{vaccination.vaccine}</td>
                      <td>{vaccination.ageInDays}</td>
                      <td>{vaccination.vaccinatedBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No bird vaccinations found for batchNumber {selectedBatch.value}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BatchVaccinationReport;
