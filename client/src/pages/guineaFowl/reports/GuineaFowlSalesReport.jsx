import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const GuineaFowlSalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/view-guineaFowl-sales-by-period?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Error fetching bird sales report');
      }
      const data = await response.json();
      setReportData(data.data);
    } catch (error) {
      console.error('Error fetching bird sales report:', error.message);
    }
  };

  const calculateTotalSold = () => {
    if (!reportData) return 0;

    return reportData.sales.reduce((total, sale) => {
      return total + sale.sales.reduce((batchTotal, batch) => batchTotal + batch.quantity, 0);
    }, 0);
  };

  const calculateOverallTotal = () => {
    if (!reportData) return 0;

    return reportData.sales.reduce((total, sale) => {
      return total + sale.sales.reduce((batchTotal, batch) => batchTotal + batch.totalAmount, 0);
    }, 0);
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2 className="text-center text-white mb-4">Bird Sales Report</h2>
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
        </Col>
      </Row>

      {reportData && (
        <Row className="mt-4">
          <Col sm="12" md={{ size: 10, offset: 1 }}>
            <h4 className="text-center text-white mb-3">Bird Sales Details</h4>
            <Table responsive bordered className="shadow-sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Sales Number</th>
                  <th>Sold By</th>
                  <th>Batch</th>
                  <th>Quantity</th>
                  <th>Unit Price Per Bird</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {reportData.sales.map((sale, index) => (
                  sale.sales.map((batch, batchIndex) => (
                    <tr key={`${sale._id}_${batchIndex + 1}`}>
                      {batchIndex === 0 && (
                        <>
                          <td rowSpan={sale.sales.length}>{index + 1}</td>
                          <td rowSpan={sale.sales.length}>{formatDate(sale.createdAt)}</td>
                          <td rowSpan={sale.sales.length}>{sale.salesNumber}</td>
                          <td rowSpan={sale.sales.length}>{sale.soldBy}</td>
                        </>
                      )}
                      <td>{batch.batch}</td>
                      <td>{batch.quantity}</td>
                      <td>{batch.unitPricePerBird}</td>
                      <td>{batch.totalAmount}</td>
                    </tr>
                  ))
                ))}
              </tbody>
            </Table>

            <h4 className="text-center text-white mt-4">Summary Report</h4>
            <Table responsive bordered className="shadow-sm">
              <thead>
                <tr>
                  <th>Total Number of Birds Sold</th>
                  <th>Overall Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{calculateTotalSold()}</td>
                  <td>{calculateOverallTotal()}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default GuineaFowlSalesReport;
