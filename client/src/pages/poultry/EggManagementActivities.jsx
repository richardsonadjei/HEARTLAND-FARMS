import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaEgg, FaClipboardList, FaSortNumericUp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EggManagementActivities = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Egg Management Activities</h1>
          <p>Record and manage various egg-related activities</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col className="tracking-card">
          <Link to="/add-unsorted-eggs" className="card-link">
            <FaEgg className="tracking-icon egg-icon" />
            <h3>Record Unsorted Eggs</h3>
            <p>Log details of unsorted eggs in the poultry farm.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/add-sorted-eggs" className="card-link">
            <FaSortNumericUp className="tracking-icon sort-egg-icon" />
            <h3>Record Sorted Eggs</h3>
            <p>Track and manage the details of sorted eggs in the poultry farm.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default EggManagementActivities;
