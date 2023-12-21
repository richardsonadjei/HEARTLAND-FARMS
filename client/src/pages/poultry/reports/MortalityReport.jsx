import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table, Card, CardBody } from 'reactstrap';

const MortalityReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [mortalities, setMortalities] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/view-mortalities-by-period?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Error fetching mortalities');
      }
      const responseData = await response.json();

      if (responseData && responseData.data && Array.isArray(responseData.data)) {
        setMortalities(responseData.data);
        setShowReport(true);
      } else {
        setMortalities([]);
        setShowReport(false);
      }
    } catch (error) {
      console.error('Error fetching mortalities:', error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderSummaryReport = () => {
    const batchCounts = {};

    mortalities.forEach((mortality) => {
      if (batchCounts[mortality.batchNumber]) {
        batchCounts[mortality.batchNumber] += mortality.count;
      } else {
        batchCounts[mortality.batchNumber] = mortality.count;
      }
    });

    return (
      <Card className="mt-4">
        <CardBody>
          <h5 className="mb-4">Summary Report</h5>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Batch Number</th>
                <th>Total Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(batchCounts).map(([batchNumber, totalCount]) => (
                <tr key={batchNumber}>
                  <td>{batchNumber}</td>
                  <td>{totalCount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </Card>
    );
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <h2 className="text-white">Mortality Report</h2>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="startDate" className="text-white">
                    Start Date
                  </Label>
                  <Input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="endDate" className="text-white">
                    End Date
                  </Label>
                  <Input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                  />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Button type="submit" color="primary">
                Generate Report
              </Button>
            </FormGroup>
          </Form>

          {showReport && (
            <Card className="mt-4">
              <CardBody>
                <h5 className="mb-4">Mortality Details</h5>
                <Table bordered responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date</th>
                      <th>Batch Number</th>
                      <th>Count</th>
                      <th>Cause</th>
                      <th>Notes</th>
                      <th>Recorded By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mortalities.map((mortality, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{formatDate(mortality.date)}</td>
                        <td>{mortality.batchNumber}</td>
                        <td>{mortality.count}</td>
                        <td>{mortality.cause}</td>
                        <td>{mortality.notes}</td>
                        <td>{mortality.recordedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                {renderSummaryReport()}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MortalityReport;
