import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Medication = () => {
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    // Fetch the number of requests from the backend
    const fetchRequestCount = async () => {
      try {
        const response = await fetch('/api/view-medication-requests');
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
          <h2 className="mt-3 mb-4">Medication Management Dashboard</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/add-medication" className="nav-link text-light">
                Add Medication
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/update-vaccines" className="nav-link text-light">
                Update Medication
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-vaccines" className="nav-link text-light">
                View Vaccine Chart
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/view-by-age-range" className="nav-link text-light">
                View Chart By Age Range
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delete-medication" className="nav-link text-light">
                Delete Medication
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
                    <h3 className="card-title">Add Medication</h3>
                    <p className="card-text">
                      Add a new medication to the system.
                    </p>
                    <Link to="/add-medication">
                      <button className="btn btn-primary mb-2 me-2">Add Medication</button>
                    </Link>
                    {/* Additional buttons or content for adding medication */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Update Medication</h3>
                    <p className="card-text">
                      Update information for existing medications.
                    </p>
                    <Link to="/update-medication">
                      <button className="btn btn-primary mb-2 me-2">Update Medication</button>
                    </Link>
                    {/* Additional buttons or content for updating medication */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">View All Vaccine Chart</h3>
                    <p className="card-text">
                      View a list of vaccines for vaccination.
                    </p>
                    <Link to="/all-vaccines">
                      <button className="btn btn-primary">View All Medication</button>
                    </Link>
                    {/* Additional buttons or content for viewing all medication */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">View Medication By Age Range</h3>
                    <p className="card-text">
                      View medications based on age range criteria.
                    </p>
                    <Link to="/view-by-age-range">
                      <button className="btn btn-primary">View By Age Range</button>
                    </Link>
                    {/* Additional buttons or content for viewing medication by age range */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Delete Medication</h3>
                    <p className="card-text">
                      Delete medications from the system.
                    </p>
                    <Link to="/delete-medication">
                      <button className="btn btn-primary">Delete Medication</button>
                    </Link>
                    {/* Additional buttons or content for deleting medication */}
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

export default Medication;
