import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaSyringe, FaNotesMedical, FaBriefcaseMedical, FaCapsules } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const VaccinationAndTreatment = () => {
  return (
    <Container fluid>
      <Row className="tracking-header">
        <Col className="text-center">
          <h1>Vaccination and Treatment</h1>
          <p>Record and manage various events related to bird health</p>
        </Col>
      </Row>

      <Row className="tracking-section">
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/iron-treatment" className="card-link">
            <div className="tracking-card iron-treatment-card">
              <FaSyringe className="tracking-icon iron-treatment-icon" />
              <h3>Iron Treatment</h3>
              <p>Administer iron treatment to birds for health improvement.</p>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/iron-treatment" className="card-link">
            <div className="tracking-card iron-treatment-card">
              <FaSyringe className="tracking-icon iron-treatment-icon" />
              <h3>Other Routine Treatment</h3>
              <p>Examples Include Deworming, Multivitamin Administration etc.</p>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/record-sick-birds" className="card-link">
            <div className="tracking-card sick-birds-card">
              <FaNotesMedical className="tracking-icon sick-birds-icon" />
              <h3>Record Sick Pigs</h3>
              <p>Document cases of bird illness for proper monitoring.</p>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/treat-sick-birds" className="card-link">
            <div className="tracking-card treat-birds-card">
              <FaBriefcaseMedical className="tracking-icon treat-birds-icon" />
              <h3>Treat Sick Pigs</h3>
              <p>Administer appropriate treatment to sick birds for recovery.</p>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/medication-purchase" className="card-link">
            <div className="tracking-card medication-purchase-card">
              <FaCapsules className="tracking-icon medication-purchase-icon" />
              <h3>Medication Purchase</h3>
              <p>Record and manage purchases of pig medications.</p>
            </div>
          </Link>
        </Col>
        <Col xs={12} md={6} lg={4} className="mb-3">
          <Link to="/add-pig-drugs" className="card-link">
            <div className="tracking-card vaccination-card">
              <FaSyringe className="tracking-icon vaccination-icon" />
              <h3>Add New Drug</h3>
              <p>Add New Medicine To Drugs Catalogue</p>
            </div>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default VaccinationAndTreatment;
