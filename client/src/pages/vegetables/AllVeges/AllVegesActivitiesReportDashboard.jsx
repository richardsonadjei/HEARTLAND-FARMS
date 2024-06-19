import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const reportData = [
  { link: '/all-vege-nursings', image: '/nursery.jpg', title: 'Nursery Reports' },
  { link: '/all-vege-transplantings', image: '/transplanting.jpg', title: 'Transplanting Reports' },
  { link: '/all-vege-direct-planting', image: '/direct planting.jpg', title: 'Direct Planting Reports' },
  { link: '/all-vege-fertilizer-applications', image: '/Fertilizer Application.jpeg', title: 'Fertilizer Applications Reports' },
  { link: '/all-vege-pest-and-weed-controls', image: '/pest and weed control.png', title: 'Pest And Weed Control Reports' },
  { link: '/cocoyam-reports', image: '/cocoyam-report.jpg', title: 'Fertilizer And Manure Application Reports' },
  { link: '/cocoyam-reports', image: '/cocoyam-report.jpg', title: 'Harvest Reports' },
  { link: '/cocoyam-reports', image: '/cocoyam-report.jpg', title: 'Sales Reports' },
];

const AllVegesActivitiesReports = () => {
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

export default AllVegesActivitiesReports;
