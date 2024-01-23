import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaMoneyBillAlt,
  FaShoppingCart,
  FaFlask,
  FaTools,
  FaBriefcase,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MaizeFinancialActivities = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Maize Financial Activities</h1>
          <p>Record and manage various financial transactions related to maize farming</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col xs={12} lg={6} className="tracking-card">
          <Link to="/sell-maize" className="card-link">
            <FaMoneyBillAlt className="tracking-icon sales-icon" />
            <h3>Sales</h3>
            <p>Record sales of harvested maize.</p>
          </Link>
        </Col>
        
        <Col xs={12} lg={6} className="tracking-card">
          <Link to="/maize-farm-fertilizer-purchase" className="card-link">
            <FaFlask className="tracking-icon chemicals-icon" />
            <h3>Purchase Fertilizer</h3>
            <p>Buy Fertilizer For Maize Farm</p>
          </Link>
        </Col>
        <Col xs={12} lg={6} className="tracking-card">
          <Link to="/maize-farm-weedicide-purchase" className="card-link">
            <FaFlask className="tracking-icon chemicals-icon" />
            <h3>Purchase Weedicide</h3>
            <p>Buy Weedicide For Maize Farm</p>
          </Link>
        </Col>
        <Col xs={12} lg={6} className="tracking-card">
          <Link to="/purchase-tools-equipment" className="card-link">
            <FaShoppingCart className="tracking-icon tools-icon" />
            <h3>Purchase Tools and Equipment</h3>
            <p>Buy tools and equipment for maize farming.</p>
          </Link>
        </Col>
        <Col xs={12} lg={6} className="tracking-card">
          <Link to="/maize-farm-misc-expense" className="card-link">
            <FaBriefcase className="tracking-icon expenditures-icon" />
            <h3>Other Expenditures</h3>
            <p>Record miscellaneous financial expenditures.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default MaizeFinancialActivities;
