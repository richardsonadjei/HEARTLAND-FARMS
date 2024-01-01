import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const BirdMortalityReport = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [mortalities, setMortalities] = useState([]);
    const [summary, setSummary] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showReport, setShowReport] = useState(false);
  
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        setLoading(true);
  
        const response = await fetch(`/api/birds-mortality-report?startDate=${startDate}&endDate=${endDate}`);
        
        if (!response.ok) {
          throw new Error('Error fetching mortality report');
        }
  
        const data = await response.json();
        setMortalities(data.data);
  
        // Calculate summary
        const totalQuantity = data.data.reduce((total, mortality) => total + mortality.quantity, 0);
        const totalDistinctBatches = new Set(data.data.map((mortality) => mortality.batchNumber)).size;
  
        setSummary({ totalQuantity, totalDistinctBatches });
  
        setShowReport(true);
        setError('');
      } catch (error) {
        console.error('Error fetching mortality report:', error.message);
        setError('Error fetching mortality report. Please try again.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Container>
        <Row className="mt-4">
          <Col sm="12" md={{ size: 8, offset: 2 }}>
            <h2 className="text-center mb-4">Bird Mortality Report</h2>
            <Form onSubmit={handleSubmit}>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="startDate" className="text-white">Start Date:</Label>
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
                    <Label for="endDate" className="text-white">End Date:</Label>
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
              <FormGroup className="text-center">
                <Button type="submit" color="primary">Generate Report</Button>
              </FormGroup>
            </Form>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-danger text-center">{error}</p>}
  
            {showReport && (
              <div>
                <h3 className="mt-4">Mortality Details</h3>
                <Table responsive className="mt-2">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Batch Number</th>
                      <th>Date</th>
                      <th>Quantity</th>
                      <th>Cause</th>
                      <th>Recorded By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mortalities.map((mortality, index) => (
                      <tr key={mortality._id}>
                        <td>{index + 1}</td>
                        <td>{mortality.batchNumber}</td>
                        <td>{formatDate(mortality.date)}</td>
                        <td>{mortality.quantity}</td>
                        <td>{mortality.cause}</td>
                        <td>{mortality.recordedBy}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
  
                <h3 className="mt-4">Summary Report</h3>
                <Table responsive className="mt-2">
                  <thead>
                    <tr>
                      <th>Total Quantity</th>
                      <th>Total Distinct Batches</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{summary.totalQuantity}</td>
                      <td>{summary.totalDistinctBatches}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default BirdMortalityReport;