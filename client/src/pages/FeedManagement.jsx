import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeedManagement = () => {
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // Fetch the number of requests from the backend
    const fetchRequestCount = async () => {
      try {
        const response = await fetch('/api/view-feed-requests');
        const data = await response.json();
        setRequestCount(data.data.length); // Assuming the data returned is an array of requests
      } catch (error) {
        console.error('Error fetching request count:', error);
      }
    };

    fetchRequestCount();
  }, []);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Feed Management Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/purchase-feed" className="nav-link text-light">
                Purchase Feed
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/log-feed-usage" className="nav-link text-light">
                Log Feed Usage
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/view-all-feed-stock" className="nav-link text-light">
                View Stock Of Feeds
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/request-feed-approvals" className="nav-link text-light">
                Feed Requests And Approvals
                {requestCount > 0 && (
                  <span className="badge bg-warning ms-2">{requestCount}</span>
                )}
              </Link>
            </li>
            {/* Additional dashboard items */}
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Purchase Feed</h3>
                    <p className="card-text">
                      Quick Links
                    </p>
                    <Link to="/purchase-feed">
                      <button className="btn btn-primary mb-2 me-2">Purchase Feed</button>
                    </Link>
                    <Link to="/search-feed-name">
                      <button className="btn btn-primary me-2 mb-2">Search For  Feed</button>
                    </Link>
                    {/* Additional buttons or content for purchase feed */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Log Feed Usage</h3>
                    <p className="card-text">
                      Some description about logging feed usage.
                    </p>
                    <Link to="/log-feed-usage">
                      <button className="btn btn-primary">Go to Log Feed Usage</button>
                    </Link>
                    {/* Additional buttons or content for log feed usage */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">View Stock Of Feeds</h3>
                    <p className="card-text">
                      Some description about viewing stock of feeds.
                    </p>
                    <Link to="/view-all-feed-stock">
                      <button className="btn btn-primary">Go to View Stock</button>
                    </Link>
                    {/* Additional buttons or content for viewing stock of feeds */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Request For Feed</h3>
                    <p className="card-text">
                      Request For Feed To Use.
                    </p>
                    <Link to="/request-feed">
                      <button className="btn btn-primary">Request</button>
                    </Link>
                    {/* Additional buttons or content for viewing stock of feeds */}
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

export default FeedManagement;
