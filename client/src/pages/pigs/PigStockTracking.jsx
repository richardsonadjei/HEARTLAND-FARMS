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
        <Col className="tracking-card">
          <Link to="/record-pig-birth" className="card-link">
            <FaBaby className="tracking-icon baby-icon" />
            <h3>Births</h3>
            <p>Record new piglet births and manage litters.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/monitor-weight" className="card-link">
            <FaBalanceScale className="tracking-icon weight-icon" />
            <h3>Weight</h3>
            <p>Monitor the weight of your pigs for optimal growth.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/track-breeding" className="card-link">
            <FaHeartbeat className="tracking-icon breeding-icon" />
            <h3>Breeding</h3>
            <p>Track breeding activities and manage breeding records.</p>
          </Link>
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
        <Col className="tracking-card">
          <Link to="/pig-crossing" className="card-link">
            <FaPiggyBank className="tracking-icon farrowing-icon" />
            <h3>Crossing</h3>
            <p>Record Crossing of Female Pig</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/record-farrowing" className="card-link">
            <FaPiggyBank className="tracking-icon farrowing-icon" />
            <h3>Farrowing</h3>
            <p>Record farrowing events and manage sow and piglet health.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/manage-weaning" className="card-link">
            <FaChild className="tracking-icon weaning-icon" />
            <h3>Weaning</h3>
            <p>Manage the weaning process and piglet transitions.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/add-pig-mortality" className="card-link">
            <FaSkullCrossbones className="tracking-icon mortality-icon" />
            <h3>Mortality</h3>
            <p>Track piglet mortality and analyze possible causes.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PigStockTracking;
