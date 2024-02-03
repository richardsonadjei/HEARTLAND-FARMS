import React from 'react';
import { Link } from 'react-router-dom';
import { FaBuilding, FaMoneyBill, FaTruck, FaCog } from 'react-icons/fa';


const Settings = () => {
  return (
    <div className="container-fluid settings-container">
      <div className="row">
        <div className="col-md-3 bg-dark text-light sidebar">
          <h2 className="mt-3 mb-4">Settings Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/farm-settings" className="nav-link text-light">
                <FaBuilding className="me-2" />
                Farm Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/financial-settings" className="nav-link text-light">
                <FaMoneyBill className="me-2" />
                Financial Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/suppliers-settings" className="nav-link text-light">
                <FaTruck className="me-2" />
                Suppliers Settings
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/others-settings" className="nav-link text-light">
                <FaCog className="me-2" />
                Others
              </Link>
            </li>
            {/* Additional dashboard items */}
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4 custom-card">
                  <div className="card-body">
                    <h3 className="card-title">Farm Settings</h3>
                    <p className="card-text">
                      Configure farm-related settings and preferences.
                    </p>
                    <Link to="/farm-settings">
                      <button className="btn btn-primary mb-2 me-2">Farm Settings</button>
                    </Link>
                    <Link to="/manage-farm-employees">
                      <button className="btn btn-primary me-2 mb-2">Manage Farm Employees</button>
                    </Link>
                    {/* Additional buttons or content for farm settings */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 custom-card">
                  <div className="card-body">
                    <h3 className="card-title">Financial Settings</h3>
                    <p className="card-text">
                      Configure financial settings and manage transactions.
                    </p>
                    <Link to="/financial-settings">
                      <button className="btn btn-primary">Financial Settings</button>
                    </Link>
                    {/* Additional buttons or content for financial settings */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 custom-card">
                  <div className="card-body">
                    <h3 className="card-title">Suppliers Settings</h3>
                    <p className="card-text">
                      Manage suppliers and related settings.
                    </p>
                    <Link to="/suppliers-settings">
                      <button className="btn btn-primary">Suppliers Settings</button>
                    </Link>
                    {/* Additional buttons or content for suppliers settings */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4 custom-card">
                  <div className="card-body">
                    <h3 className="card-title">Others</h3>
                    <p className="card-text">
                      Additional settings and configurations.
                    </p>
                    <Link to="/others-settings">
                      <button className="btn btn-primary">Others Settings</button>
                    </Link>
                    {/* Additional buttons or content for others settings */}
                  </div>
                  
                </div>
                
              </div>
              {/* Additional cards for other dashboard items */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
