import React from 'react';
import { Link } from 'react-router-dom';

const PoultryReport = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Poultry Reports </h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-light" href="/stock-reports">Stocks Reports</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#feed-management">Egg Reports</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/financial-reports">Financial Reports</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#egg-management">Egg Management Report</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#sales-distribution">Sales and Distribution Report</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#reporting-analytics">Mortality Reports</a>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4" id="stock-tracking">
                  <div className="card-body">
                    <h3 className="card-title">Stock Reports</h3>
                    <p className="card-text">
                      QUICK BUTTONS
                    </p>
                    <div className="mb-2">
                      <Link to="/receive-birds">
                        <button className="btn btn-primary me-2">Birds Received Report</button>
                      </Link>
                      <Link to="/all-batches">
                        <button className="btn btn-primary me-2">View All Batches</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4" id="feed-management">
                  <div className="card-body">
                    <h3 className="card-title">Feed Management Report</h3>
                    <p className="card-text">
                      Quick Links
                    </p>
                    <button className="btn btn-primary">Go to Feed Subsection</button>
                    {/* Additional buttons or content for feed management */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4" id="medication-management">
                  <div className="card-body">
                    <h3 className="card-title">Medication and Health Management Report</h3>
                    <p className="card-text">
                      Quick Links
                    </p>
                    <button className="btn btn-primary">Go to Medication Subsection</button>
                    {/* Additional buttons or content for medication and health management */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4" id="egg-management">
                  <div className="card-body">
                    <h3 className="card-title">Egg Management Report</h3>
                    <p className="card-text">
                      Quick Links
                    </p>
                    <button className="btn btn-primary">Go to Egg Subsection</button>
                    {/* Additional buttons or content for egg management */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4" id="sales-distribution">
                  <div className="card-body">
                    <h3 className="card-title">Sales and Distribution Report</h3>
                    <p className="card-text">
                      Quick Links
                    </p>
                    <button className="btn btn-primary">Go to Sales Subsection</button>
                    {/* Additional buttons or content for sales and distribution */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4" id="reporting-analytics">
                  <div className="card-body">
                    <h3 className="card-title">Mortality Report</h3>
                    <p className="card-text">
                      Quick Links
                    </p>
                    <button className="btn btn-primary">Go to Reporting Subsection</button>
                    {/* Additional buttons or content for reporting and analytics */}
                  </div>
                </div>
              </div>
              
              <div className="col-md-6">
                <div className="card mb-4" id="financial-reports">
                  <div className="card-body">
                    <h3 className="card-title">Financial Reports</h3>
                    <p className="card-text">
                      QUICK BUTTONS
                    </p>
                    <div className="mb-2">
                      <Link to="/feed-transactions">
                        <button className="btn btn-primary me-2">Generate Feed Purchase Report</button>
                      </Link>
                      <Link to="#">
                        <button className="btn btn-primary me-2">Later</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoultryReport;
