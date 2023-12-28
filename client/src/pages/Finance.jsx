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
        <Link to="/poultry-dashboard" className="text-decoration-none">
            <h2 className="mt-3 mb-4">Finance</h2>
          </Link>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-light" href="/stock-tracking">
              Income
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#feed-management">
                Expenses
              </a>
            </li>

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
                    <h3 className="card-title">INCOME</h3>
                    <p className="card-text">
                      Some description about medication and health management.
                    </p>
                    <Link to="/sell-eggs">
                        <button className="btn btn-primary me-2 mb-2">Sell Eggs</button>
                      </Link>
                      <Link to="/sell birds-">
                        <button className="btn btn-primary me-2 mb-2">Sell Birds</button>
                      </Link>
                    {/* Additional buttons or content for medication and health management */}
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
