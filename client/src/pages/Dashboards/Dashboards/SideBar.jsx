import React, { useState } from 'react';
import { Nav, Offcanvas, Button } from 'react-bootstrap';

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
          <Nav defaultActiveKey="/cash-crop" className="flex-column custom-nav-links">
            <Nav.Link onClick={() => { setSelectedDashboard('CashCrop'); handleClose(); }} className="custom-nav-link">
              <i className="fas fa-leaf"></i> Cash Crops
            </Nav.Link>
            <Nav.Link onClick={() => { setSelectedDashboard('Vegetables'); handleClose(); }} className="custom-nav-link">
              <i className="fas fa-carrot"></i> Vegetables
            </Nav.Link>
            <Nav.Link onClick={() => { setSelectedDashboard('AnimalFarm'); handleClose(); }} className="custom-nav-link">
              <i className="fas fa-cow"></i> Animal Farm
            </Nav.Link>
            <Nav.Link onClick={() => { setSelectedDashboard('BirdsFarm'); handleClose(); }} className="custom-nav-link">
              <i className="fas fa-dove"></i> Birds Farm
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CustomSidebar;
