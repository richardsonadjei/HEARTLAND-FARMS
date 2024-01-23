import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaMedkit, FaSyringe, FaBug, FaUserMd, FaHospital } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PoultryHealthManagement = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Health Management</h1>
          <p>Record and manage various health-related activities for your livestock</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col xs={12} sm={6} lg={4} className="tracking-card mb-3">
          <Link to="/add-drug" className="card-link">
            <FaMedkit className="tracking-icon drugs-icon" />
            <h3>Add New Drugs/Vaccine</h3>
            <p>Record and manage information about new drugs or vaccines for your livestock.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={4} className="tracking-card mb-3">
          <Link to="/add-vaccine" className="card-link">
            <FaSyringe className="tracking-icon vaccine-icon" />
            <h3>Add Vaccine To Vaccination Cycle</h3>
            <p>Include vaccines in the vaccination cycle for maintaining livestock health.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={4} className="tracking-card mb-3">
          <Link to="/deworm-birds" className="card-link">
            <FaBug className="tracking-icon deworm-icon" />
            <h3>Deworm Birds</h3>
            <p>Administer deworming treatment to ensure the health of your birds.</p>
          </Link>
        </Col>
      </Row>
      <Row className="tracking-section">
        <Col xs={12} sm={6} lg={6} className="tracking-card mb-3">
          <Link to="/add-health-condition" className="card-link">
            <FaUserMd className="tracking-icon diagnose-icon" />
            <h3>Diagnose And Isolate Birds</h3>
            <p>Perform health diagnosis and isolate affected birds for proper care.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={6} className="tracking-card mb-3">
          <Link to="/treat-sick-birds" className="card-link">
            <FaHospital className="tracking-icon treat-icon" />
            <h3>Treat Sick Birds</h3>
            <p>Provide medical treatment to sick birds to ensure their recovery.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PoultryHealthManagement;
