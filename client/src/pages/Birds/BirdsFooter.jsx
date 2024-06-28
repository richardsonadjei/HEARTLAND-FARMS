import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MdHome, MdLocalFlorist } from 'react-icons/md';
import { FaChartLine, FaPlusSquare, FaCogs } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const BirdsFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to render links based on user role
  const renderLinks = () => {
    if (currentUser && currentUser.role.includes('admin')) {
      return (
        <>
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
          <Col className="footer-link" onClick={toggleModal}>
            <div className="footer-content">
              <FaPlusSquare className="footer-icon" style={{ color: '#e74c3c' }} /> {/* Red color */}
              <p>New Batch</p>
            </div>
          </Col>
          <Col className="footer-link">
            <Link to="/birds-extras">
              <div className="footer-content">
                <FaCogs className="footer-icon" style={{ color: '#9b59b6' }} /> {/* Purple color */}
                <p>More</p>
              </div>
            </Link>
          </Col>
        </>
      );
    } else if (currentUser && currentUser.role.includes('finance')) {
      return (
        <>
          <Col className="footer-link">
            <Link to="/birds-home">
              <div className="footer-content">
                <MdHome className="footer-icon" style={{ color: '#3498db' }} /> {/* Blue color */}
                <p>Home</p>
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
        </>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  return (
    <footer className="veges-footer">
      <Container>
        <Row>
          {renderLinks()} {/* Render links based on user role */}
        </Row>
      </Container>
      {/* Render the modal */}
      {/* <NewBirdBatchModal isOpen={isModalOpen} toggleModal={toggleModal} /> */}
    </footer>
  );
};

export default BirdsFooter;
