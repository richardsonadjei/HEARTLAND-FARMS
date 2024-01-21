import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert, Modal, Form } from 'react-bootstrap';
import { FaSeedling, FaMoneyBill, FaFileAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const MaizeGettingStarted = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [showModal, setShowModal] = useState(false);
  const [newSeasonDetails, setNewSeasonDetails] = useState({
    startDate: '',
    additionalDetails: '',
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setNewSeasonDetails({
      startDate: '',
      additionalDetails: '',
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSeasonDetails({
      ...newSeasonDetails,
      [name]: value,
    });
  };

  const handleStartMaizeClick = async () => {
    try {
      // Validate input data (you can add additional validation logic here)

      // Data to be sent to the server
      const requestData = {
        startDate: newSeasonDetails.startDate,
        additionalDetails: newSeasonDetails.additionalDetails,
      };

      const response = await fetch('/api/start-maize-season', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      // Simulate a successful response
      const data = await response.json();
      setAlert({ show: true, type: 'success', message: data.message });

      // Hide the success alert after 3 seconds
      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 3000);

      // Close the modal after successful start
      handleCloseModal();
    } catch (error) {
      console.error('Error starting maize activities:', error);
      setAlert({ show: true, type: 'danger', message: 'Internal Server Error. Please try again later.' });

      // Hide the error alert after 3 seconds
      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 3000);
    }
  };

  return (
    <Container fluid className="dashboard-container">
      <Row className="header">
        <Col className="text-center">
          <h1>
            Welcome to The Maize Farm Dashboard,{' '}
            {currentUser ? (
              <span className="current-user">{currentUser.userName}</span>
            ) : (
              'Guest'
            )}
          </h1>
          <p>Get Started with Maize Farming</p>
        </Col>
      </Row>

      <Row className="features">
        <Col md={4} className="feature">
          <Link to="/maize-farm-activities" className="card-link">
            <FaSeedling className="icon" />
            <h3 className="card-title">Farm Activities</h3>
            <p className="card-description">Record and monitor all your maize farming activities. Track planting, weeding, and harvesting.</p>
          </Link>
        </Col>
        <Col md={4} className="feature">
          <Link to="/maize-financial-activities" className="card-link">
            <FaMoneyBill className="icon" />
            <h3 className="card-title">Financial Transactions</h3>
            <p className="card-description">Keep track of all financial transactions related to maize farming. Record expenses and income.</p>
          </Link>
        </Col>
        <Col md={4} className="feature">
          <Link to="/maize-farm-report-dashboard" className="card-link">
            <FaFileAlt className="icon" />
            <h3 className="card-title">Generate Reports</h3>
            <p className="card-description">Generate detailed reports for better decision-making. Analyze crop performance and expenses.</p>
          </Link>
        </Col>
      </Row>

      <Row className="cta">
        <Col className="text-center">
          <h2 className="blinking-text">Ready To Start A New Season?</h2>
          <Button variant="success" onClick={handleShowModal}>
            Start New Maize Season
          </Button>

          {/* New Modal for Recording New Season */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Record New Maize Season</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="startDate">
                  <Form.Label style={{ color: 'black' }}>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    value={newSeasonDetails.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="additionalDetails">
                  <Form.Label style={{ color: 'black' }}>Additional Details</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="additionalDetails"
                    value={newSeasonDetails.additionalDetails}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleStartMaizeClick}>
                Start Maize Season
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Alert */}
          {alert.show && (
            <Alert variant={alert.type} className="mt-3">
              {alert.message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default MaizeGettingStarted;
