import React from 'react';

const Poultry = () => {
  const backgroundStyle = {
    backgroundColor: '#363062',
    // Add any other styling properties as needed
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6" >
          <div className="poultry-content-container" style={backgroundStyle}>
            <h1 className="text-uppercase">Poultry software for Heartland Farms</h1>
            <h2>An All In One System For All Poultry Farm Management</h2>
            <p className="lead">
              This poultry management system offers you a software package that provides insight into all relevant data within your poultry business or poultry integration. Whether you are just a part of the entire poultry chain or a fully integrated poultry company, PoultryPlan has the tools and expertise you need to succeed in today's competitive market.
            </p>
            <div className="button-group">
              <div className="link-button-container">
                <div className="link-button-background inverse-hard green"></div>
                <a href="/poultry-dashboard" className="link-button btn btn-primary">Get Started</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="image-container my-auto">
            <img
              src="/images/IMG_1485.jpg"
              alt="PoultryPlan Hero"
              className="img-fluid rounded custom-image-height" // Adjust the height here
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Poultry;
