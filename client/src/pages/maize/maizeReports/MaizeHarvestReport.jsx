import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const MaizeHarvestReport = () => {
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [maizeHarvests, setMaizeHarvests] = useState([]);
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

  const fetchMaizeHarvests = async () => {
    try {
      const response = await fetch(`/api/maize-harvest-report/${selectedBatch.value}`);
      if (!response.ok) {
        throw new Error('Error fetching maize harvest records');
      }

      const data = await response.json();
      setMaizeHarvests(data.maizeHarvests);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching maize harvest records:', error);
      // Handle error fetching maize harvest records
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBatch) {
      fetchMaizeHarvests();
    }
  };

  useEffect(() => {
    fetchBatchOptions();
  }, []);

  // Function to get the ordinal suffix for the day
  const getOrdinalSuffix = (day) => {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    const day = date.getDate();
    const ordinalSuffix = getOrdinalSuffix(day);
    return date.toLocaleDateString('en-US', options).replace(/\d+/, (num) => num + ordinalSuffix);
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2 className="mb-4 text-center">Maize Harvest Report</h2>
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
              <h3>Maize Harvest Report - Batch Number: {selectedBatch.label}</h3>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Location</th>
                    <th>Harvested Quantity</th>
                    <th>Harvested Space</th>
                    <th>Recorded By</th>
                    {/* Add more headers as needed */}
                  </tr>
                </thead>
                <tbody>
                  {maizeHarvests.map((harvest, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{formatDate(harvest.date)}</td>
                      <td>{harvest.location}</td>
                      <td>{harvest.harvestedQuantity}</td>
                      <td>{harvest.harvestedSpace}</td>
                      <td>{harvest.recordedBy}</td>
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

export default MaizeHarvestReport;
