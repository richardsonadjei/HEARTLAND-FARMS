import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMoneyBill, FaArrowCircleDown, FaArrowCircleUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PoultryFinancialActivities = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Poultry Financial Activities</h1>
          <p>Record and manage various financial transactions related to your poultry farm.</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/poultry-expenditure-activities" className="card-link">
            <FaArrowCircleDown className="tracking-icon expenditures-icon" />
            <h3>Expenditures</h3>
            <p>Record and track expenses related to your poultry farm.</p>
          </Link>
        </Col>
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/poultry-income-activities" className="card-link">
            <FaArrowCircleUp className="tracking-icon income-icon" />
            <h3>Income</h3>
            <p>Record and track income generated from poultry-related activities.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PoultryFinancialActivities;
