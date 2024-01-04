import React from 'react';
import { Link } from 'react-router-dom';

const GuineaFowlReportDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Guinea Fowl Reports</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/stock-reports" className="nav-link text-light">
                Stocks Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/egg-reports" className="nav-link text-light">
                Egg Management Report
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/guinea-fowl-financial-reports" className="nav-link text-light">
                Financial Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sales-distribution-reports" className="nav-link text-light">
                Sales and Distribution Report
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/batch-treatment-report" className="nav-link text-light">
                Treatment Reports
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/mortality-reports" className="nav-link text-light">
                Mortality Reports
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            {/* Row 1 */}
            <div className="row">
              {/* Stock Reports Card */}
              <div className="col-md-6 mb-4">
                <div className="card stock-tracking-card">
                  <div className="card-body">
                    <h3 className="card-title">Stock Reports</h3>
                    <p className="card-text">QUICK BUTTONS</p>
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

              {/* Feed Management Report Card */}
              <div className="col-md-6 mb-4">
                <div className="card feed-management-card">
                  <div className="card-body">
                    <h3 className="card-title">Feed Management Report</h3>
                    <p className="card-text">Quick Links</p>
                    <button className="btn btn-primary">Go to Feed Subsection</button>
                    {/* Additional buttons or content for feed management */}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row">
              {/* Medication and Health Management Report Card */}
              <div className="col-md-6 mb-4">
                <div className="card medication-management-card">
                  <div className="card-body">
                    <h3 className="card-title">Medication and Health Management Report</h3>
                    <p className="card-text">Quick Links</p>
                    <button className="btn btn-primary">Go to Medication Subsection</button>
                    {/* Additional buttons or content for medication and health management */}
                  </div>
                </div>
              </div>

              {/* Sales and Distribution Report Card */}
              <div className="col-md-6 mb-4">
                <div className="card sales-distribution-card">
                  <div className="card-body">
                    <h3 className="card-title">Sales and Distribution Report</h3>
                    <p className="card-text">Quick Links</p>
                    <button className="btn btn-primary">Go to Sales Subsection</button>
                    {/* Additional buttons or content for sales and distribution */}
                  </div>
                </div>
              </div>
            </div>

            {/* Row 3 */}
            <div className="row">
              {/* Mortality Report Card */}
              <div className="col-md-6 mb-4">
                <div className="card mortality-report-card">
                  <div className="card-body">
                    <h3 className="card-title">Mortality Report</h3>
                    <p className="card-text">Quick Links</p>
                    <Link to="/all-batches-mortality-report">
                      <button className="btn btn-primary me-2">All Batches Mortality Report</button>
                    </Link>
                    <Link to="/batch-mortality-report">
                      <button className="btn btn-primary me-2">Batch Mortality Report</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Financial Reports Card */}
              <div className="col-md-6 mb-4">
                <div className="card financial-reports-card">
                  <div className="card-body">
                    <h3 className="card-title">Financial Reports</h3>
                    <p className="card-text">QUICK BUTTONS</p>
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

            {/* Row 4 */}
            <div className="row">
              {/* Health Reports Card */}
              <div className="col-md-6 mb-4">
                <div className="card health-reports-card">
                  <div className="card-body">
                    <h3 className="card-title">Health Reports</h3>
                    <p className="card-text">Treatment Histories</p>
                    <div className="mb-2">
                      <Link to="/batch-treatment-report">
                        <button className="btn btn-primary me-2">Batch Treatment History</button>
                      </Link>
                      <Link to="#">
                        <button className="btn btn-primary me-2">Vaccination Report</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Egg Management Report Card */}
              <div className="col-md-6 mb-4">
                <div className="card egg-management-card">
                  <div className="card-body">
                    <h3 className="card-title">Egg Management Report</h3>
                    <p className="card-text">Quick Links</p>
                    <Link to="/egg-reports">
                      <button className="btn btn-primary me-2 mb-2">Sorted Eggs Report</button>
                    </Link>
                    <Link to="/egg-reports">
                      <button className="btn btn-primary me-2 mb-2">Unsorted Eggs Report</button>
                    </Link>
                    {/* Additional buttons or content for egg management */}
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

export default GuineaFowlReportDashboard;
