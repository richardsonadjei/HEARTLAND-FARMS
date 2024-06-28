import React, { useState } from 'react';
import { Nav, Offcanvas, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const CustomSidebar = ({ setSelectedDashboard }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div>
        <Button variant="primary" onClick={handleShow}>
          <i className="fas fa-bars"></i>
        </Button>
      </div>

      <Offcanvas show={show} onHide={handleClose} className="custom-offcanvas">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav defaultActiveKey="/birds-farm-dashboard" className="flex-column custom-nav-links">
            <Nav.Link as={Link} to="/cash-crop-dashboard" onClick={() => { setSelectedDashboard('CashCrop'); handleClose(); }} className="custom-nav-link">
              <i className="fas fa-leaf"></i> Cash Crops
            </Nav.Link>
            <Nav.Link as={Link} to="/vegetables-dashboard" onClick={() => { setSelectedDashboard('Vegetables'); handleClose(); }} className="custom-nav-link">
              <i className="fas fa-carrot"></i> Vegetables
            </Nav.Link>
            <Nav.Link as={Link} to="/animal-farm-dashboard" onClick={() => { setSelectedDashboard('AnimalFarm'); handleClose(); }} className="custom-nav-link">
              <i className="fas fa-cow"></i> Animal Farm
            </Nav.Link>
            <Nav.Link as={Link} to="/birds-farm-dashboard" onClick={() => { setSelectedDashboard('BirdsFarm'); handleClose(); }} className="custom-nav-link">
              <i className="fas fa-dove"></i> Birds Farm
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomSidebar;
