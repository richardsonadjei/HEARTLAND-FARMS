import React from 'react';
import { Link } from 'react-router-dom';

const Extras = () => {
  return (
    <div className="container mt-5">
      <h2>Extra Features</h2>
      <div className="row mt-3">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">New Breed</h5>
              <p className="card-text">Create A New Of Poultry Breed</p>
              <Link to="/create-breed" className="btn btn-primary">
                Create A Breed
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Farm Sections</h5>
              <p className="card-text">Create A New Farm Section</p>
              <Link to="/farm-section" className="btn btn-primary">
                Create A Section
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Financial Reports</h5>
              <p className="card-text">View financial reports and analytics for your farm.</p>
              <Link to="/financial-reports" className="btn btn-primary">
                Go to Financial Reports
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create Feed Supplier</h5>
              <p className="card-text">Create A New Feed Supplier</p>
              <Link to="/create-supplier" className="btn btn-primary">
              Create A New Feed Supplier
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">View Feed Suppliers</h5>
              <p className="card-text">View All Feed Suppliers</p>
              <Link to="/all-suppliers" className="btn btn-primary">
              View All Suppliers
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Create An Expense Category</h5>
              <p className="card-text">Expense Category</p>
              <Link to="/all-suppliers" className="btn btn-primary">
              Create Expense Category
              </Link>
            </div>
          </div>
        </div>
        
        {/* Add more cards with buttons for other features */}
      </div>
    </div>
  );
};

export default Extras;
