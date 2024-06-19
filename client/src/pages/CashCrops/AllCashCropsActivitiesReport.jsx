import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const reportData = [
  { link: '/all-cashcrop-land-preparation-report', image: '/landPreparation.jpg', title: 'Land Preparation Reports' },
  { link: '/all-cashcrop-planting-report', image: '/planting.jpg', title: 'Planting Reports' },
  { link: '/all-cashcrop-manual-weedings-report', image: '/manual weeding.jpg', title: 'Manual Weeding Reports' },
  { link: '/palm-reports', image: '/weedicide application.jpg', title: 'Weedicide Applications Reports' },
  { link: '/cocoyam-reports', image: '/cocoyam-report.jpg', title: 'Pest And Disease Control Reports' },
  { link: '/cocoyam-reports', image: '/cocoyam-report.jpg', title: 'Fertilizer And Manure Application Reports' },
  { link: '/cocoyam-reports', image: '/cocoyam-report.jpg', title: 'Harvest Reports' },
  { link: '/cocoyam-reports', image: '/cocoyam-report.jpg', title: 'Sales Reports' },
];

const AllCashCropsActivitiesReports = () => {
  return (
    <div className="cashcrops-reports">
      <header className="reports-header">
        <Container>
          <Row>
            <Col>
              <h1>Cash Crops Reports</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="mt-4">
        <Row>
          {reportData.map((report, index) => (
            <Col key={index}>
              <Link to={report.link}>
                <Card className="reports-card">
                  <Card.Img variant="top" src={report.image} />
                  <Card.Body>
                    <Card.Title>{report.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AllCashCropsActivitiesReports;
