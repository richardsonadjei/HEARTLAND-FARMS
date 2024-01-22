import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const SeasonalCassavaProfitLossReport = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [reportData, setReportData] = useState(null);
  const [batchNumbers, setBatchNumbers] = useState([]);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-cassava-seasons'); // Replace with the actual endpoint
      if (!response.ok) {
        throw new Error('Error fetching batch numbers');
      }

      const data = await response.json();

      if (Array.isArray(data.cassavaSeasons)) {
        setBatchNumbers(data.cassavaSeasons.map((season) => season.batchNumber));
      } else {
        throw new Error('Invalid data format for batch numbers');
      }
    } catch (error) {
      console.error(error);
      // Handle error fetching batch numbers
    }
  };

  useEffect(() => {
    fetchBatchNumbers();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/calculate-cassava-farm-profit-loss?batchNumber=${batchNumber}`);
      const data = await response.json();
      setReportData(data);
    } catch (error) {
      console.error('Error fetching report data:', error);
    }
  };

  const getOrdinalSuffix = (number) => {
    if (number >= 11 && number <= 13) {
      return 'th';
    }

    const lastDigit = number % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    const day = date.getDate();
    const ordinalSuffix = getOrdinalSuffix(day);
    return date.toLocaleDateString('en-US', options).replace(/\d+/, (num) => num + ordinalSuffix);
  };

  const renderTable = () => {
    return (
      <div>
        <h3>Seasonal Cassava Profit/Loss Report for Batch Number {batchNumber}</h3>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Expense Date</th>
              <th>Expense Category</th>
              <th>Amount Spent</th>
              <th>Recorded By</th>
            </tr>
          </thead>
          <tbody>
            {reportData.expenditureData.map((expense, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.category}</td>
                <td>{expense.amountSpent}</td>
                <td>{expense.recordedBy}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Table responsive striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Expense Date</th>
              <th>Expense Category</th>
              <th>Description</th>
              <th>Amount Spent</th>
              <th>Recorded By</th>
            </tr>
          </thead>
          <tbody>
            {reportData.miscellaneousExpenditureData.map((expense, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(expense.date)}</td>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{expense.amountSpent}</td>
                <td>{expense.recordedBy}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h4>Total Expenditure: {reportData.totalExpenditure}</h4>

        <Table responsive striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Sale Date</th>
              <th>Unit Price Per Sac</th>
              <th>Quantity Sold</th>
              <th>Sale Amount</th>
              <th>Sold By</th>
            </tr>
          </thead>
          <tbody>
            {reportData.incomeData.map((sale, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(sale.saleDate)}</td>
                <td>{sale.unitPricePerSack}</td>
                <td>{sale.quantityOfSacksSold}</td>
                <td>{sale.saleAmount}</td>
                <td>{sale.soldBy}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h4>Total Income: {reportData.totalIncome}</h4>
        <br></br>
        <h4>Net Profit/Loss: {reportData.profitLoss}</h4>
      </div>
    );
  };

  const handleBatchNumberChange = (selectedOption) => {
    setBatchNumber(selectedOption.value);
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#d3d3d3' : 'white',
      color: state.isFocused ? 'black' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form style={{ background: 'rgba(255, 255, 255, 0.7)', padding: '20px', borderRadius: '10px' }}>
            <FormGroup>
              <Label for="batchNumber">Batch Number</Label>
              <Select
                name="batchNumber"
                id="batchNumber"
                value={{ label: batchNumber, value: batchNumber }}
                onChange={handleBatchNumberChange}
                options={batchNumbers.map((number) => ({ label: number, value: number }))}
                isSearchable
                placeholder="Select Batch Number"
                styles={customStyles}
              />
            </FormGroup>
            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>

      {reportData && (
        <Row className="mt-4">
          <Col>{renderTable()}</Col>
        </Row>
      )}
    </Container>
  );
};

export default SeasonalCassavaProfitLossReport;
