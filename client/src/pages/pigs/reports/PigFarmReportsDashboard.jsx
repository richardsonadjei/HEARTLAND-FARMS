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
              <Link to="/pig-crossing-report" className="list-item">
               All BatchesCrossing Report
              </Link>
              <Link to="/sow-crossing-report" className="list-item">
                Batch Crossing Report
              </Link>
              <Link to="/pig-birth-report" className="list-item">
                All Births Report
              </Link>
              <Link to="/each-pig-birth-report" className="list-item">
                Sow Birth Report
              </Link>
              <Link to="/pig-mortality" className="list-item">
                Mortality Report
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
                Iron Treatment Report
              </Link>
              <Link to="/health-report-2" className="list-item">
                All Pig Deworming Report
              </Link>
              <Link to="/health-report-3" className="list-item">
                Pig Deworming Report
              </Link>
              <Link to="/health-report-3" className="list-item">
                Other Routine Treatment Report
              </Link>
              <Link to="/health-report-3" className="list-item">
               Pig Sick Report
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
                Feed Purchase 
              </Link>
              <Link to="/financial-report-2" className="list-item">
               Medication Purchase 
              </Link>
              <Link to="/financial-report-3" className="list-item">
                Pig Sales Report
              </Link>
              <Link to="/financial-report-3" className="list-item">
               Other Expenses Report
              </Link>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PigFarmReportsDashboard;
