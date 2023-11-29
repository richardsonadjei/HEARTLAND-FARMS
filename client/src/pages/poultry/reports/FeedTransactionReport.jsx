import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const FeedTransactionReport = () => {
  // State to store form values and report data
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState([]);

  // Function to handle form submission
  const handleGenerateReport = async () => {
    try {
      // Validate dates
      if (!startDate || !endDate) {
        console.error('Please select both start and end dates.');
        return;
      }

      // Make an API request to your backend
      const response = await fetch(`/api/feed-cost-transactions?startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // You might need to include additional headers (e.g., authentication token)
        },
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        // Parse the response JSON and update the reportData state
        const data = await response.json();
        setReportData(data.data);
      } else {
        // Log an error if the request was not successful
        console.error('Error fetching expense transactions:', response.statusText);
      }
    } catch (error) {
      // Handle any unexpected errors
      console.error('Error:', error.message);
    }
  };

  // Function to calculate the total amount
  const calculateTotalAmount = () => {
    return reportData.reduce((total, transaction) => total + transaction.amount, 0);
  };

  // Function to render table rows based on the reportData
  const renderTableRows = () => {
    return reportData.map((transaction, index) => (
      <tr key={index}>
        <td>{new Date(transaction.date).toLocaleDateString()}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.description}</td>
        <td>{transaction.paymentMethod}</td>
        <td>{transaction.purchasedBy}</td>
      </tr>
    ));
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2>Feed Transaction Report</h2>
          <Form>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                placeholder="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                placeholder="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FormGroup>
            <Button color="primary" onClick={handleGenerateReport}>
              Generate Report
            </Button>
          </Form>
          {reportData.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Description</th>
                    <th>Payment Method</th>
                    <th>Purchased By</th>
                  </tr>
                </thead>
                <tbody>{renderTableRows()}</tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'right' }}>
                      <strong>Total Amount:</strong>
                    </td>
                    <td>
                      <strong>{calculateTotalAmount()}</strong>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FeedTransactionReport;
