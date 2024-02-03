import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const BirdBatchVaccinationReport = () => {
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    fetchBatchNumbers();
  }, []);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-batchesNoDates');
      if (!response.ok) {
        throw new Error('Error fetching batch numbers');
      }
      const data = await response.json();

      if (data && data.data && data.data.batches && Array.isArray(data.data.batches)) {
        const batchOptions = data.data.batches.map((batch) => ({
          value: batch.batchNumber,
          label: batch.batchNumber,
        }));
        setBatchNumbers(batchOptions);
      } else {
        throw new Error('Invalid data structure in the response');
      }
    } catch (error) {
      console.error('Error fetching batch numbers:', error.message);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    const formattedDateTime = new Date(dateTimeString).toLocaleDateString('en-GB', options);
    return formattedDateTime;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/bird-vaccinations/${selectedBatch.value}`);
      const data = await response.json();

      setReportData(data);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching batch vaccination records:', error);
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
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Batch Vaccination Report</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber"  className="text-black">Batch Number</Label>
                  <Select
                    id="batchNumber"
                    options={batchNumbers}
                    value={selectedBatch}
                    onChange={(value) => setSelectedBatch(value)}
                    placeholder="Select Batch Number"
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">
              Generate Report
            </Button>
          </Form>
        </Col>
      </Row>

      {showReport && (
        <Row className="mt-4">
          <Col>
            <Table responsive>
              <thead style={{ background: '#3498db', color: '#fff', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
                <tr>
                  <th>#</th>
                  <th>Vaccination Date</th>
                  <th>Batch Number</th>
                  <th>Breed</th>
                  <th>Vaccination Type</th>
                  <th>Vaccine</th>
                  <th>Age in Days</th>
                  <th>Vaccinated By</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((record, index) => (
                  <tr key={record._id}>
                    <td>{index + 1}</td>
                    <td>{formatDateTime(record.vaccinationDate)}</td>
                    <td>{record.batchNumber}</td>
                    <td>{record.breed}</td>
                    <td>{record.vaccinationType}</td>
                    <td>{record.vaccine}</td>
                    <td>{record.ageInDays}</td>
                    <td>{record.vaccinatedBy}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BirdBatchVaccinationReport;
