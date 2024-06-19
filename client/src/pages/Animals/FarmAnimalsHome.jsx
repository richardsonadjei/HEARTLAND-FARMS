import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MdHome, MdLocalFlorist, MdNaturePeople, MdPublic } from 'react-icons/md';
import { FaChartLine, FaCogs, FaMoneyBill, FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NewAnimalIDModal from './NewAnimalIDModal';


const FarmAnimalsHomepage = () => {
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
              <h1>Welcome To The Animal Farm Platform</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="mt-4">
        <Row>
          <Col>
            <Link to="/goats-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/Goats.jpg" />
                <Card.Body>
                  <Card.Title>Goats Farm</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/sheep-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/Sheeps.jpg" />
                <Card.Body>
                  <Card.Title>Sheep Farm</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/pig-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/Pigs.jpeg" />
                <Card.Body>
                  <Card.Title>Pigs Farm</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/cattle-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/Cattle.jpg" />
                <Card.Body>
                  <Card.Title>Cattle</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
        {/* <Row className="mt-4">
          <Col>
            <Link to="/cocoa-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/Cocoa.jpeg" />
                <Card.Body>
                  <Card.Title>Cocoa Plantation</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/rubber-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/RUBBER_PLANTATION.jpg" />
                <Card.Body>
                  <Card.Title>Rubber Plantation</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row> */}
      </Container>
      <footer className="veges-footer">
        <Container>
          <Row>
            <Col className="footer-link">
              <Link to="/animals-home-page">
                <div className="footer-content">
                  <MdHome className="footer-icon" style={{ color: '#3498db' }} /> {/* Blue color */}
                  <p>Home</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/animal-farm-activity">
                <div className="footer-content">
                  <MdLocalFlorist className="footer-icon" style={{ color: '#27ae60' }} /> {/* Green color */}
                  <p>Add Record</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/animal-farm-finance">
                <div className="footer-content">
                  <FaChartLine className="footer-icon" style={{ color: '#f39c12' }} /> {/* Orange color */}
                  <p>Finance</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link" onClick={toggleModal}>
              <div className="footer-content">
                <FaPlusSquare className="footer-icon" style={{ color: '#e74c3c' }} /> {/* Red color */}
                <p>New ID</p>
              </div>
            </Col>
            <Col className="footer-link">
              <Link to="/animals-extras">
                <div className="footer-content">
                  <FaCogs className="footer-icon" style={{ color: '#9b59b6' }} /> {/* Purple color */}
                  <p>More</p>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
        {/* Render the modal */}
        <NewAnimalIDModal isOpen={isModalOpen} toggleModal={toggleModal} />
      </footer>

      {/* Render the modal */}
      <NewAnimalIDModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default FarmAnimalsHomepage;
