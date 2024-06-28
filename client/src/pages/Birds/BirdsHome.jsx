import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { MdHome, MdLocalFlorist, MdNaturePeople, MdPublic } from 'react-icons/md';
import { FaChartLine, FaCogs, FaMoneyBill, FaPlusSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NewBirdIDModal from './extras/NewBirdIDModal';
import { GiEggClutch } from 'react-icons/gi';
import BirdsFooter from './BirdsFooter';



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
       {/* Use BirdsFooter component */}
       <BirdsFooter />

      {/* Render the modal */}
      <NewBirdIDModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </div>
  );
};

export default BirdsHomepage;
