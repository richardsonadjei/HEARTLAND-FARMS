import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MdHome, MdLocalFlorist } from 'react-icons/md';
import { FaChartLine, FaPlusSquare, FaCogs } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import NewVegeBatchModal from './AllVeges/NewVegeBatch.modal'; // Import the modal component

const VegeFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to render links based on user role
  const renderLinks = () => {
    if (currentUser) {
      if (currentUser && currentUser.role.includes('admin')) {
        return (
          <>
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
              <Link to="/extras">
                <div className="footer-content">
                  <FaCogs className="footer-icon" style={{ color: '#9b59b6' }} /> {/* Purple color */}
                  <p>More</p>
                </div>
              </Link>
            </Col>
          </>
        );
      } else if (currentUser.role === 'finance') {
        return (
          <>
            <Col className="footer-link">
              <Link to="/vegesHome-page">
                <div className="footer-content">
                  <MdHome className="footer-icon" style={{ color: '#3498db' }} /> {/* Blue color */}
                  <p>Home</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/finance-veges">
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
          </>
        );
      }
    } else {
      return null; // Render nothing if user is not authenticated
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
      <NewVegeBatchModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </footer>
  );
};

export default VegeFooter;
