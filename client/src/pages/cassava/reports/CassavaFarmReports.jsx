import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaTasks, FaDollarSign, FaEllipsisH } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation

const CassavaFarmReportsDashboard = () => {
  return (
    <Container fluid className="report-container">
      <h1 className="cassavaReports-header">Cassava Farm Reports</h1>
      <Row>
        <Col md={4}>
          <Card className="custom-card">
            <Card.Header as="h5" className="card-header activities-header" style={{ background: '#3498db', color: '#fff' }}>
              <FaTasks className="icon" style={{ color: '#fff' }} /> Farm Activities Reports
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group">
              <Link to="/cassava-land-preparations-report" className="list-item">
                Seasonal Land Preparation Report
              </Link>
              <Link to="/cassava-plantings-report" className="list-item">
                Seasonal Planting Activities
              </Link>
              <Link to="/cassava-weed-control-report" className="list-item">
                Weed Control
              </Link>
              <Link to="/cassava-fertilizer-application-report" className="list-item">
                Fertilizer Application Report
              </Link>
              <Link to="/cassava-pest-control-report" className="list-item">
                Pest And Disease Control Report
              </Link>
              <Link to="/cassava-harvest-report" className="list-item">
                Harvest Report
              </Link>
              <Link to="/cassava-fertilization-report" className="list-item">
                Storage Report
              </Link>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="custom-card">
            <Card.Header as="h5" className="card-header financial-header" style={{ background: '#2ecc71', color: '#fff' }}>
              <FaDollarSign className="icon" style={{ color: '#fff' }} /> Financial Reports
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group">
              <Link to="/cassava-seasonal-expense-report" className="list-item">
                Seasonal Expense Report
              </Link>
              <Link to="/cassava-sales-report" className="list-item">
                Seasonal Sales Report
              </Link>
              <Link to="/cassava-profit-loss-report" className="list-item">
                Seasonal Profit/Loss Report
              </Link>
              <Link to="/cassava-expenses-report" className="list-item">
                Annual Income Report
              </Link>
              <Link to="/cassava-expenses-report" className="list-item">
                Annual Expense Report
              </Link>
              <Link to="/cassava-expenses-report" className="list-item">
                Annual Profit/Loss Report
              </Link>
              <Link to="/cassava-expenses-report" className="list-item">
                All Income Report
              </Link>
              <Link to="/cassava-expenses-report" className="list-item">
                All Expense Report
              </Link>
              <Link to="/cassava-expenses-report" className="list-item">
                All Profit/Loss Report
              </Link>
            </ListGroup>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="custom-card">
            <Card.Header as="h5" className="card-header miscellaneous-header" style={{ background: '#e74c3c', color: '#fff' }}>
              <FaEllipsisH className="icon" style={{ color: '#fff' }} /> Miscellaneous Reports
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group">
              <Link to="/cassava-seasons-report" className="list-item">
                All Seasons Report
              </Link>
              <Link to="/cassava-soil-quality-report" className="list-item">
                Soil Quality Report
              </Link>
              <Link to="/cassava-crop-rotation-report" className="list-item">
                Farm Assets Report
              </Link>
              <Link to="/cassava-harvest-yield-report" className="list-item">
                Harvest Yield Report
              </Link>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CassavaFarmReportsDashboard;
