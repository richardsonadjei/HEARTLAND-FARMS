import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const EggManagementReport = () => {
  const [unsortedStockInCrates, setUnsortedStockInCrates] = useState('0 crates 0 loose');
  const [sortedStock, setSortedStock] = useState(0);
  const [sortedSizes, setSortedSizes] = useState({});

  const fetchEggStock = async () => {
    try {
      // Fetch current stock of unsorted eggs in crates
      const unsortedResponse = await fetch('/api/current-unsorted-egg-stock');
      const unsortedData = await unsortedResponse.json();
      setUnsortedStockInCrates(unsortedData.data.currentStockInCrates);
  
      // Fetch current stock of sorted eggs
      const sortedResponse = await fetch('/api/current-sorted-egg-stock');
      const sortedData = await sortedResponse.json();
  
      // Update this part based on the structure of your API response
      const sizesInCrates = sortedData.data.sizesInCrates;
      const totalSortedStock = Object.values(sizesInCrates).reduce(
        (acc, curr) => acc + Number(curr.split(' ')[0]), // Extract the number of crates
        0
      );
      
      setSortedStock(totalSortedStock);
      setSortedSizes(sizesInCrates); // Set the sizes object
    } catch (error) {
      console.error('Error fetching egg stock:', error);
    }
  };
  

  // Use effect to fetch and update egg stock every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchEggStock();
    }, 1000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="col-md-6">
      <div className="card mb-4 egg-management-card">
        <div className="card-body">
          <h3 className="card-title">Egg Stock</h3>
          <div>
            <div>
              <p className="mt-3 mb-1">Current Stock:</p>
              <p className="mb-0">Unsorted Eggs: {unsortedStockInCrates}</p>
              
            </div>
            <div>
              {/* Display sorted eggs based on quantity */}
              <p>Sorted Eggs by Size:</p>
              <ul>
                {Object.entries(sortedSizes).map(([size, quantity]) => (
                  <li key={size}>{`${size}: ${quantity}`}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PoultryReport = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 bg-dark text-light">
          <h2 className="mt-3 mb-4">Poultry Reports</h2>
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link text-light" href="/stock-reports">
                Stocks Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#feed-management">
                Egg Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/financial-reports">
                Financial Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#egg-management">
                Egg Management Report
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#sales-distribution">
                Sales and Distribution Report
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="/batch-treatment-report">
                Treatment Reports
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-light" href="#reporting-analytics">
                Mortality Reports
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-9">
          <div className="container mt-5">
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 stock-tracking-card">
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
              <div className="col-md-6">
                <div className="card mb-4 feed-management-card">
                  <div className="card-body">
                    <h3 className="card-title">Feed Management Report</h3>
                    <p className="card-text">Quick Links</p>
                    <button className="btn btn-primary">Go to Feed Subsection</button>
                    {/* Additional buttons or content for feed management */}
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 medication-management-card">
                  <div className="card-body">
                    <h3 className="card-title">Medication and Health Management Report</h3>
                    <p className="card-text">Quick Links</p>
                    <button className="btn btn-primary">Go to Medication Subsection</button>
                    {/* Additional buttons or content for medication and health management */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <EggManagementReport />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 sales-distribution-card">
                  <div className="card-body">
                    <h3 className="card-title">Sales and Distribution Report</h3>
                    <p className="card-text">Quick Links</p>
                    <button className="btn btn-primary">Go to Sales Subsection</button>
                    {/* Additional buttons or content for sales and distribution */}
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card mb-4 mortality-report-card">
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
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="card mb-4 financial-reports-card">
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
              <div className="col-md-6">
                <div className="card mb-4 health-reports-card">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoultryReport;