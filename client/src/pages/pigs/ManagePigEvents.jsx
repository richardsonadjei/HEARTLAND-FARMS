import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSyringe, FaNotesMedical, FaBriefcaseMedical, FaUtensils, FaDollarSign, FaShoppingBasket, FaCapsules } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManagePigEvents = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Manage Pig Events</h1>
          <p>Record and manage various events in your pig farming activities</p>
        </Col>
      </Row>

      <Row className="tracking-section">
      
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/vaccination-health-management" className="card-link">
            <div className="tracking-card vaccination-card">
              <FaSyringe className="tracking-icon vaccination-icon" />
              <h3>Vaccination And Health Management</h3>
              <p>Record and manage pig vaccinations for disease prevention.</p>
            </div>
          </Link>
        </Col>
        
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/pig-feed-management" className="card-link">
            <div className="tracking-card feeding-card">
              <FaUtensils className="tracking-icon feeding-icon" />
              <h3>Feed Management</h3>
              <p>Log feeding activities and monitor pig nutrition.</p>
            </div>
          </Link>
        </Col>
      
       
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/sell-pigs" className="card-link">
            <div className="tracking-card sell-pigs-card">
              <FaDollarSign className="tracking-icon sell-pigs-icon" />
              <h3>Sell Pigs</h3>
              <p>Manage the process of selling pigs from your stock.</p>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ManagePigEvents;
