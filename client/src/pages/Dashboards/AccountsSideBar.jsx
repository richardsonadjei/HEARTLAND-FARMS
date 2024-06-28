import React, { useState } from 'react';
import { Nav, Offcanvas, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AccountsCustomSidebar = ({ setSelectedDashboard }) => {
  const [show, setShow] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to check if user has both "admin" and "finance" roles
  const hasAdminAndFinanceRoles = () => {
    return currentUser && currentUser.role.includes('admin') && currentUser.role.includes('finance');
  };

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
            {hasAdminAndFinanceRoles() && (
              <>
                <Nav.Link as={Link} to="/add-partners-contribution" onClick={() => { setSelectedDashboard('CashCrop'); handleClose(); }} className="custom-nav-link">
                  <i className="fas fa-handshake"></i> Record Partner's Contribution
                </Nav.Link>
                <Nav.Link as={Link} to="/add-sales" onClick={() => { setSelectedDashboard('CashCrop'); handleClose(); }} className="custom-nav-link">
                  <i className="fas fa-dollar-sign"></i> Record Sales Income
                </Nav.Link>
                <Nav.Link as={Link} to="/add-farm-expense" onClick={() => { setSelectedDashboard('Vegetables'); handleClose(); }} className="custom-nav-link">
                  <i className="fas fa-carrot"></i> Record Expenditures
                </Nav.Link>
              </>
            )}
            
            <Nav.Link as={Link} to="/financial-reports" onClick={() => { setSelectedDashboard('BirdsFarm'); handleClose(); }} className="custom-nav-link">
              <i className="fas fa-file-invoice-dollar"></i> Financial Reports
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AccountsCustomSidebar;
