import React, { useState } from 'react';
import NewVegetable from './NewVegetable'; // Import the NewVegetable component
import AllVeges from './AllVeges';

import VegeFooter from '../VegeFooter';
import SpecificVegeBatchesReport from '../SpecificVegeBatches';
import AllVegetableBatches from '../AllVegetableBatchesReport';
import AllCashCropsActivitiesReports from './AllVegesActivitiesReportDashboard';
import AllVegeExpenses from './AllVegesActivitiesReport/ExpensesReport';
import ExpenseCategory from '../../CashCrops/Finance/expenseCategory';
import AllExpenseCategories from '../../CashCrops/Finance/AllExpenseCategories';

const extrasItems = [
  {
    id: 1,
    title: 'Click To View More Features',
    subItems: [
      { id: 11, title: 'Add New Vegetable' },
      { id: 12, title: 'View All Vegetables' },
      { id: 13, title: 'Add Expense Category' },
      { id: 14, title: 'All Expense Categories' },
      { id: 15, title: 'All Specific Vegetable Batches' },
      { id: 16, title: 'All Vegetables Batches' },
      { id: 17, title: 'All Vegetable Activities Reports' },
      { id: 18, title: 'All Vegetable Expense Reports' },
    ],
  }
];

function Extras() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedSubItem(null); // Reset selected sub-item when main item is clicked
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          <h2>Extras</h2>
          <ul className="list-group">
            {extrasItems.map((item) => (
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
          {selectedSubItem && selectedSubItem.id === 11 && <NewVegetable />}
          {selectedSubItem && selectedSubItem.id === 12 && <AllVeges />}
          {selectedSubItem && selectedSubItem.id === 13 && <ExpenseCategory/>}
          {selectedSubItem && selectedSubItem.id === 14 && <AllExpenseCategories/>}
          {selectedSubItem && selectedSubItem.id === 15 && <SpecificVegeBatchesReport/>}
          {selectedSubItem && selectedSubItem.id === 16 && <AllVegetableBatches/>}
          {selectedSubItem && selectedSubItem.id === 17 && <AllCashCropsActivitiesReports/>}
          {selectedSubItem && selectedSubItem.id === 18 && <AllVegeExpenses/>}
          
        </div>
      </div>
      <VegeFooter toggleModal={toggleModal} />
    </div>
  );
}

export default Extras;
