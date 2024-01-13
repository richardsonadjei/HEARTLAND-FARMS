import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaPiggyBank, FaCalendar, FaFileAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PigFarmDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleUpdateAgeClick = async () => {
    try {
      const response = await fetch('/api/update-pig-current-age', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        setAlert({ show: true, type: 'success', message: data.message });

        // Hide the success alert after 3 seconds
        setTimeout(() => {
          setAlert({ show: false, type: '', message: '' });
        }, 3000);
      } else {
        setAlert({ show: true, type: 'danger', message: data.message });

        // Hide the error alert after 3 seconds
        setTimeout(() => {
          setAlert({ show: false, type: '', message: '' });
        }, 3000);
      }
    } catch (error) {
      console.error('Error updating age:', error);
      setAlert({ show: true, type: 'danger', message: 'Internal Server Error. Please try again later.' });

      // Hide the error alert after 3 seconds
      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 3000);
    }
  }

  return (
    <Container fluid className="dashboard-container">
      <Row className="header">
        <Col className="text-center">
          <h1>
            Welcome to The Pig Farm Dashboard,{' '}
            {currentUser ? (
              <span className="current-user">{currentUser.userName}</span>
            ) : (
              'Guest'
            )}
          </h1>
          <p>Track All The Activities Here</p>
        </Col>
      </Row>

      <Row className="features">
        <Col md={4} className="feature">
          <Link to="/pig-stock-tracking" className="card-link">
            <FaPiggyBank className="icon" />
            <h3 className="card-title">Track Stock</h3>
            <p className="card-description">Keep track of your pig stocks with ease. Monitor health, weight, and breeding status.</p>
          </Link>
        </Col>
        <Col md={4} className="feature">
          <Link to="/some-other-path" className="card-link">
            <FaCalendar className="icon" />
            <h3 className="card-title">Manage Events</h3>
            <p className="card-description">Schedule and manage important events on your farm. Track vaccinations, feedings, and births.</p>
          </Link>
        </Col>
        <Col md={4} className="feature">
          <Link to="/pig-farm-reports" className="card-link">
            <FaFileAlt className="icon" />
            <h3 className="card-title">Generate Reports</h3>
            <p className="card-description">Generate detailed reports for better decision-making. Analyze growth patterns and expenses.</p>
          </Link>
        </Col>
      </Row>

      <Row className="cta">
      <Col className="text-center">
  <h2 className="blinking-text">Ready to get started?</h2>
  <Button variant="primary" onClick={handleUpdateAgeClick}>
    Update Age Of Pigs
  </Button>
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

export default PigFarmDashboard;
