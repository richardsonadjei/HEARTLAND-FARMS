import React from 'react';

const Poultry = () => {
  const containerStyle = {
    background: `url("/images/IMG_1485.jpg") no-repeat center center fixed`,
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    padding: '20px',
  };

  const buttonStyle = {
    fontSize: '1.5rem',
  };

  return (
    <div style={containerStyle}>
      <h1 className="text-uppercase">Poultry Software for Heartland Farms</h1>
      <h2>An All In One System For All Poultry Farm Management</h2>
     
      <div className="button-group">
        <a href="/poultry-dashboard" className="btn btn-primary" style={buttonStyle}>
          Get Started
        </a>
      </div>
    </div>
  );
};

export default Poultry;
