import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MdHome, MdLocalFlorist } from 'react-icons/md';
import { FaChartLine, FaCogs } from 'react-icons/fa';
import { GiEggClutch } from 'react-icons/gi'; // Import the egg icon

const BirdsFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
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
                <p>Add Activity</p>
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
          <Col className="footer-link">
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
      {/* <NewBirdBatchDModal isOpen={isModalOpen} toggleModal={toggleModal} /> */}
    </footer>
  );
};

export default BirdsFooter;
