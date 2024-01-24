import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const AllBirdVaccinationReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/all-bird-vaccinations?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      setReportData(data);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching bird vaccination records:', error);
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">All Bird Vaccination Report</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' }}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input type="date" name="startDate" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate">End Date</Label>
                  <Input type="date" name="endDate" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
                  <th>Batch Number</th>
                  <th>Breed</th>
                  <th>Vaccination Date</th>
                  <th>Vaccine</th>
                  <th>Age in Days</th>
                  <th>Vaccinated By</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((record, index) => (
                  <tr key={record._id}>
                    <td>{index + 1}</td>
                    <td>{record.batchNumber}</td>
                    <td>{record.breed}</td>
                    <td>{new Date(record.vaccinationDate).toLocaleDateString()}</td>
                    <td>{record.vaccine}</td>
                    <td>{record.ageInDays}</td>
                    <td>{record.vaccinatedBy}</td>
                    <td>{new Date(record.createdAt).toLocaleString()}</td>
                    <td>{new Date(record.updatedAt).toLocaleString()}</td>
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

export default AllBirdVaccinationReport;