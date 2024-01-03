import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const GuineaFowlBatchUpdateReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [batchUpdates, setBatchUpdates] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/batch-updates?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Error fetching batch updates');
      }

      const data = await response.json();
      setBatchUpdates(data);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching batch updates:', error.message);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2 className="text-center mb-4 text-white">Guinea Fowl Batch Update Report</h2>
          <Form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
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
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button type="submit" color="primary">Generate Report</Button>
          </Form>

          {showReport && (
            <div className="mt-4">
              <h3 className="text-center mb-4 text-white">Batch Update Records</h3>
              <Table responsive bordered hover className="shadow">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Batch Number</th>
                    <th>Previous Quantity</th>
                    <th>New Quantity</th>
                    <th>Quantity Added</th> {/* New column for Quantity Added */}
                    <th>Updated By</th>
                    <th>Updated At</th>
                  </tr>
                </thead>
                <tbody>
                  {batchUpdates.map((update, index) => (
                    <tr key={update._id}>
                      <td>{index + 1}</td>
                      <td>{update.batchNumber}</td>
                      <td>{update.previousQuantity}</td>
                      <td>{update.newQuantity}</td>
                      <td>{update.newQuantity - update.previousQuantity}</td> {/* Quantity added (newQuantity - previousQuantity) */}
                      <td>{update.updatedBy}</td>
                      <td>{new Date(update.updatedAt).toLocaleString('en-GB', { day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <h3 className="text-center mt-4 mb-4 text-white">Summary Report</h3>
              <Table responsive bordered hover className="shadow">
                <thead>
                  <tr>
                    <th>Batch Number</th>
                    <th>Total Updates</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Calculate and display summary data */}
                  {Object.entries(batchUpdates.reduce((summary, update) => {
                    const batchNumber = update.batchNumber;
                    summary[batchNumber] = (summary[batchNumber] || 0) + 1;
                    return summary;
                  }, {})).map(([batchNumber, count]) => (
                    <tr key={batchNumber}>
                      <td>{batchNumber}</td>
                      <td>{count}</td>
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

export default GuineaFowlBatchUpdateReport;
