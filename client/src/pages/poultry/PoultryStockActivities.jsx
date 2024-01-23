import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaTruck,
  FaEdit,
  FaExchangeAlt,
  FaClipboardList,
  FaSkullCrossbones,
  FaEgg,
  FaPlus,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PoultryStockActivities = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Poultry Stock Activities</h1>
          <p>Record and manage various poultry stock-related activities</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col className="tracking-card">
          <Link to="/create-poultry" className="card-link">
            <FaTruck className="tracking-icon truck-icon" />
            <h3>Receive New Batch Of Birds</h3>
            <p>Record the arrival of new birds to your poultry farm.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/add-birds" className="card-link">
          <FaPlus className="tracking-icon edit-icon" />
            <h3>Add Birds To An Existing Stock</h3>
            <p>Add Birds To The Existing Quantity of A Particular Batch</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/update-batch" className="card-link">
            <FaEdit className="tracking-icon edit-icon" />
            <h3>Update Existing Stock</h3>
            <p>Modify the details of an existing batch of poultry stock.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/move-birds" className="card-link">
            <FaExchangeAlt className="tracking-icon relocate-icon" />
            <h3>Relocate Birds</h3>
            <p>Move birds from one location to another within the farm.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/take-stock" className="card-link">
            <FaClipboardList className="tracking-icon take-stock-icon" />
            <h3>Take Stock</h3>
            <p>Conduct a comprehensive stock-taking of all poultry birds.</p>
          </Link>
        </Col>
      </Row>
      <Row className="tracking-section">
        <Col className="tracking-card">
          <Link to="/bird-mortality" className="card-link">
            <FaSkullCrossbones className="tracking-icon mortality-icon" />
            <h3>Mortality</h3>
            <p>Record and manage instances of bird mortality in the poultry farm.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/egg-management-activities" className="card-link">
            <FaEgg className="tracking-icon egg-icon" />
            <h3>Egg Management</h3>
            <p>Track and manage egg production and related activities.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default PoultryStockActivities;
