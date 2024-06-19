import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MdHome, MdLocalFlorist, MdNaturePeople, MdPublic } from 'react-icons/md';
import { FaChartLine, FaCogs, FaMoneyBill, FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NewBirdIDModal from './extras/NewBirdIDModal';
import { GiEggClutch } from 'react-icons/gi';



const BirdsHomepage = () => {
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
              <h1>Welcome To The Birds Management Platform</h1>
            </Col>
          </Row>
        </Container>
      </header>
      <Container className="mt-4">
        <Row>
          <Col>
            <Link to="/poultry-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/poultry.jpg" />
                <Card.Body>
                  <Card.Title>Poultry Farm</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/turkey-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/turkey.jpeg" />
                <Card.Body>
                  <Card.Title>Turkey Farm</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/duck-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/duck.jpg" />
                <Card.Body>
                  <Card.Title>Ducks Farm</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col>
            <Link to="/guinea-fowl-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/guinea fowl.png" />
                <Card.Body>
                  <Card.Title>Guinea Fowl Farm</Card.Title>
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
              <Link to="/birds-home">
                <div className="footer-content">
                  <MdHome className="footer-icon" style={{ color: '#3498db' }} /> {/* Blue color */}
                  <p>Home</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/birds-farm-activities">
                <div className="footer-content">
                  <MdLocalFlorist className="footer-icon" style={{ color: '#27ae60' }} /> {/* Green color */}
                  <p>Add Record</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/birds-finance">
                <div className="footer-content">
                  <FaChartLine className="footer-icon" style={{ color: '#f39c12' }} /> {/* Orange color */}
                  <p>Finance</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link" >
      <Link to="/hatchery-home">
      <div className="footer-content">
      <GiEggClutch className="footer-icon" style={{ color: '#ff6347' }} /> {/* Tomato Red color */}
              <p>Hatchery</p>
            </div>
      </Link>
            
          </Col>
            <Col className="footer-link">
              <Link to="/birds-extras">
                <div className="footer-content">
                  <FaCogs className="footer-icon" style={{ color: '#9b59b6' }} /> {/* Purple color */}
                  <p>More</p>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
        {/* Render the modal */}
        <NewBirdIDModal isOpen={isModalOpen} toggleModal={toggleModal} />
      </footer>

      {/* Render the modal */}
      <NewBirdIDModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default BirdsHomepage;
