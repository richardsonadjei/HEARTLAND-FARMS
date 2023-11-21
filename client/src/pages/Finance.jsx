import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Finance = () => {
  const { currentUser } = useSelector((state) => state.user);

  // Check if the user has the 'admin' role
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

// Run the function every minute
useEffect(() => {
  const intervalId = setInterval(handleUpdateAgeClick, 60 * 1000); // 60 seconds * 1000 milliseconds

  // Clean up the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []);


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Finance Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-light" href="/stock-tracking">
               Feed Expense
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#feed-management">
                Structure Expense
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#medication-management">
                Farm Equipment and Logistics
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#egg-management">
                Pay And Allowances
              </a>
            </li>
           
            {isAdmin && (
              <li className="nav-item">
                <a className="nav-link text-light" href="/poultry-report">
                  Expenditure Reports
                </a>
              </li>
            )}
          
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
                <div className="card mb-4" id="feed-expenses">
                  <div className="card-body">
                    <h3 className="card-title">Feed Expenses</h3>
                    <p className="card-text">
                      Quick Links
                    </p>
                    <div className="mb-4">
                    <Link to="/purchase-feed">
                        <button className="btn btn-primary mb-2 me-2">Purchase Feed</button>
                      </Link>
                      <Link to="/create-supplier">
                        <button className="btn btn-primary me-2 mb-2">Create A Supplier</button>
                      </Link>
                      <Link to="/all-batches">
                        <button className="btn btn-primary me-2 mb-2">View All Suppliers</button>
                      </Link>
                      <Link to="#">
        <button className="btn btn-primary me-2 mb-2" onClick={handleUpdateAgeClick}>
          Manufacture Feed
        </button>
      </Link>
                      
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4" id="structure-expenses">
                  <div className="card-body">
                    <h3 className="card-title">Structure Expenses</h3>
                    <p className="card-text">
                      Some description about feed management.
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
                    <h3 className="card-title">Medication and Health Management</h3>
                    <p className="card-text">
                      Some description about medication and health management.
                    </p>
                    <button className="btn btn-primary">Go to Medication Subsection</button>
                    {/* Additional buttons or content for medication and health management */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4" id="egg-management">
                  <div className="card-body">
                    <h3 className="card-title">Egg Management</h3>
                    <p className="card-text">
                      Some description about egg management.
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
                    <h3 className="card-title">Sales and Distribution</h3>
                    <p className="card-text">
                      Some description about sales and distribution.
                    </p>
                    <button className="btn btn-primary">Go to Sales Subsection</button>
                    {/* Additional buttons or content for sales and distribution */}
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="col-md-6">
                  <div className="card mb-4" id="reporting-analytics">
                    <div className="card-body">
                      <h3 className="card-title">Reporting and Analytics</h3>
                      <p className="card-text">
                        Some description about reporting and analytics.
                      </p>
                      <Link to="/reporting-subsection">
                        <button className="btn btn-primary">Go to Reporting Subsection</button>
                      </Link>
                      {/* Additional buttons or content for reporting and analytics */}
                    </div>
                  </div>
                </div>
              )}
              <div className="col-md-6">
                <div className="card mb-4" id="reporting-analytics">
                  <div className="card-body">
                    <h3 className="card-title">Mortality</h3>
                    <p className="card-text">
                      Mortality
                    </p>
                    <button className="btn btn-primary">Go to Reporting Subsection</button>
                    {/* Additional buttons or content for reporting and analytics */}
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

export default Finance;
