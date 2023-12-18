import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const DewormingReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dewormings, setDewormings] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/deworming/date-range/${startDate}/${endDate}`);
      if (!response.ok) {
        throw new Error('Error fetching deworming data');
      }

      const responseData = await response.json();
      setDewormings(responseData.data);
    } catch (error) {
      console.error('Error fetching deworming data:', error.message);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 8, offset: 2 }}>
          <h2 className="text-white mb-4">Deworming Report</h2>
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

          {dewormings.length > 0 && (
            <>
              <h3 className="text-white mt-4 mb-2">Deworming Details</h3>
              <Table responsive className="table-shadow">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Date</th>
                    <th>Batch Number</th>
                    <th>Dewormer Name</th>
                    <th>Dewormed By</th>
                    {/* Add more columns based on your Deworming model */}
                  </tr>
                </thead>
                <tbody>
                  {dewormings.map((deworming, index) => (
                    <tr key={deworming._id}>
                      <td>{index + 1}</td>
                      <td>{new Date(deworming.dewormingDate).toLocaleDateString()}</td>
                      <td>{deworming.batchNumber}</td>
                      <td>{deworming.dewormerName}</td>
                      <td>{deworming.dewormedBy}</td>
                      {/* Add more cells based on your Deworming model */}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DewormingReport;
