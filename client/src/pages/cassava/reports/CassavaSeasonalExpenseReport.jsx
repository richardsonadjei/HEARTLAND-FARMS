import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const SeasonalCassavaExpenseReport = () => {
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [showReport, setShowReport] = useState(false);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#d3d3d3' : 'white',
      color: state.isFocused ? 'black' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'transparent',
    }),
  };

  const fetchBatchOptions = async () => {
    try {
      const response = await fetch('/api/all-cassava-seasons');
      if (!response.ok) {
        throw new Error('Error fetching batch options');
      }

      const data = await response.json();
      const options = data.cassavaSeasons.map((season) => ({
        value: season.batchNumber,
        label: season.batchNumber,
      }));
      setBatchOptions(options);
    } catch (error) {
      console.error('Error fetching batch options:', error);
      // Handle error fetching batch options
    }
  };

  const fetchExpenses = async () => {
    try {
      const response = await fetch(`/api/view-all-cassava-expense/${selectedBatch.value}`);
      if (!response.ok) {
        throw new Error('Error fetching cassava farm expenses');
      }

      const data = await response.json();
      setExpenses(data.expenses);
      setShowReport(true);
    } catch (error) {
      console.error('Error fetching cassava farm expenses:', error);
      // Handle error fetching cassava farm expenses
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedBatch) {
      fetchExpenses();
    }
  };

  useEffect(() => {
    fetchBatchOptions();
  }, []);

 const renderTable = () => {
  const groupedExpenses = groupExpensesByCategory(expenses);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

    return (
      <div className="report-table mt-4">
        {Object.keys(groupedExpenses).map((category, index) => (
          <React.Fragment key={index}>
            <h3>{category} Expenses - Batch Number: {selectedBatch.label}</h3>
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Amount Spent</th>
                  <th>Recorded By</th>
                  {/* Add more headers as needed */}
                </tr>
              </thead>
              <tbody>
                {groupedExpenses[category].map((expense, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{formatDate(expense.date)}</td>
                    <td>{expense.amountSpent}</td>
                    <td>{expense.recordedBy}</td>
                    {/* Add more columns as needed */}
                  </tr>
                ))}
              </tbody>
            </Table>
          </React.Fragment>
        ))}

        {/* Summary Report */}
        <h3>Summary Report - Batch Number: {selectedBatch.label}</h3>
        <Table responsive>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedExpenses).map((category, index) => (
              <tr key={index}>
                <td>{category}</td>
                <td>
                  {groupedExpenses[category].reduce((total, expense) => total + expense.amountSpent, 0)}
                </td>
              </tr>
            ))}
            <tr>
              <td>Total</td>
              <td>
                {Object.keys(groupedExpenses).reduce(
                  (total, category) =>
                    total + groupedExpenses[category].reduce((subtotal, expense) => subtotal + expense.amountSpent, 0),
                  0
                )}
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    );
  };

  const groupExpensesByCategory = (expenses) => {
    return expenses.reduce((acc, expense) => {
      const { category } = expense;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(expense);
      return acc;
    }, {});
  };

  return (
    <Container fluid className="mt-4">
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h2 className="mb-4 text-center">Seasonal Cassava Expense Report</h2>
          <Form onSubmit={handleSubmit} className="report-form">
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="batchSelect">Select Batch Number</Label>
                  <Select
                    id="batchSelect"
                    options={batchOptions}
                    value={selectedBatch}
                    onChange={(selectedOption) => setSelectedBatch(selectedOption)}
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button color="primary" type="submit">
                  Generate Report
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {showReport && <Row>{renderTable()}</Row>}
    </Container>
  );
};

export default SeasonalCassavaExpenseReport;
