import React from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaClipboardList, FaUtensils, FaEgg, FaDollarSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';



const PoultryReportActivities = () => {
  const listGroupStyle = {
    maxHeight: '450px', // Set the desired height for the list group
    overflowY: 'auto', // Enable vertical scrolling
  };

  return (
    <Container fluid className="report-container">
      <h1 className="poultryReports-header">Poultry Reports</h1>
      <Row>
        <Col md={3}>
          <Card className="custom-card" >
            <Card.Header as="h5" className="card-header stock-header" style={{ background: '#3498db', color: '#fff' }}>
              <FaClipboardList className="icon" style={{ color: '#fff' }} /> Stock Reports
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group">
              <Link to="/poultry-stock-summary-report" className="list-item">
                Stock Summary Report
              </Link>
              <Link to="/farm-section-report" className="list-item">
                Stock Report Based On Farm Section 
              </Link>
              <Link to="/age-report" className="list-item">
                Stock Age Report
              </Link>
              <Link to="/poultry-relocation-report" className="list-item">
                Relocation Report
              </Link>
              <Link to="/add-history" className="list-item">
                Bird Additions Report
              </Link>
              <Link to="/update-history" className="list-item">
                Batch Update Report
              </Link>
              <Link to="/all-batches-mortality-report" className="list-item">
                All Batches Mortality Report
              </Link>
              <Link to="/batch-mortality-report" className="list-item">
                Batch Mortality Report
              </Link>
              
              <Link to="/poultry-stock-taking-report" className="list-item">
                Stock Taking Report
              </Link>
            </ListGroup>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="custom-card" >
            <Card.Header as="h5" className="card-header feed-header" style={{ background: '#2ecc71', color: '#fff' }}>
              <FaUtensils className="icon" style={{ color: '#fff' }} /> Feed And Health Management Reports
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group"  style={listGroupStyle}>
              <Link to="/view-all-feed-stock" className="list-item">
                All Feed Stock
              </Link>
              <Link to="/all-feed-category" className="list-item">
                All Feed Categories
              </Link>
              <Link to="/all-vaccines" className="list-item">
                Vaccination Cycle / Chart
              </Link>
              <Link to="/all-medication-category" className="list-item">
                All Medicine Categories
              </Link>
              <Link to="/all-drug" className="list-item">
                All Drugs Available
              </Link>
              <Link to="/batch-vaccination-history" className="list-item">
                Batch Vaccination History
              </Link>
              <Link to="/batch-deworming-history" className="list-item">
                Batch Deworming History
              </Link>
              <Link to="/deworming-history" className="list-item">
               All Batches Deworming History
              </Link>
              <Link to="/batch-treatment-report" className="list-item">
               Batch Treatment Report
              </Link>
            </ListGroup>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="custom-card" >
            <Card.Header as="h5" className="card-header egg-header" style={{ background: '#f39c12', color: '#fff' }}>
              <FaEgg className="icon" style={{ color: '#fff' }} /> Egg Management Report
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group">
              <Link to="/daily-unsorted-eggs-report" className="list-item">
                Daily Unsorted Egg Production Report
              </Link>
              <Link to="/daily-sorted-eggs-report" className="list-item">
                Daily Sorted Egg Production Report
              </Link>
              
            </ListGroup>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="custom-card">
            <Card.Header as="h5" className="card-header financial-header" style={{ background: '#e74c3c', color: '#fff' }}>
              <FaDollarSign className="icon" style={{ color: '#fff' }} /> Financial Reports
            </Card.Header>
            <ListGroup variant="flush" className="custom-list-group">
              <Link to="/egg-sales-report" className="list-item">
                Egg Sales Report
              </Link>
              <Link to="/bird-sales-report" className="list-item">
                Bird Sales Report
              </Link>
              <Link to="/poultry-profit-loss-report" className="list-item">
                Expense
              </Link>
              <Link to="/poultry-profit-loss-report" className="list-item">
                Profit And Loss Report
              </Link>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PoultryReportActivities;
