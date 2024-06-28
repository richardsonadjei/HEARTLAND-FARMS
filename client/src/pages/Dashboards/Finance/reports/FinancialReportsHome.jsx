import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AllPartnerContributions from './PartnersContribution';
import AllFarmExpenses from './AllFarmExpenses';
import AllAssets from './AllAssets';
// Import other necessary components like ViewExpenses, BatchProfitLoss, SeasonalProfitLoss

const financialItems = [
  {
    id: 1,
    title: 'Expenses',
    subItems: [
      { id: 11, title: 'View Expenses' },
    ],
  },
  {
    id: 2,
    title: 'Income',
    subItems: [
      { id: 21, title: 'View Partner Contributions' },
      { id: 22, title: 'View Sales' },
    ],
  },
  {
    id: 3,
    title: 'Assets',
    subItems: [
      { id: 31, title: 'Assets Purchase Report' },
    ],
  },
];

function FinancialReports() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  const currentUser = useSelector((state) => state.user.currentUser); // Fetch current user from Redux store

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedSubItem(null); // Reset selected sub-item when main item is clicked
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          <h2>Financial Reports</h2>
          <ul className="list-group">
            {financialItems.map((item) => (
              <li
                key={item.id}
                className={`list-group-item ${selectedItem && selectedItem.id === item.id ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
              >
                {item.title}
                {selectedItem && selectedItem.id === item.id && selectedItem.subItems && (
                  <ul className="list-group">
                    {item.subItems.map((subItem) => (
                      <li
                        key={subItem.id}
                        className={`list-group-item ${selectedSubItem && selectedSubItem.id === subItem.id ? 'active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent click on sub-item from propagating to parent item
                          handleSubItemClick(subItem);
                        }}
                      >
                        {subItem.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-9 details">
          {/* Render details based on selected main item and sub-item */}
          {selectedItem && (
            <div>
              {/* Render additional details here */}
              {selectedSubItem && selectedSubItem.id === 11 && (
                <div>
                  <AllFarmExpenses />
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 21 && (
                <div>
                  <AllPartnerContributions />
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 31 && (
                <div>
                  <AllAssets />
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 32 && (
                <div>
                  <SeasonalProfitLoss />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinancialReports;
