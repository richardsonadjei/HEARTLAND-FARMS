import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PoultryDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role === 'admin';

  const handleUpdateAgeClick = async () => {
    try {
      const response = await fetch('/api/update-current-age');
      const data = await response.json();
    } catch (error) {
      console.error('Error updating age:', error);
      alert('Internal Server Error. Please try again later.');
    }
  };

  useEffect(() => {
    const intervalId = setInterval(handleUpdateAgeClick, 24 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Poultry Farm Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-light" href="/stock-tracking">
                Stock Tracking
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/feed-management">
                Feed Management
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/medication">
                Medication and Health Management
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#egg-management">
                Egg Management
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#sales-distribution">
                Sales and Distribution
              </a>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <a className="nav-link text-light" href="/poultry-report">
                  Reporting and Analytics
                </a>
              </li>
            )}
            {isAdmin && (
              <li className="nav-item">
                <a className="nav-link text-light" href="/finance">
                  Finance
                </a>
              </li>
            )}
            <li className="nav-item">
              <a className="nav-link text-light" href="#reporting-analytics">
                Mortality
              </a>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <a className="nav-link text-light" href="/extras">
                  Extras
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4" id="stock-tracking">
                  <div className="card-body">
                    <h3 className="card-title">Stock Tracking</h3>
                    <p className="card-text">Quick Links</p>
                    <div className="mb-4">
                      <Link to="/create-poultry">
                        <button className="btn btn-primary mb-2 me-2">Add New Stock</button>
                      </Link>
                      <Link to="/update-batch">
                        <button className="btn btn-primary me-2 mb-2">Update Batch Stock</button>
                      </Link>
                      <Link to="/all-batches">
                        <button className="btn btn-primary me-2 mb-2">View All Stock</button>
                      </Link>
                      <Link to="#">
                        <button className="btn btn-primary me-2 mb-2" onClick={handleUpdateAgeClick}>
                          Update Age
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4" id="feed-management">
                  <div className="card-body">
                    <h3 className="card-title">Feed Management</h3>
                    <p className="card-text">Some description about feed management.</p>
                    <button className="btn btn-primary">Go to Feed Subsection</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4" id="medication-management">
                  <div className="card-body">
                    <h3 className="card-title">Medication and Health Management</h3>
                    <p className="card-text">Some description about medication and health management.</p>
                    <button className="btn btn-primary">Go to Medication Subsection</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4" id="egg-management">
                  <div className="card-body">
                    <h3 className="card-title">Egg Management</h3>
                    <p className="card-text">Some description about egg management.</p>
                    <button className="btn btn-primary">Go to Egg Subsection</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4" id="sales-distribution">
                  <div className="card-body">
                    <h3 className="card-title">Sales and Distribution</h3>
                    <p className="card-text">Some description about sales and distribution.</p>
                    <button className="btn btn-primary">Go to Sales Subsection</button>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="col-md-6">
                  <div className="card mb-4" id="reporting-analytics">
                    <div className="card-body">
                      <h3 className="card-title">Reporting and Analytics</h3>
                      <p className="card-text">Some description about reporting and analytics.</p>
                      <Link to="/reporting-subsection">
                        <button className="btn btn-primary">Go to Reporting Subsection</button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4" id="mortality">
                  <div className="card-body">
                    <h3 className="card-title">Mortality</h3>
                    <p className="card-text">Mortality</p>
                    <button className="btn btn-primary">
                      Go to Reporting Subsection
                    </button>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="col-md-6">
                  <div className="card mb-4" id="finance">
                    <div className="card-body">
                      <h3 className="card-title">Finance</h3>
                      <p className="card-text">Some description about finance.</p>
                      <button className="btn btn-primary">
                        Go to Finance Subsection
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoultryDashboard;