import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const GuineaFowlBatchVaccinationReport = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [vaccinationRecords, setVaccinationRecords] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [batchOptions, setBatchOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Fetch available batch numbers when the component mounts
    fetchBatchNumbers();
  }, []);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-guinea-fowl');
      if (response.ok) {
        const data = await response.json();
        // Map batch numbers to options format required by react-select
        const options = data.map((batch) => ({
          value: batch.batchNumber,
          label: `${batch.batchNumber} - Stock: ${batch.quantity}`,
        }));
        setBatchOptions(options);
      } else {
        console.error('Error fetching batch numbers');
      }
    } catch (error) {
      console.error('Error fetching batch numbers:', error);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setBatchNumber(selectedOption.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/guineaFowlVaccinations/batch/${batchNumber}`);
      if (response.ok) {
        const data = await response.json();
        // Convert dates to local format
        const formattedRecords = data.map((record) => ({
          ...record,
          vaccinationDate: new Date(record.vaccinationDate).toLocaleDateString('en-GB'),
        }));
        setVaccinationRecords(formattedRecords);
        setShowReport(true);
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error fetching vaccination records';
        setErrorMessage(errorMessage);
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrorMessage('Error submitting form');
      setTimeout(() => {
        setErrorMessage(null);
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
    <Container className="mt-5">
      <Row>
        <Col>
          <h2 style={{ color: 'white' }}>Guinea Fowl Batch Vaccination Report</h2>
          {errorMessage && (
            <div className="alert alert-danger" style={{ marginBottom: '10px' }}>
              {errorMessage}
            </div>
          )}
          <Form
            onSubmit={handleSubmit}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '20px',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber" style={{ color: 'white' }}>
                    Batch Number
                  </Label>
                  <Select
                    id="batchNumber"
                    name="batchNumber"
                    value={batchOptions.find((option) => option.value === batchNumber)}
                    onChange={handleSelectChange}
                    options={batchOptions}
                    required
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Button type="submit" color="primary">
                    Generate Report
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>

          {showReport && (
            <div className="mt-4">
              <h3 style={{ color: 'white' }}>Vaccination Records for Batch {batchNumber}</h3>
              <Table responsive striped bordered hover style={{ marginTop: '20px' }}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Vaccination Date</th>
                    <th>Vaccine</th>
                    <th>Age in Days</th>
                    <th>Vaccinated By</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccinationRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{record.vaccinationDate}</td>
                      <td>{record.vaccine}</td>
                      <td>{record.ageInDays}</td>
                      <td>{record.vaccinatedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GuineaFowlBatchVaccinationReport;
