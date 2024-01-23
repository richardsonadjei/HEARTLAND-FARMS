import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMoneyBill, FaEgg, FaDove } from 'react-icons/fa'; // Replaced FaBird with FaDove
import { Link } from 'react-router-dom';

const PoultryIncomeActivities = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Poultry Income Activities</h1>
          <p>Record and manage various income transactions related to your poultry farm.</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/sell-eggs" className="card-link">
            <FaEgg className="tracking-icon sell-eggs-icon" />
            <h3>Sell Eggs</h3>
            <p>Record income from the sale of eggs produced by your poultry farm.</p>
          </Link>
        </Col>
        <Col className="tracking-card" md={6} lg={4}>
          <Link to="/sell-birds" className="card-link">
            <FaDove className="tracking-icon sell-birds-icon" /> {/* Replaced FaBird with FaDove */}
            <h3>Sell Birds</h3>
            <p>Record income from the sale of birds from your poultry farm.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PoultryIncomeActivities;
