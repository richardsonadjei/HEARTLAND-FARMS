import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const EggIncomeReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/egg-income-report?startDate=${startDate}&endDate=${endDate}`);
      const data = await response.json();

      if (data.success) {
        setSalesData(data.data);
      } else {
        // Handle error
        console.error('Error fetching sales data:', data.message);
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error);
    }
  };

  const renderTableHeaders = () => {
    return (
      <thead>
        <tr>
          <th>Sales Number</th>
          <th>Total Amount</th>
          <th>Sold At</th>
        </tr>
      </thead>
    );
  };

  const renderTableRows = () => {
    return (
      <tbody>
        {salesData.map((sale) => (
          <tr key={sale._id}>
            <td>{sale.salesNumber}</td>
            <td>{sale.totalAmount}</td>
            <td>
              {new Date(sale.createdAt).toLocaleString('en-GB', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </td>
          </tr>
        ))}
      </tbody>
    );
  };
  
  

  const renderSummaryReport = () => {
    const totalAmount = salesData.reduce((acc, sale) => acc + sale.totalAmount, 0);

    return (
      <div>
        <h3>Summary Report</h3>
        <Table>
          <thead>
            <tr>
              <th>Total Count</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{salesData.length}</td>
              <td>{totalAmount}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  return (
    <Container>
      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label className="text-white">Start Date</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label className="text-white">End Date</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </FormGroup>
            <Button color="primary" type="submit">
              Generate Report
            </Button>
          </Form>
        </Col>
      </Row>
      {salesData && (
        <Row>
          <Col>
            <h3>Egg Income Report</h3>
            <Table striped responsive>
              {renderTableHeaders()}
              {renderTableRows()}
            </Table>
            {renderSummaryReport()}
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default EggIncomeReport;
