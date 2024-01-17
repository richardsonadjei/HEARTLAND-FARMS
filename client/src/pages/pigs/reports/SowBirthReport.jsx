import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const SowBirthReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);
  const [summary, setSummary] = useState(null);
  const [sowTotalPiglets, setSowTotalPiglets] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/sow-births-by-period?startDate=${startDate}&endDate=${endDate}`);

      if (!response.ok) {
        throw new Error('Failed to fetch sow birth data');
      }

      const data = await response.json();
      setReportData(data);

      // Calculate summary
      const totalNumberOfMales = data.reduce((acc, entry) => acc + entry.numberOfMalePiglets, 0);
      const totalNumberOfFemales = data.reduce((acc, entry) => acc + entry.numberOfFemalePiglets, 0);

      setSummary({ totalNumberOfMales, totalNumberOfFemales });

      // Calculate total number of piglets from each Sow Identity Number
      const sowIdentityNumbers = [...new Set(data.map((entry) => entry.sowIdentityNumber))];
      const sowTotalPigletsData = sowIdentityNumbers.map((sowIdentityNumber) => {
        const totalPiglets = data
          .filter((entry) => entry.sowIdentityNumber === sowIdentityNumber)
          .reduce((acc, entry) => acc + entry.totalNumberOfPiglets, 0);

        return { sowIdentityNumber, totalPiglets };
      });

      setSowTotalPiglets(sowTotalPigletsData);
    } catch (error) {
      console.error('Error fetching sow birth data:', error.message);
    }
  };

  return (
    <Container fluid>
      <Row className="mt-5">
        <Col md={12}>
          <Form onSubmit={handleSubmit} className="report-form">
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate">Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
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
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">
              Generate Report
            </Button>
          </Form>

          {reportData.length > 0 && (
            <div className="mt-5">
              <h2 className="mb-4">Sow Birth Report</h2>
              <Table striped responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Sow Identity Number</th>
                    <th>Date of Birth</th>
                    <th>Number of Male Piglets</th>
                    <th>Number of Female Piglets</th>
                    <th>Total Number of Piglets</th>
                    <th>Recorded By</th>
                    <th>Created At</th>
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((entry, index) => (
                    <tr key={entry._id}>
                      <td>{index + 1}</td>
                      <td>{entry.sowIdentityNumber}</td>
                      <td>{new Date(entry.dateOfBirth).toLocaleDateString()}</td>
                      <td>{entry.numberOfMalePiglets}</td>
                      <td>{entry.numberOfFemalePiglets}</td>
                      <td>{entry.totalNumberOfPiglets}</td>
                      <td>{entry.recordedBy}</td>
                      <td>{new Date(entry.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className="mt-4">
                <h3>Summary Report</h3>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Total Number of Males</th>
                      <th>Total Number of Females</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{summary.totalNumberOfMales}</td>
                      <td>{summary.totalNumberOfFemales}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              <div className="mt-4">
                <h3>Total Number of Piglets by Sow Identity Number</h3>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>Sow Identity Number</th>
                      <th>Total Number of Piglets</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sowTotalPiglets.map((sowData, index) => (
                      <tr key={index}>
                        <td>{sowData.sowIdentityNumber}</td>
                        <td>{sowData.totalPiglets}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SowBirthReport;
