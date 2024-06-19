import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MdHome, MdLocalFlorist, MdNaturePeople, MdPublic } from 'react-icons/md';
import { FaChartLine, FaCogs, FaMoneyBill, FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NewVegeBatchModal from './AllVeges/NewVegeBatch.modal'; // Import the NewVegeBatchModal component

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
      <footer className="veges-footer">
      <Container>
        <Row>
          <Col className="footer-link">
            <Link to="/vegesHome-page">
              <div className="footer-content">
                <MdHome className="footer-icon" style={{ color: '#3498db' }} /> {/* Blue color */}
                <p>Home</p>
              </div>
            </Link>
          </Col>
          <Col className="footer-link">
            <Link to="/all-farm-activities">
              <div className="footer-content">
                <MdLocalFlorist className="footer-icon" style={{ color: '#27ae60' }} /> {/* Green color */}
                <p>Add Activity</p>
              </div>
            </Link>
          </Col>
          <Col className="footer-link">
            <Link to="/finance-veges">
              <div className="footer-content">
                <FaChartLine className="footer-icon" style={{ color: '#f39c12' }} /> {/* Orange color */}
                <p>Add Finance</p>
              </div>
            </Link>
          </Col>
          <Col className="footer-link" onClick={toggleModal}>
            <div className="footer-content">
              <FaPlusSquare className="footer-icon" style={{ color: '#e74c3c' }} /> {/* Red color */}
              <p>New Batch</p>
            </div>
          </Col>
          <Col className="footer-link">
            <Link to="/extras">
              <div className="footer-content">
                <FaCogs className="footer-icon" style={{ color: '#9b59b6' }} /> {/* Purple color */}
                <p>More</p>
              </div>
            </Link>
          </Col>
        </Row>
      </Container>
      {/* Render the modal */}
      <NewVegeBatchModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </footer>

      {/* Render the modal */}
      <NewVegeBatchModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default VegesHomepage;
