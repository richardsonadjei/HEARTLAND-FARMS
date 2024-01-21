import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const MaizeWeedControlReport = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [weedicideApplications, setWeedicideApplications] = useState([]);
  const [manualWeedings, setManualWeedings] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [maizeSeasons, setMaizeSeasons] = useState([]);
  const [selectedMaizeSeason, setSelectedMaizeSeason] = useState(null);

  const fetchMaizeSeasons = async () => {
    try {
      const response = await fetch('/api/all-maize-seasons');
      if (!response.ok) {
        throw new Error('Error fetching maize seasons');
      }

      const data = await response.json();
      setMaizeSeasons(data.maizeSeasons);
    } catch (error) {
      console.error(error);
      // Handle error fetching maize seasons
    }
  };

  useEffect(() => {
    fetchMaizeSeasons();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch data from the server using the provided batchNumber
      const responseWeedicide = await fetch(`/api/maize-weedicide-application-report/${batchNumber}`);
      const dataWeedicide = await responseWeedicide.json();

      const responseManualWeeding = await fetch(`/api/maize-manual-weeding-report/${batchNumber}`);
      const dataManualWeeding = await responseManualWeeding.json();

      setWeedicideApplications(dataWeedicide.weedicideApplications);
      setManualWeedings(dataManualWeeding.manualWeedings);
      setShowReport(true);

      // Find the selected maize season based on batchNumber
      const selectedSeason = maizeSeasons.find((season) => season.batchNumber === batchNumber);
      setSelectedMaizeSeason(selectedSeason);
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
          <h2 className="mb-4 text-center">Maize Weed Control Report</h2>
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
  options={maizeSeasons.map((season) => ({
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
              <h3>Weedicide Applications - Batch Number: {selectedMaizeSeason.batchNumber}</h3>
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

              <h3>Manual Weedings - Batch Number: {selectedMaizeSeason.batchNumber}</h3>
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
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MaizeWeedControlReport;
