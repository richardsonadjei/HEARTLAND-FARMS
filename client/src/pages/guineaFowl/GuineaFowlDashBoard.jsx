import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuineaFowlDashboard = () => {
  const { currentUser } = useSelector((state) => state.user);
  const isAdmin = currentUser && currentUser.role === 'admin';

  const handleUpdateAgeClick = async () => {
    try {
      const response = await fetch('/api/update-all-guinea-ages');

      if (!response.ok) {
        throw new Error(`Failed to update ages: ${response.statusText}`);
      }
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error updating age:', error);
      alert('Failed to update ages. Please try again later.');
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
          <h2 className="mt-3 mb-4">Guinea Fowl </h2>
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
              <a className="nav-link text-light" href="/guinea-fowl-medication-dashboard">
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
              <div className="card mb-4" id="stock-tracking" style={{ backgroundImage: 'url("../../../public/images/Guinea-fowl-bg.jpg")', backgroundSize: 'cover' }}>
                  <div className="card-body">
                    <h3 className="card-title text-white">Stock Tracking</h3>
                    
                    <div className="mb-4">
                      <Link to="/new-guineaFowl">
                        <button className="btn btn-primary mb-2 me-2">Add New Stock</button>
                      </Link>
                      <Link to="/add-guineaFowl">
                        <button className="btn btn-primary me-2 mb-2">Update Stock</button>
                      </Link>
                      <Link to="/all-guineaFowls">
                        <button className="btn btn-primary me-2 mb-2">All Stock</button>
                      </Link>
                      <Link to="/guineaFowls-batch-update-history">
                        <button className="btn btn-primary me-2 mb-2" >All Stock Update Report</button>
                      </Link>
                      <Link to="/guinea-fowls-single-batch-update-report">
                        <button className="btn btn-primary me-2 mb-2">Batch Stock Update Report</button>
                      </Link>
                      <Link to="#">
                        <button className="btn btn-primary me-2 mb-2" onClick={handleUpdateAgeClick} style={{ backgroundColor: 'black', border: '1px solid', color:'white' }}>
                          Update Age
                        </button>
                      </Link>
                      <Link to="/move-guinea-fowls">
                        <button className="btn btn-primary me-2 mb-2">Relocate Birds</button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
              <div className="card mb-4" id="feed-management" style={{ backgroundImage: 'url("../../../public/images/poultry-feeds-250x250.webp")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
                  <div className="card-body">
                    <h3 className="card-title">Feed Management</h3>
                    <p className="card-text">Some description about feed management.</p>
                    <Link to="/purchase-feed">
                        <button className="btn btn-primary me-2">Purchase Feed</button>
                    </Link>
                    <Link to="/request-feed">
                        <button className="btn btn-primary me-2">Request Feed</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4" id="medication-management" style={{ backgroundImage: 'url("../../../public/images/sick guineas.png")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
                  <div className="card-body">
                    <h3 className="card-title text-white">Vaccination and Health Management</h3>
                    <p className="card-text">Some description about medication and health management.</p>
                    <Link to="/medication">
                        <button className="btn btn-primary" style={{ backgroundColor: 'green', border: '1px solid ' }}>Vaccination And Treatments</button>
                      </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4" id="egg-management" style={{ backgroundImage: 'url("../../../public/images/eggs.jpg")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
                  <div className="card-body">
                    <h3 className="card-title">Egg Management</h3>
                    <p className="card-text">Some description about egg management.</p>
                    <div className="d-flex flex-wrap">
  <div className="me-2 mb-1">
    <Link to="/record-unsorted-guinea-fowl-eggs">
      <button className="btn btn-primary">Record Eggs Laid (Unsorted)</button>
    </Link>
  </div>
  <div className="me-2 mb-1">
    <Link to="/record-sorted-guinea-fowl-eggs">
      <button className="btn btn-primary">Record Eggs Laid (Sorted)</button>
    </Link>
  </div>
  <div className="me-2 mb-1">
    <Link to="/view-daily-unsorted-guinea-fowl-eggs">
      <button className="btn btn-primary">Daily Unsorted Eggs</button>
    </Link>
  </div>
  <div className="me-2 mb-1">
    <Link to="/view-daily-sorted-guinea-fowl-eggs">
      <button className="btn btn-primary">Daily Sorted Eggs</button>
    </Link>
  </div>
</div>

                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4" id="sales-distribution" style={{ backgroundImage: 'url("../../../public/images/sale guinea fowl.jpg")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
                  <div className="card-body">
                    <h3 className="card-title">Sales and Distribution</h3>
                    <Link to="/sell-guinea-fowl-eggs">
                        <button className="btn btn-primary me-2 mb-2">Sell Eggs</button>
                    </Link>
                   
                    <Link to="/sell-guinea-fowls">
                        <button className="btn btn-primary me-2 mb-2">Sell Birds</button>
                    </Link>
                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="col-md-6">
                  <div className="card mb-4" id="reporting-analytics" style={{ backgroundImage: 'url("../../../public/images/reports.png")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
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
                <div className="card mb-4" id="mortality" style={{ backgroundImage: 'url("../../../public/images/dead-guinea-fowl.jpg")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
                  <div className="card-body">
                    <h3 className="card-title">Mortality</h3>
                    <p className="card-text">Mortality</p>
                    <Link to="/record-guinea-fowl-mortality">
                        <button className="btn btn-primary me-2 mb-2">Record Mortality</button>
                    </Link>
                    <Link to="/all-batches-mortality-report">
  <button className="btn btn-primary me-2" style={{ backgroundColor: 'red', border: '1px solid red' }}>
    All Batches Mortality Report
  </button>
</Link>
<Link to="/guinea-fowls-batch-mortality-report">
  <button className="btn btn-primary me-2" style={{ backgroundColor: 'red', border: '1px solid red' }}>
    Batch Mortality Report
  </button>
</Link>

                  </div>
                </div>
              </div>
              {isAdmin && (
                <div className="col-md-6">
                  <div className="card mb-4" id="finance" style={{ backgroundImage: 'url("../../../public/images/finance.jpg")', backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }}>
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

export default GuineaFowlDashboard;