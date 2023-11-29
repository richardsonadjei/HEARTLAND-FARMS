import React, { useState } from "react";
import { Link } from "react-router-dom";

const FinancialReports = () => {
  const [selectedReport, setSelectedReport] = useState(null);

  const reports = [
    {
      title: "Feed Purchase Report",
      path: "/feed-transactions",
      purpose: "This provides the report of all feeds purchased within a period",
      // ... other details for the Inventory Status Report
    },
    {
      title: "Age Report",
      path: "/age-report",
      purpose: "Report on birds based on age period",
      // ... other details for the Supplier Performance Report
    },
    {
      title: "Bird Movement Report By Date",
      path: "/date-movement",
      purpose: "This tells the various procurements for a particular batch within a particular period",
      // ... other details for the Quality Control Report
    },
    {
      title: "Batch Modification History By Date",
      path: "/update-history",
      purpose: "This tells the various procurements for a particular batch within a particular period",
      // ... other details for the Quality Control Report
    },
    {
      title: "Batch Addition History By Date",
      path: "/add-history",
      purpose: "This Tells The Addition Histories For A Particular Batch",
      // ... other details for the Quality Control Report
    },
    {
      title: "Broilers Report",
      path: "/broilers-report",
      purpose: "This gives a report of broilers availabe",
      // ... other details for the Quality Control Report
    },
    {
      title: "Layers Report",
      path: "/layers-report",
      purpose: "This gives a report of layers",
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
