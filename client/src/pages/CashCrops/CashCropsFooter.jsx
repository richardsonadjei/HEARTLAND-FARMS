import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MdHome, MdLocalFlorist, MdPublic } from 'react-icons/md';
import { FaMoneyBill, FaPlusSquare, FaCogs, FaChartLine } from 'react-icons/fa'; // Updated icons
import NewCashCropBatchModal from './NewCashCropBatchModal';


const CashCropFooter = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
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
  );
};

export default CashCropFooter;
