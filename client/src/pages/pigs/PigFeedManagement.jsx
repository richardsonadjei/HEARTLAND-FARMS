import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaIndustry, FaShoppingBasket, FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PigFeedManagement = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Feed Management</h1>
          <p>Record and manage various events related to feed for your livestock</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/manufacture-feed" className="card-link">
            <div className="tracking-card manufacture-feed-card">
              <FaIndustry className="tracking-icon manufacture-feed-icon" />
              <h3>Manufacture Feed</h3>
              <p>Produce feed for your livestock with a custom recipe.</p>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/purchase-feed" className="card-link">
            <div className="tracking-card purchase-feed-card">
              <FaShoppingBasket className="tracking-icon purchase-feed-icon" />
              <h3>Purchase Feed</h3>
              <p>Record and manage purchases of feed for your livestock.</p>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/log-feed-usage" className="card-link">
            <div className="tracking-card log-feed-usage-card">
              <FaUtensils className="tracking-icon log-feed-usage-icon" />
              <h3>Log Feed Usage</h3>
              <p>Keep track of feed usage and monitor livestock nutrition.</p>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PigFeedManagement;
