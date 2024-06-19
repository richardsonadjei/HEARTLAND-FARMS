import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MdHome, MdLocalFlorist, MdNaturePeople, MdPublic } from 'react-icons/md';
import { FaChartLine, FaCogs, FaMoneyBill, FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NewCashCropBatchModal from './NewCashCropBatchModal';

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
          {/* <Col>
            <Link to="/palm-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/OIL PALM FARM.jpeg" />
                <Card.Body>
                  <Card.Title>Palm Plantation</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col> */}
        </Row>
        <Row className="mt-4">
          {/* <Col>
            <Link to="/cocoa-home">
              <Card className="veges-card">
                <Card.Img variant="top" src="/coconut.jpg" />
                <Card.Body>
                  <Card.Title>Coconut Plantation</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col> */}
        </Row>
      </Container>
      <footer className="veges-footer">
        <Container>
          <Row>
            <Col className="footer-link">
              <Link to="/cash-cropsHome-page">
                <div className="footer-content">
                  <MdHome className="footer-icon" style={{ color: '#3498db' }} /> {/* Blue color */}
                  <p>Home</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/cash-crops-farm-activities">
                <div className="footer-content">
                  <MdLocalFlorist className="footer-icon" style={{ color: '#27ae60' }} /> {/* Green color */}
                  <p>Add Activity</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/cashCrop-finance-home">
                <div className="footer-content">
                  <FaChartLine className="footer-icon" style={{ color: '#f39c12' }} /> {/* Orange color */}
                  <p>Finance</p>
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
              <Link to="/cash-crops-extras">
                <div className="footer-content">
                  <FaCogs className="footer-icon" style={{ color: '#9b59b6' }} /> {/* Purple color */}
                  <p>More</p>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
        {/* Render the modal */}
        <NewCashCropBatchModal isOpen={isModalOpen} toggleModal={toggleModal} />
      </footer>

      {/* Render the modal */}
      <NewCashCropBatchModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default CashCropsHomepage;
