// PigFarmReportsDashboard.jsx

import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaChartLine, FaHeartbeat, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const PigFarmReportsDashboard = () => {
  return (
    <Container fluid className="report-container">
      <h1 className="pigReports-header">Pig Farm Reports</h1>
      <Row>
        <Col md={4}>
          <Card className="custom-card">
            <Card.Header as="h5" className="card-header stock-header">
              <FaChartLine className="icon" /> Stock Reports
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group">
              <Link to="/pig-stock-report" className="list-item">
                General Stock Report
              </Link>
              <Link to="/stock-report-2" className="list-item">
                Stock Report 2
              </Link>
              <Link to="/stock-report-3" className="list-item">
                Stock Report 3
              </Link>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="custom-card">
            <Card.Header as="h5" className="card-header health-header">
              <FaHeartbeat className="icon" /> Health Reports
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group">
              <Link to="/health-report-1" className="list-item">
                Health Report 1
              </Link>
              <Link to="/health-report-2" className="list-item">
                Health Report 2
              </Link>
              <Link to="/health-report-3" className="list-item">
                Health Report 3
              </Link>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="custom-card">
            <Card.Header as="h5" className="card-header financial-header">
              <FaDollarSign className="icon" /> Financial Reports
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group">
              <Link to="/financial-report-1" className="list-item">
                Financial Report 1
              </Link>
              <Link to="/financial-report-2" className="list-item">
                Financial Report 2
              </Link>
              <Link to="/financial-report-3" className="list-item">
                Financial Report 3
              </Link>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PigFarmReportsDashboard;
