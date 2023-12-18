import React from 'react';
import { Link } from 'react-router-dom';

const Medication = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Medication Management Dashboard</h2>
          <ul className="nav flex-column">
            {/* Navigation links without request count */}
            <li className="nav-item">
              <Link to="/add-vaccine" className="nav-link text-light">
                Add Vaccine
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/record-vaccination" className="nav-link text-light">
                Record Vaccination
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/view-by-age-range" className="nav-link text-light">
                View Chart By Age Range
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/is-birds" className="nav-link text-light">
               Health Status
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delete-medication" className="nav-link text-light">
                Delete Medication
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-drug" className="nav-link text-light">
                View And Update Drugs
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/create-medication-category" className="nav-link text-light">
                Add Medication Category
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/all-medication-category" className="nav-link text-light">
                View All Medication Category
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
                    <h3 className="card-title">Add Drugs/Vaccine</h3>
                    <p className="card-text">
                      Add a new Vaccine to the system.
                    </p>
                    <Link to="/add-drug">
                      <button className="btn btn-primary mb-2 me-2">Add </button>
                    </Link>
                    {/* Additional buttons or content for adding medication */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Add Vaccine To Vaccination Cycle</h3>
                    <p className="card-text">
                      Add 
                    </p>
                    <Link to="/add-vaccine">
                      <button className="btn btn-primary mb-2 me-2">Add </button>
                    </Link>
                    {/* Additional buttons or content for adding medication */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">All Drugs</h3>
                    <p className="card-text">
                      All Drugs And Vaccines
                    </p>
                    <Link to="/all-drug">
                      <button className="btn btn-primary mb-2 me-2">All Drugs </button>
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
                    <h3 className="card-title">View Vaccine By Age Range</h3>
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
                    <h3 className="card-title">Deworming</h3>
                    <p className="card-text">
                      Deworm Birds
                    </p>
                    <Link to="/deworm-birds">
                      <button className="btn btn-primary me-2">Deworm</button>
                    </Link>
                    <Link to="/batch-deworming-history">
                      <button className="btn btn-primary me-2">Batch History</button>
                    </Link>
                    {/* Additional buttons or content for viewing medication by age range */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Treatment Records</h3>
                    <p className="card-text">
                     View History Of Vaccinations And Deworming
                    </p>
                    <Link to="/batch-vaccination-history">
                      <button className="btn btn-primary me-2">Vaccination</button>
                    </Link>
                    <Link to="/deworming-history">
                      <button className="btn btn-primary me-2">Deworming</button>
                    </Link>
                    {/* Additional buttons or content for deleting medication */}
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Diagnose Birds And Isolate Birds</h3>
                    <p className="card-text">
                      Record the health condition and diagnosis of a bird or batch of birds and isolate
                    </p>
                    <Link to="/delete-medication">
                      <button className="btn btn-primary">Book Sick Birds</button>
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
