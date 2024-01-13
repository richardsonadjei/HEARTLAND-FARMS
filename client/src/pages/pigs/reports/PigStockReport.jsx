// PigStock.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';


const PigStock = () => {
  const [pigStocks, setPigStocks] = useState([]);

  useEffect(() => {
    // Fetch pig stocks data when the component mounts
    fetchPigStocks();
  }, []);

  const fetchPigStocks = async () => {
    try {
      const response = await fetch('/api/all-pigs'); // Replace with your API endpoint
      const data = await response.json();
      setPigStocks(data.pigStocks);
    } catch (error) {
      console.error('Error retrieving pig stocks:', error);
    }
  };

  const convertToLocalDate = (dateString) => {
    const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const calculateTotalQuantity = (field, value) => {
    const totalQuantity = pigStocks
      .filter((stock) => stock[field] === value)
      .reduce((acc, stock) => acc + stock.quantity, 0);
    return totalQuantity;
  };

  const getUniqueValues = (field) => {
    return [...new Set(pigStocks.map((stock) => stock[field]))];
  };

  

  return (
    <Container fluid className="pig-report-bg-image">
      <Row>
        <Col>
          <h1 className="text-center my-4 text-black">Pig Stock Report</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table responsive striped bordered hover className="mt-4 text-black">
            <thead className="thead-dark">
              <tr>
                <th>#</th>
                <th>Identity Number</th>
                <th>Identity Tag</th>
                <th>Arrival Date</th>
                <th>Breed</th>
                <th>Quantity</th>
                <th>Farm Section</th>
                <th>Gender</th>
                <th>Current Age</th>
                <th>Classification</th>
                <th>Recorded By</th>
              </tr>
            </thead>
            <tbody>
              {pigStocks.map((stock, index) => (
                <tr key={stock._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{stock.identityNumber}</td>
                  <td>{stock.identityTag}</td>
                  <td>{convertToLocalDate(stock.arrivalDate)}</td>
                  <td>{stock.breed}</td>
                  <td>{stock.quantity}</td>
                  <td>{stock.farmSection}</td>
                  <td>{stock.gender}</td>
                  <td>{stock.currentAge}</td>
                  <td>{stock.classification}</td>
                  <td>{stock.createdBy}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      {/* Summary Table (Breed) */}
      <Row>
        <Col>
          <h2 className="text-black">Summary Table (Breed)</h2>
          <Table responsive striped bordered hover className="mt-4 text-light">
            <thead className="thead-dark">
              <tr>
                <th>Breed</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {getUniqueValues('breed').map((breed) => (
                <tr key={breed}>
                  <td>{breed}</td>
                  <td>{calculateTotalQuantity('breed', breed)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Summary Table (Farm Section) */}
      <Row>
        <Col>
          <h2 className="text-black">Summary Table (Farm Section)</h2>
          <Table responsive striped bordered hover className="mt-4 text-light">
            <thead className="thead-dark">
              <tr>
                <th>Farm Section</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {getUniqueValues('farmSection').map((farmSection) => (
                <tr key={farmSection}>
                  <td>{farmSection}</td>
                  <td>{calculateTotalQuantity('farmSection', farmSection)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Summary Table (Gender) */}
      <Row>
        <Col>
          <h2 className="text-black">Summary Table (Gender)</h2>
          <Table responsive striped bordered hover className="mt-4 text-light">
            <thead className="thead-dark">
              <tr>
                <th>Gender</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {getUniqueValues('gender').map((gender) => (
                <tr key={gender}>
                  <td>{gender}</td>
                  <td>{calculateTotalQuantity('gender', gender)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Summary Table (Classification) */}
      <Row>
        <Col>
          <h2 className="text-black">Summary Table (Classification)</h2>
          <Table responsive striped bordered hover className="mt-4 text-light">
            <thead className="thead-dark">
              <tr>
                <th>Classification</th>
                <th>Total Quantity</th>
              </tr>
            </thead>
            <tbody>
              {getUniqueValues('classification').map((classification) => (
                <tr key={classification}>
                  <td>{classification}</td>
                  <td>{calculateTotalQuantity('classification', classification)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PigStock;