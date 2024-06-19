import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); 

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  const renderBeforeStartDropdown = () => (
    <NavDropdown title="Startup Costs" id="startup-costs-dropdown" className="text-white font-weight-bold">
      <NavDropdown.Item as={Link} to="/before-expense">
        Add Startup Expense
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/all-before-expense">
        View Startup Expenses
      </NavDropdown.Item>
    </NavDropdown>
  );

  const renderHumanResourceDropdown = () => (
    <NavDropdown title="Human Resource" id="human-resource-dropdown" className="text-white font-weight-bold">
      <NavDropdown.Item as={Link} to="/hr">
        HR Home
      </NavDropdown.Item>
      {/* <NavDropdown.Item as={Link} to="/departments">
        Exployees
      </NavDropdown.Item>
      <NavDropdown.Item as={Link} to="/departments">
        PayRoll Management
      </NavDropdown.Item> */}
      {/* Add more HR related links as needed */}
    </NavDropdown>
  );

  const renderAuthLinks = () => (
    <>
      {currentUser ? (
        <>
          <Nav.Link as={Link} to="/profile" className="text-white font-weight-bold">
            <span>{currentUser.userName}</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/sign-out" className="text-white font-weight-bold">
            Sign Out
          </Nav.Link>
        </>
      ) : (
        <Nav.Link as={Link} to="/sign-in" className="text-white font-weight-bold">
          Sign In
        </Nav.Link>
      )}
    </>
  );

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Link to="/" className="logo-container">
          <Navbar.Brand className="logo d-flex align-items-center">
            <span className="logo-text">Heartland Farms</span>
          </Navbar.Brand>
        </Link>

        <div className="header-middle">
          <div className="current-date-time text-center">
            {currentDateTime.toLocaleDateString('en-GB', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="menu-items justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/" className="text-white font-weight-bold">
              Home
            </Nav.Link>
            {renderBeforeStartDropdown()}
            {renderHumanResourceDropdown()} {/* Render Human Resource dropdown */}
            {renderAuthLinks()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
