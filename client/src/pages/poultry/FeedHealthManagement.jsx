import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaUtensils, FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FeedAndHealthManagement = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Feed and Health Management</h1>
          <p>Record and manage various activities related to feed and health for your livestock</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col className="tracking-card">
          <Link to="/feed-management" className="card-link">
            <FaUtensils className="tracking-icon feed-icon" />
            <h3>Feed Management</h3>
            <p>Record and manage the feeding activities for your livestock.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/poultry-health-management" className="card-link">
            <FaHeartbeat className="tracking-icon health-icon" />
            <h3>Health Management</h3>
            <p>Track and manage the health-related activities for your livestock.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedAndHealthManagement;
