import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaEgg, FaUtensils, FaMedkit, FaMoneyBill, FaFileAlt } from 'react-icons/fa';  // Added FaMedkit icon
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const PoultryGettingStarted = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const handleUpdateAgeClick = async () => {
    try {
      const response = await fetch('/api/update-current-age');
      const data = await response.json();
      setAlert({ show: true, type: 'success', message: data.message });

      // Hide the success alert after 3 seconds
      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 3000);
    } catch (error) {
      console.error('Error updating age:', error);
      setAlert({ show: true, type: 'danger', message: 'Internal Server Error. Please try again later.' });

      // Hide the error alert after 3 seconds
      setTimeout(() => {
        setAlert({ show: false, type: '', message: '' });
      }, 3000);
    }
  };

  return (
    <div className="poultry-background " >
      <Container fluid className="dashboard-container" style={{ backgroundColor: 'navy' }}>
        <Row className="header">
          <Col className="text-center">
            <h1>
              Welcome to The Poultry Farm Dashboard,{' '}
              {currentUser ? (
                <span className="current-user">{currentUser.userName}</span>
              ) : (
                'Guest'
              )}
            </h1>
            <p>Get Started with Poultry Farming</p>
          </Col>
        </Row>
        {/* Alert */}
        {alert.show && (
  <Alert variant={alert.type} className="mt-3 text-center font-weight-bold">
    {alert.message}
  </Alert>
)}


        <Row className="features">
          <Col md={3} className="feature">
            <Link to="/poultry-stock-activities" className="card-link">
              <FaEgg className="icon" />
              <h3 className="card-title">Stock Tracking</h3>
              <p className="card-description">Monitor and manage your poultry stock. Track egg production and inventory.</p>
            </Link>
          </Col>
          <Col md={3} className="feature">
            <Link to="/feed-health-management" className="card-link">
              <FaUtensils className="icon" />
              <h3 className="card-title">Feeding and Medication Management</h3> {/* Updated title */}
              <p className="card-description">Record feeding schedules and manage poultry nutrition, including medication.</p> {/* Updated description */}
            </Link>
          </Col>
          <Col md={3} className="feature">
            <Link to="/poultry-financial-activities" className="card-link">
              <FaMoneyBill className="icon" />
              <h3 className="card-title">Finance</h3>
              <p className="card-description">Keep track of financial transactions related to poultry farming. Record expenses and income.</p>
            </Link>
          </Col>
          <Col md={3} className="feature">
            <Link to="/poultry-report-dashboard" className="card-link">
              <FaFileAlt className="icon" />
              <h3 className="card-title">Generate Reports</h3>
              <p className="card-description">Generate detailed reports for better decision-making. Analyze poultry performance and expenses.</p>
            </Link>
          </Col>
        </Row>

        <Row className="cta">
          <Col className="text-center">
            <h2 className="blinking-text">Ready To Start Work?</h2>
            <Button variant="success" onClick={handleUpdateAgeClick}>
              Update Age
            </Button>

            
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PoultryGettingStarted;
