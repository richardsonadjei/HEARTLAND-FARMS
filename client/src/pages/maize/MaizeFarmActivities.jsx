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

const MaizeFarmActivities = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Maize Farm Activities</h1>
          <p>Record and manage various maize farming activities</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col className="tracking-card">
          <Link to="/maize-land-clearance" className="card-link">
            <FaTractor className="tracking-icon tractor-icon" />
            <h3>Land Preparation</h3>
            <p>Clear the land for maize cultivation.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/plant-maize" className="card-link">
            <FaSeedling className="tracking-icon planting-icon" />
            <h3>Planting</h3>
            <p>Plant maize seeds in prepared land.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/maize-fertilizer-application" className="card-link">
            <FaFlask className="tracking-icon fertilizer-icon" />
            <h3>Fertilizer Application</h3>
            <p>Apply fertilizers to promote maize growth.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/maize-manual-weeding" className="card-link">
            <FaPeopleCarry className="tracking-icon weeding-icon" />
            <h3>Manual Weeding</h3>
            <p>Weed the maize fields manually.</p>
          </Link>
        </Col>
      </Row>
      <Row className="tracking-section">
        <Col className="tracking-card">
          <Link to="/maize-weedicide-application" className="card-link">
            <FaSprayCan className="tracking-icon weedicide-icon" />
            <h3>Weedicide Application</h3>
            <p>Apply weedicide to control weed growth.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
        <Link to="/pest-disease-control" className="card-link">
            <FaBug className="tracking-icon pest-disease-icon" />
            <h3>Pest and Disease Control</h3>
            <p>Manage and control pests and diseases in maize crops.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/other-farm-activities" className="card-link">
            <FaHammer className="tracking-icon farm-activities-icon" />
            <h3>Other Farm Activities</h3>
            <p>Record miscellaneous farm activities.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/maize-harvest" className="card-link">
            <FaCropAlt className="tracking-icon harvest-icon" />
            <h3>Harvest</h3>
            <p>Harvest matured maize crops.</p>
          </Link>
        </Col>
        <Col className="tracking-card">
          <Link to="/storage" className="card-link">
            <FaBox className="tracking-icon storage-icon" />
            <h3>Storage</h3>
            <p>Store harvested maize properly.</p>
          </Link>
        </Col>
       
        
      </Row>
    </Container>
  );
};

export default MaizeFarmActivities;
