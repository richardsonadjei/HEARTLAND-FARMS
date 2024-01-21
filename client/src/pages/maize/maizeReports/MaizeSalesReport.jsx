import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Table } from 'reactstrap';
import Select from 'react-select';

const MaizeSalesReport = () => {
  const [batchNumber, setBatchNumber] = useState('');
  const [sales, setSales] = useState([]);
  const [showReport, setShowReport] = useState(false);
  const [batchNumbers, setBatchNumbers] = useState([]);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-maize-seasons');
      if (!response.ok) {
        throw new Error('Error fetching batch numbers');
      }

      const data = await response.json();

      if (Array.isArray(data.maizeSeasons)) {
        setBatchNumbers(data.maizeSeasons.map((season) => season.batchNumber));
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

  const fetchMaizeSales = async () => {
    try {
      const response = await fetch(`/api/maize-sales/${batchNumber}`);
      const data = await response.json();
      setSales(data.sales);

      // Calculate total amount spent
      const totalAmount = data.sales.reduce((total, sale) => total + sale.saleAmount, 0);
      setTotalAmountSpent(totalAmount);

      setShowReport(true);
    } catch (error) {
      console.error('Error fetching maize sales:', error);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };
  
  

  const renderTable = () => {
    return (
      <div>
        <h3>Maize Sales Report for Batch Number {batchNumber}</h3>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Sale Date</th>
              <th>Unit Price Per Cup</th>
              <th>Quantity of Cups Sold</th>
              <th>Sold By</th>
              <th>Sale Amount</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(sale.saleDate)}</td>
                <td>{sale.unitPricePerCup}</td>
                <td>{sale.quantityOfCupsSold}</td>
                <td>{sale.soldBy}</td>
                <td>{sale.saleAmount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <h4>Total Summary</h4>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Category</th>
              <th>Total Amount Spent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total</td>
              <td>{totalAmountSpent}</td>
            </tr>
          </tbody>
        </Table>
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
            <Button color="primary" onClick={fetchMaizeSales}>
              Generate Report
            </Button>
          </Form>
        </Col>
      </Row>

      {showReport && (
        <Row className="mt-4">
          <Col>{renderTable()}</Col>
        </Row>
      )}
    </Container>
  );
};

export default MaizeSalesReport;
