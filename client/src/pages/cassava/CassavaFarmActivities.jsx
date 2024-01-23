import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  FaTractor,
  FaSeedling,
  FaFlask,
  FaPeopleCarry,
  FaSprayCan,
  FaHammer,
  FaCropAlt,
  FaBox,
  FaBug,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CassavaFarmActivities = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Cassava Farm Activities</h1>
          <p>Record and manage various cassava farming activities</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col xs={12} sm={6} lg={3} className="tracking-card">
          <Link to="/cassava-land-preparation" className="card-link">
            <FaTractor className="tracking-icon tractor-icon" />
            <h3>Land Preparation</h3>
            <p>Clear the land for cassava cultivation.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3} className="tracking-card">
          <Link to="/plant-cassava" className="card-link">
            <FaSeedling className="tracking-icon planting-icon" />
            <h3>Planting</h3>
            <p>Plant cassava seeds in prepared land.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3} className="tracking-card">
          <Link to="/cassava-fertilizer-application" className="card-link">
            <FaFlask className="tracking-icon fertilizer-icon" />
            <h3>Fertilizer Application</h3>
            <p>Apply fertilizers to promote cassava growth.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3} className="tracking-card">
          <Link to="/cassava-manual-weeding" className="card-link">
            <FaPeopleCarry className="tracking-icon weeding-icon" />
            <h3>Manual Weeding</h3>
            <p>Weed the cassava fields manually.</p>
          </Link>
        </Col>
      </Row>
      <Row className="tracking-section">
        <Col xs={12} sm={6} lg={3} className="tracking-card">
          <Link to="/cassava-weedicide-application" className="card-link">
            <FaSprayCan className="tracking-icon weedicide-icon" />
            <h3>Weedicide Application</h3>
            <p>Apply weedicide to control weed growth in cassava crops.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3} className="tracking-card">
          <Link to="/cassava-pest-disease-control" className="card-link">
            <FaBug className="tracking-icon pest-disease-icon" />
            <h3>Pest and Disease Control</h3>
            <p>Manage and control pests and diseases in cassava crops.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3} className="tracking-card">
          <Link to="/cassava-other-farm-activities" className="card-link">
            <FaHammer className="tracking-icon farm-activities-icon" />
            <h3>Other Farm Activities</h3>
            <p>Record miscellaneous farm activities related to cassava.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3} className="tracking-card">
          <Link to="/cassava-harvest" className="card-link">
            <FaCropAlt className="tracking-icon harvest-icon" />
            <h3>Harvest</h3>
            <p>Harvest matured cassava crops.</p>
          </Link>
        </Col>
        <Col xs={12} sm={6} lg={3} className="tracking-card">
          <Link to="/cassava-storage" className="card-link">
            <FaBox className="tracking-icon storage-icon" />
            <h3>Storage</h3>
            <p>Store harvested cassava properly.</p>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CassavaFarmActivities;
