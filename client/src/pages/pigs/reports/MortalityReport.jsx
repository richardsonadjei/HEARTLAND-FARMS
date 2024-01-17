import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const PigMortalityReport = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
  });

  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Construct the query string for startDate and endDate
      const queryString = new URLSearchParams(formData).toString();
  
      // Update the API endpoint with the constructed query string
      const response = await fetch(`/api/pig-mortalities-by-period?${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        setReportData(data);
        setShowReport(true);
      } else {
        console.error('Failed to fetch pig mortalities. Please try again.');
      }
    } catch (error) {
      console.error('An unexpected error occurred while fetching pig mortalities');
    }
  };
  

  return (
    <Container>
      <Row className="mt-5">
        <Col md={{ size: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit} className="report-form">
            <h2 className="mb-4">Mortality Report</h2>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate">End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    id="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">
              Generate Report
            </Button>
          </Form>

          {showReport && (
            <div className="mt-5">
              <h3>Report</h3>
              <Table responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Pig Identity Number</th>
                    <th>Date of Death</th>
                    <th>Cause of Death</th>
                    <th>Recorded By</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((record, index) => (
                    <tr key={record._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{record.pigIdentityNumber}</td>
                      <td>{new Date(record.dateOfDeath).toLocaleDateString()}</td>
                      <td>{record.causeOfDeath}</td>
                      <td>{record.recordedBy}</td>
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

export default PigMortalityReport;
