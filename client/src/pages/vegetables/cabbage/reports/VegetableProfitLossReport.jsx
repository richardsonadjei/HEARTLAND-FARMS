import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const VegetableProfitLossReport = () => {
  const [vegetable, setVegetable] = useState('');
  const [batch, setBatch] = useState('');
  const [vegetableOptions, setVegetableOptions] = useState([]);
  const [batchOptions, setBatchOptions] = useState([]);
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    fetchVegetableOptions();
  }, []);

  const fetchVegetableOptions = async () => {
    try {
      const response = await fetch('/api/all-vegetables');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetables');
      }
      const vegetables = await response.json();
      const options = vegetables.map((vegetable) => ({ value: vegetable.name, label: vegetable.name }));
      setVegetableOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchBatchOptions = async (vegetableName) => {
    try {
      const response = await fetch(`/api/all-batches/${vegetableName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batches');
      }
      const batches = await response.json();
      const options = batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/profit-loss?batchNumber=${batch}&vegetableType=${vegetable}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Vegetable Profit Loss Report</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="vegetable">Select Vegetable</Label>
              <Select
                id="vegetable"
                options={vegetableOptions}
                onChange={(selectedOption) => {
                  setVegetable(selectedOption.value);
                  fetchBatchOptions(selectedOption.value);
                }}
                isSearchable
                placeholder="Select Vegetable"
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="batch">Select Batch Number</Label>
              <Select
                id="batch"
                options={batchOptions}
                onChange={(selectedOption) => setBatch(selectedOption.value)}
                isSearchable
                placeholder="Select Batch Number"
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">Generate Report</Button>
      </Form>
      {reportData && (
        <div className="mt-4">
           <h2>Profit Loss Report for {reportData.sales[0].vegetable} Of Batch Number: {reportData.sales[0].batchNumber}</h2>
          <h3 style={{ color: 'blue' }}>Sales</h3>
          <Table responsive className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Batch Number</th>
                <th>Quantity Sold</th>
                <th>Price Per Bag</th>
                <th>Total Income</th>
                <th>Additional Information</th>
              </tr>
            </thead>
            <tbody>
              {reportData.sales.map((sale, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                  <td>{sale.batchNumber}</td>
                  <td>{sale.quantitySold}</td>
                  <td>{sale.pricePerBag}</td>
                  <td>{sale.totalIncome}</td>
                  <td>{sale.additionalInformation}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3 style={{ color: 'red' }}>Expenses</h3>
          <Table responsive className="mt-3">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {reportData.expenses.map((expense, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>{expense.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <h3>Summary Report</h3>
          <Table responsive className="mt-3">
            <thead>
              <tr>
                <th>Total Income</th>
                <th>Total Expenses</th>
                <th>Profit/Loss</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{reportData.totalIncome}</td>
                <td>{reportData.totalExpenses}</td>
                <td style={{ color: reportData.profitOrLoss >= 0 ? 'green' : 'red', fontWeight: 'bold', fontSize: 'larger' }}>
                  {reportData.profitOrLoss}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default VegetableProfitLossReport;
