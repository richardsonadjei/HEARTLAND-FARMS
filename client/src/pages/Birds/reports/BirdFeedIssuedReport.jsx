import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';

const PeriodicFeedIssueReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [issuances, setIssuances] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/bird-feed-issuances-within-a-period?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch feed issuances');
      }
      const data = await response.json();
      setIssuances(data);
      setErrorMessage('');
    } catch (error) {
      setIssuances([]);
      setErrorMessage(error.message);
    }
  };

  return (
    <Container>
      <h1>Periodic Feed Issue Report</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <FormGroup>
              <Label for="startDate">Start Date:</Label>
              <Input
                type="date"
                name="startDate"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="endDate">End Date:</Label>
              <Input
                type="date"
                name="endDate"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Button type="submit" color="primary">View Report</Button>
      </Form>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {issuances.length > 0 && (
        <div className="mt-4">
          <h2>Issuances:</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Feed Name</th>
                <th>Quantity Issued</th>
                <th>Date Issued</th>
              </tr>
            </thead>
            <tbody>
              {issuances.map((issuance, index) => (
                <tr key={issuance._id}>
                  <td>{index + 1}</td>
                  <td>{issuance.feedName}</td>
                  <td>{issuance.quantityIssued}</td>
                  <td>{new Date(issuance.issuedDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default PeriodicFeedIssueReport;
