// PigStockTracking.jsx

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaBaby, FaBalanceScale, FaHeartbeat, FaPiggyBank, FaChild, FaSkullCrossbones } from 'react-icons/fa';
import { GiPig } from 'react-icons/gi';
import { Link } from 'react-router-dom'; 

const PigStockTracking = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Pig Stock Tracking</h1>
          <p>Record and manage various pig farming activities</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col className="tracking-card" onClick={() => handleSectionClick('births')}>
          <FaBaby className="tracking-icon baby-icon" />
          <h3>Births</h3>
          <p>Record new piglet births and manage litters.</p>
        </Col>
        <Col className="tracking-card" onClick={() => handleSectionClick('weight')}>
          <FaBalanceScale className="tracking-icon weight-icon" />
          <h3>Weight</h3>
          <p>Monitor the weight of your pigs for optimal growth.</p>
        </Col>
        <Col className="tracking-card" onClick={() => handleSectionClick('breeding')}>
          <FaHeartbeat className="tracking-icon breeding-icon" />
          <h3>Breeding</h3>
          <p>Track breeding activities and manage breeding records.</p>
        </Col>
        <Col className="tracking-card">
          <Link to="/add-new-pig" className="card-link">
            <GiPig className="tracking-icon pig-icon" />
            <h3>New Stock</h3>
            <p>Add new matured pigs to your stock.</p>
          </Link>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col className="tracking-card" onClick={() => handleSectionClick('farrowing')}>
          <FaPiggyBank className="tracking-icon farrowing-icon" />
          <h3>Farrowing</h3>
          <p>Record farrowing events and manage sow and piglet health.</p>
        </Col>
        <Col className="tracking-card" onClick={() => handleSectionClick('weaning')}>
          <FaChild className="tracking-icon weaning-icon" />
          <h3>Weaning</h3>
          <p>Manage the weaning process and piglet transitions.</p>
        </Col>
        <Col className="tracking-card" onClick={() => handleSectionClick('mortality')}>
          <FaSkullCrossbones className="tracking-icon mortality-icon" />
          <h3>Mortality</h3>
          <p>Track piglet mortality and analyze possible causes.</p>
        </Col>
      </Row>
    </Container>
  );
};

const handleSectionClick = (section) => {
  // Handle navigation or data entry for the clicked section
  console.log(`Navigate to ${section} section or open data entry form.`);
};

export default PigStockTracking;
