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
    }, 60000); // Update currentDateTime every minute

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Function to check if user has both "admin" and "finance" roles
  const hasAdminAndFinanceRoles = () => {
    return currentUser && currentUser.role.includes('admin') && currentUser.role.includes('finance');
  };

  // Function to render Human Resource dropdown based on user roles
  const renderHumanResourceDropdown = () => {
    if (currentUser && (currentUser.role.includes('admin') || currentUser.role.includes('finance') || currentUser.role.includes('human-resource') || hasAdminAndFinanceRoles())) {
      return (
        <NavDropdown title="Human Resource" id="human-resource-dropdown" className="text-white font-weight-bold">
          <NavDropdown.Item as={Link} to="/hr">
            HR Home
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to="/sign-up">
            New Employee
          </NavDropdown.Item>
          {/* Add more HR related links as needed */}
        </NavDropdown>
      );
    }
    return null; // Render nothing if the user is not admin, finance, human-resource, or has both admin and finance
  };

  // Function to render authentication links based on user authentication state and role
  const renderAuthLinks = () => (
    <>
      {currentUser ? (
        <>
          {!currentUser.role.includes('employee') && (
            <>
              <Nav.Link as={Link} to="/dashboard" className="text-white font-weight-bold">
                Farms Dashboard
              </Nav.Link>
              <Nav.Link as={Link} to="/accounts" className="text-white font-weight-bold">
                Accounts
              </Nav.Link>
            </>
          )}
          <Nav.Link as={Link} to="/user-update" className="text-white font-weight-bold">
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

        <Navbar.Toggle aria-controls="basic-navbar-nav" className="custom-navbar-toggler" />
        <Navbar.Collapse id="basic-navbar-nav" className="menu-items justify-content-end">
          <Nav>
            <Nav.Link as={Link} to="/" className="text-white font-weight-bold">
              Home
            </Nav.Link>
            {renderHumanResourceDropdown()} {/* Render Human Resource dropdown */}
            {renderAuthLinks()} {/* Render authentication links */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
