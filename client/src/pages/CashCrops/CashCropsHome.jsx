import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CashCropFooter from './CashCropsFooter';


const CashCropsHomepage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="veges-homepage">
      <header className="veges-header">
        <Container>
          <Row>
            <Col>
              <h1>Welcome To The Cash Crops Platform</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="mt-4">
        <Row>
          <Col>
            <Link to="/maize-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/maize.jpg" />
                <Card.Body>
                  <Card.Title>Maize Farm</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/cassava-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/Cassava Farm.jpg" />
                <Card.Body>
                  <Card.Title>Cassava Farm</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/plantain-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/Plantain Farm.jpg" />
                <Card.Body>
                  <Card.Title>Plantain Farm</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
      {/* Replace the existing footer with CashCropFooter component */}
      <CashCropFooter />
     
    </div>
  );
};

export default CashCropsHomepage;
