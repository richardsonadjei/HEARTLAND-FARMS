import React, { useState } from "react";
import { Link } from "react-router-dom";

const FinancialReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    
    {
      title: "Egg Sales Report",
      path: "/egg-sales-report",
      purpose: "Report of Eggs Sold Within A Period",
      // ... other details for the Supplier Performance Report
    },
    {
      title: "Egg Income Report",
      path: "/egg-income-report",
      purpose: "This provides income generated from egg sales",
      // ... other details for the Inventory Status Report
    },
    {
      title: "Bird Sales Report",
      path: "/bird-sales-report",
      purpose: "This tells the sale of birds within a particular period",
      // ... other details for the Quality Control Report
    },
  
   
  ];

  return (
    <div className="container mx-auto overflow-y-auto max-h-screen mt-5 px-4">
      <h1 className="text-3xl font-bold mb-4">Welcome To The Stock Report Page</h1>
      <div className="row">
        {reports.map((report, index) => (
          <div key={index} className="col-md-4 mb-4">
            <Link to={report.path} className="text-decoration-none">
              <div
                className="card border cursor-pointer transition duration-300 ease-in-out transform hover:shadow-lg hover:scale-105"
                onClick={() => setSelectedReport(report)}
              >
                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold mb-2">{report.title}</h2>
                  <p className="card-text text-gray-600">{report.purpose}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {selectedReport && (
        <div className="mt-4">
          <h2 className="text-2xl font-semibold mb-2">{selectedReport.title}</h2>
          <p className="text-gray-600 mb-4">{selectedReport.purpose}</p>
          {/* Render the specific report content here based on the selectedReport */}
        </div>
      )}
    </div>
  );
};

export default FinancialReports;
