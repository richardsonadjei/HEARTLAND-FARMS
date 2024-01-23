import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaShoppingBasket,
  FaMedkit,
  FaSyringe,
  FaTools,
  FaHammer,
  FaDollarSign,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PoultryExpenditureActivities = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Poultry Expenditure Activities</h1>
          <p>Record and manage various expenditure activities related to your poultry farm.</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/purchase-feed" className="card-link">
            <FaShoppingBasket className="tracking-icon purchase-feed-icon" />
            <h3>Purchase Feed</h3>
            <p>Record expenses related to purchasing feed for your poultry birds.</p>
          </Link>
        </Col>
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/purchase-drugs" className="card-link">
            <FaMedkit className="tracking-icon purchase-drugs-icon" />
            <h3>Purchase Drugs</h3>
            <p>Record expenses related to purchasing drugs for your poultry birds.</p>
          </Link>
        </Col>
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/purchase-vaccines" className="card-link">
            <FaSyringe className="tracking-icon purchase-vaccines-icon" />
            <h3>Purchase Vaccines</h3>
            <p>Record expenses related to purchasing vaccines for your poultry birds.</p>
          </Link>
        </Col>
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/purchase-farm-tools" className="card-link">
            <FaTools className="tracking-icon purchase-tools-icon" />
            <h3>Purchase Farm Tools</h3>
            <p>Record expenses related to purchasing tools for your poultry farm.</p>
          </Link>
        </Col>
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/maintenance-repairs" className="card-link">
            <FaHammer className="tracking-icon maintenance-icon" />
            <h3>Poultry Structure Maintenance</h3>
            <p>Record expenses related to maintenance and repairs of poultry structures.</p>
          </Link>
        </Col>
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/miscellaneous-expenditures" className="card-link">
            <FaDollarSign className="tracking-icon miscellaneous-icon" />
            <h3>Miscellaneous Expenditures</h3>
            <p>Record other miscellaneous expenses related to your poultry farm.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PoultryExpenditureActivities;
