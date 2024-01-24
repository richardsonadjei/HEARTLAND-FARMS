import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const EggSalesReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [salesData, setSalesData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Use fetch to make a request to your backend endpoint
      const response = await fetch(`/api/egg-sales-report?startDate=${startDate}&endDate=${endDate}`);
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
      <thead style={{ background: '#007BFF', color: 'white' }}>
        <tr>
        <th>#</th>
        <th>Date </th>
          <th>Sales Number</th>
          <th>Category</th>
          <th>Unit Price Per Crate</th>
          <th>Crates</th>
          <th>Total Amount</th>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Sales Made By</th>
         
        </tr>
      </thead>
    );
  };

  const renderTableRows = () => {
    return (
      <tbody>
         {salesData.map((sale, index) => (
          <tr key={sale._id}>
            <td>{index + 1}</td> 
            <td>{formatDateTime(sale.createdAt)}</td>
            <td>{sale.salesNumber}</td>
            <td>{sale.category}</td>
            <td>{sale.unitPricePerCrate}</td>
            <td>{sale.crates}</td>
            <td>{sale.totalAmount}</td>
            <td>{sale.customerName}</td>
            <td>{sale.phoneNumber}</td>
            <td>{sale.salesMadeBy}</td>
            
          </tr>
        ))}
      </tbody>
    );
  };
  
  const formatDateTime = (dateTimeString) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
  
    const formattedDate = new Date(dateTimeString).toLocaleDateString('en-GB', options);
    return formattedDate;
  };
  

  
 const renderSummaryReport = () => {
    const totalCrates = salesData.reduce((acc, sale) => acc + sale.crates, 0);
    const totalAmount = salesData.reduce((acc, sale) => acc + sale.totalAmount, 0);


    return (
      <div>
        <h3>Summary Report</h3>
        <Table>
          <thead style={{ background: '#007BFF', color: 'white' }}>
            <tr>
              <th>Total Crates Sold</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{totalCrates}</td>
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
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label className="text-white">Start Date</Label>
                  <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label className="text-white">End Date</Label>
                  <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">
              Generate Report
            </Button>
          </Form>
        </Col>
      </Row>
      {salesData && (
        <Row>
          <Col>
            <h3>Egg Sales Report</h3>
            <Table striped responsive style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
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

export default EggSalesReport;
