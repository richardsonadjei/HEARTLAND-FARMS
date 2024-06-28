import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MdHome, MdLocalFlorist, MdNaturePeople, MdPublic } from 'react-icons/md';
import { FaChartLine, FaCogs, FaMoneyBill, FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NewAnimalIDModal from './NewAnimalIDModal';
import AnimalsFooter from './AnimalsFooter';


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
      <AnimalsFooter/>

      {/* Render the modal */}
      <NewAnimalIDModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default FarmAnimalsHomepage;
