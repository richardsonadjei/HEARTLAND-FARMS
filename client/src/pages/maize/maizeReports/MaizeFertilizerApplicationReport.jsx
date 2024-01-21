import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const MaizeFertilizerApplicationReport = () => {
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [fertilizerApplications, setFertilizerApplications] = useState([]);
  const [showReport, setShowReport] = useState(false);

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
  };

  const fetchBatchOptions = async () => {
    try {
      const response = await fetch('/api/all-maize-seasons');
      if (!response.ok) {
        throw new Error('Error fetching batch options');
      }

      const data = await response.json();
      const options = data.maizeSeasons.map((season) => ({
        value: season.batchNumber,
        label: season.batchNumber,
      }));
      setBatchOptions(options);
    } catch (error) {
      console.error('Error fetching batch options:', error);
      // Handle error fetching batch options
    }
  };

  const fetchFertilizerApplications = async () => {
    try {
      const response = await fetch(`/api/maize-fertilizer-application-report/${selectedBatch.value}`);
      if (!response.ok) {
        throw new Error('Error fetching maize fertilizer applications');
      }

      const data = await response.json();
      setFertilizerApplications(data.fertilizerApplications);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching maize fertilizer applications:', error);
      // Handle error fetching maize fertilizer applications
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBatch) {
      fetchFertilizerApplications();
    }
  };

  useEffect(() => {
    fetchBatchOptions();
  }, []);

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2 className="mb-4 text-center">Maize Fertilizer Application Report</h2>
          <Form onSubmit={handleSubmit} className="report-form">
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber">Batch Number:</Label>
                  <Select
                    name="batchNumber"
                    id="batchNumber"
                    value={selectedBatch}
                    onChange={(selectedOption) => setSelectedBatch(selectedOption)}
                    options={batchOptions}
                    isSearchable
                    placeholder="Select Batch Number"
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <Button type="submit">Generate Report</Button>
              </Col>
            </Row>
          </Form>

          {showReport && (
            <div className="report-table mt-4">
              <h3>Fertilizer Application Report - Batch Number: {selectedBatch.label}</h3>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Space Applied</th>
                    <th>Fertilizer Name</th>
                    <th>Fertilizer Description</th>
                    <th>Application Method</th>
                    <th>Amount Applied</th>
                    <th>Recorded By</th>
                    {/* Add more headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {fertilizerApplications.map((application, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      {/* Format the date as "Monday, 7th January 2024" */}
                      <td>{new Date(application.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}</td>
                      <td>{application.location}</td>
                      <td>{application.spaceApplied}</td>
                      <td>{application.fertilizerName}</td>
                      <td>{application.fertilizerDescription}</td>
                      <td>{application.applicationMethod}</td>
                      <td>{application.amountApplied}</td>
                      <td>{application.recordedBy}</td>
                      {/* Add more columns as needed */}
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

export default MaizeFertilizerApplicationReport;
