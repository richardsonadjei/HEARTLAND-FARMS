import React from 'react';
import { Link } from 'react-router-dom';

const GuineaFowlMedicationDashboard = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Guinea Fowl Medication Dashboard</h2>
          <ul className="nav flex-column">
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
            
            
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Add Drugs/Vaccine</h3>
                    <p className="card-text">
                      Add a new Vaccine to the system.
                    </p>
                    <Link to="/add-drug">
                      <button className="btn btn-primary mb-2 me-2">Add</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Add Vaccine To Vaccination Cycle</h3>
                    <p className="card-text">
                      Add
                    </p>
                    <Link to="/add-vaccine">
                      <button className="btn btn-primary mb-2 me-2">Add Vaccine</button>
                    </Link>
                    <Link to="/record-vaccination">
                      <button className="btn btn-primary mb-2 me-2">Record Vaccination</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">All Drugs</h3>
                    <p className="card-text">
                      All Drugs And Vaccines
                    </p>
                    <Link to="/all-drug">
                      <button className="btn btn-primary mb-2 me-2">All Drugs</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">View All Vaccine Chart</h3>
                    <p className="card-text">
                      View a list of vaccines for vaccination.
                    </p>
                    <Link to="/all-vaccines">
                      <button className="btn btn-primary">View All Medication</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">View Vaccine By Age Range</h3>
                    <p className="card-text">
                      View medications based on age range criteria.
                    </p>
                    <Link to="/view-by-age-range">
                      <button className="btn btn-primary">View By Age Range</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Treatment Records</h3>
                    <p className="card-text">
                      View History Of Vaccinations And Deworming
                    </p>
                    <Link to="/guinea-fowl-batch-vaccination-report">
                      <button className="btn btn-primary me-2">Vaccination</button>
                    </Link>
                    
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Diagnose Birds And Isolate Birds</h3>
                    <p className="card-text">
                      Record the health condition and diagnosis of a bird or batch of birds and isolate
                    </p>
                    <Link to="/book-sick-guinea-fowl">
                      <button className="btn btn-primary">Record Sick Guinea Fowls</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">Treat Sick Guinea Fowls</h3>
                    <p className="card-text">
                      Record Treatment Given To Sick Birds After Diagnosis
                    </p>
                    <Link to="/treat-sick-guinea-fowl">
                      <button className="btn btn-primary">Treat</button>
                    </Link>
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

export default GuineaFowlMedicationDashboard;
