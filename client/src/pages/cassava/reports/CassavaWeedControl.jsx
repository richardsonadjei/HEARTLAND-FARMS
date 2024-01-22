import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const CassavaWeedControlReport = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [weedicideApplications, setWeedicideApplications] = useState([]);
  const [manualWeedings, setManualWeedings] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [cassavaSeasons, setCassavaSeasons] = useState([]);
  const [selectedCassavaSeason, setSelectedCassavaSeason] = useState(null);

  const fetchCassavaSeasons = async () => {
    try {
      const response = await fetch('/api/all-cassava-seasons');
      if (!response.ok) {
        throw new Error('Error fetching cassava seasons');
      }

      const data = await response.json();
      setCassavaSeasons(data.cassavaSeasons);
    } catch (error) {
      console.error(error);
      // Handle error fetching cassava seasons
    }
  };

  useEffect(() => {
    fetchCassavaSeasons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch data from the server using the provided batchNumber
      const responseWeedicide = await fetch(`/api/view-all-weedicide-application/${batchNumber}`);
      const dataWeedicide = await responseWeedicide.json();

      const responseManualWeeding = await fetch(`/api/view-all-manual-weeding/${batchNumber}`);
      const dataManualWeeding = await responseManualWeeding.json();

      setWeedicideApplications(dataWeedicide.cassavaWeedicideApplicationRecords);
      setManualWeedings(dataManualWeeding.cassavaManualWeedingRecords);
      setShowReport(true);

      // Find the selected cassava season based on batchNumber
      const selectedSeason = cassavaSeasons.find((season) => season.batchNumber === batchNumber);
      setSelectedCassavaSeason(selectedSeason);
    } catch (error) {
      console.error('Error fetching report data:', error);
      // Handle error fetching report data
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

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2 className="mb-4 text-center">Cassava Weed Control Report</h2>
          <Form onSubmit={handleSubmit} className="report-form">
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchNumber">Batch Number:</Label>
                  <Select
                    name="batchNumber"
                    id="batchNumber"
                    value={{ value: batchNumber, label: batchNumber }}
                    onChange={(selectedOption) => setBatchNumber(selectedOption.value)}
                    options={cassavaSeasons.map((season) => ({
                      value: season.batchNumber,
                      label: season.batchNumber,
                    }))}
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
              {weedicideApplications && weedicideApplications.length > 0 && (
                <>
                  <h3>Weedicide Applications - Batch Number: {selectedCassavaSeason.batchNumber}</h3>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Space Applied</th>
                        <th>Weedicide Name</th>
                        <th>Weedicide Description</th>
                        <th>Application Method</th>
                        <th>Quantity Applied</th>
                        <th>Recorded By</th>
                        {/* Add more headers as needed */}
                      </tr>
                    </thead>
                    <tbody>
                      {weedicideApplications.map((application, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatDate(application.date)}</td>
                          <td>{application.location}</td>
                          <td>{application.spaceApplied}</td>
                          <td>{application.weedicideName}</td>
                          <td>{application.weedicideDescription}</td>
                          <td>{application.applicationMethod}</td>
                          <td>{application.quantityApplied}</td>
                          <td>{application.recordedBy}</td>
                          {/* Add more columns as needed */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {manualWeedings && manualWeedings.length > 0 && (
                <>
                  <h3>Manual Weedings - Batch Number: {selectedCassavaSeason.batchNumber}</h3>
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Date</th>
                        <th>Location</th>
                        <th>Space Weeded</th>
                        <th>Recorded By</th>
                        {/* Add more headers as needed */}
                      </tr>
                    </thead>
                    <tbody>
                      {manualWeedings.map((weeding, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{formatDate(weeding.date)}</td>
                          <td>{weeding.location}</td>
                          <td>{weeding.spaceWeeded}</td>
                          <td>{weeding.recordedBy}</td>
                          {/* Add more columns as needed */}
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </>
              )}

              {/* Add similar checks for other data arrays if needed */}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CassavaWeedControlReport;
