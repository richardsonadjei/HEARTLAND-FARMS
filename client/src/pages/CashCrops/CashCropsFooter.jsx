import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MdHome, MdLocalFlorist } from 'react-icons/md';
import { FaChartLine, FaPlusSquare, FaTools } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import NewCashCropBatchModal from './NewCashCropBatchModal';

const CashCropFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to render links based on user role
  const renderLinks = () => {
    if (currentUser) {
      const roles = currentUser.role; // Assuming role is an array

      if (roles.includes('admin') && roles.includes('finance')) {
        // User has both admin and finance roles
        return (
          <>
            <Col className="footer-link">
              <Link to="/cash-cropsHome-page">
                <div className="footer-content">
                  <MdHome className="footer-icon" style={{ color: '#3498db' }} />
                  <p>Home</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/cash-crops-farm-activities">
                <div className="footer-content">
                  <MdLocalFlorist className="footer-icon" style={{ color: '#27ae60' }} />
                  <p>Add Activity</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link" onClick={toggleModal}>
              <div className="footer-content">
                <FaPlusSquare className="footer-icon" style={{ color: '#e74c3c' }} />
                <p>New Batch</p>
              </div>
            </Col>
            <Col className="footer-link">
              <Link to="/cashCrop-finance-home">
                <div className="footer-content">
                  <FaChartLine className="footer-icon" style={{ color: '#f39c12' }} />
                  <p>Finance</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/cash-crops-extras">
                <div className="footer-content">
                  <FaTools className="footer-icon" style={{ color: '#8e44ad' }} />
                  <p>Extras</p>
                </div>
              </Link>
            </Col>
          </>
        );
      } else if (roles.includes('admin')) {
        // User has only admin role
        return (
          <>
            <Col className="footer-link">
              <Link to="/cash-cropsHome-page">
                <div className="footer-content">
                  <MdHome className="footer-icon" style={{ color: '#3498db' }} />
                  <p>Home</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/cash-crops-farm-activities">
                <div className="footer-content">
                  <MdLocalFlorist className="footer-icon" style={{ color: '#27ae60' }} />
                  <p>Add Activity</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link" onClick={toggleModal}>
              <div className="footer-content">
                <FaPlusSquare className="footer-icon" style={{ color: '#e74c3c' }} />
                <p>New Batch</p>
              </div>
            </Col>
            <Col className="footer-link">
              <Link to="/cash-crops-extras">
                <div className="footer-content">
                  <FaTools className="footer-icon" style={{ color: '#8e44ad' }} />
                  <p>Extras</p>
                </div>
              </Link>
            </Col>
          </>
        );
      } else if (roles.includes('finance')) {
        // User has only finance role
        return (
          <>
            <Col className="footer-link">
              <Link to="/cash-cropsHome-page">
                <div className="footer-content">
                  <MdHome className="footer-icon" style={{ color: '#3498db' }} />
                  <p>Home</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/cash-crops-farm-activities">
                <div className="footer-content">
                  <MdLocalFlorist className="footer-icon" style={{ color: '#27ae60' }} />
                  <p>Add Activity</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link" onClick={toggleModal}>
              <div className="footer-content">
                <FaPlusSquare className="footer-icon" style={{ color: '#e74c3c' }} />
                <p>New Batch</p>
              </div>
            </Col>
            <Col className="footer-link">
              <Link to="/cash-crops-extras">
                <div className="footer-content">
                  <FaTools className="footer-icon" style={{ color: '#8e44ad' }} />
                  <p>Extras</p>
                </div>
              </Link>
            </Col>
          </>
        );
      } else {
        // User has employee role
        return (
          <>
            <Col className="footer-link">
              <Link to="/cash-cropsHome-page">
                <div className="footer-content">
                  <MdHome className="footer-icon" style={{ color: '#3498db' }} />
                  <p>Home</p>
                </div>
              </Link>
            </Col>
            <Col className="footer-link">
              <Link to="/cash-crops-farm-activities">
                <div className="footer-content">
                  <MdLocalFlorist className="footer-icon" style={{ color: '#27ae60' }} />
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
      <NewCashCropBatchModal isOpen={isModalOpen} toggleModal={toggleModal} />
    </footer>
  );
};

export default CashCropFooter;
