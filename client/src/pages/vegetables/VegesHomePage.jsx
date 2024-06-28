import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import NewVegeBatchModal from './AllVeges/NewVegeBatch.modal'; // Import the NewVegeBatchModal component
import VegeFooter from './VegeFooter';

const VegesHomepage = () => {
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
              <h1>Welcome To The Vegetable Platform</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="mt-4">
        <Row>
          <Col>
            <Link to="/cabbage-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/cabbage.jpg" />
                <Card.Body>
                  <Card.Title>Cabbage</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/spring-onion-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/spring-onion.jpg" />
                <Card.Body>
                  <Card.Title>Spring Onion</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/green-pepper-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/green pepper.jpg" />
                <Card.Body>
                  <Card.Title>Green Pepper</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/carrot-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/CARROT.jpeg" />
                <Card.Body>
                  <Card.Title>Carrot</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Link to="/cucumber-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/cucumber.jpeg" />
                <Card.Body>
                  <Card.Title>Cucumber</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/lettuce-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/Lettuce.png" />
                <Card.Body>
                  <Card.Title>Lettuce</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/pepper-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/habanaro.jpeg" />
                <Card.Body>
                  <Card.Title>Pepper</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/okro-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/Okro.png" />
                <Card.Body>
                  <Card.Title>Okro</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <Link to="/tomato-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/tomato.jpg" />
                <Card.Body>
                  <Card.Title>Tomato</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
     <VegeFooter/>
      <NewVegeBatchModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default VegesHomepage;
