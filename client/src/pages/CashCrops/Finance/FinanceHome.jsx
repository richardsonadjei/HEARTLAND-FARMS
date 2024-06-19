import React, { useState } from 'react';


import CashCropFooter from '../CashCropsFooter';
import AddCashCropExpense from './AddCashCropExpense';
import AllCashCropExpenseReport from '../AllCashCrops/AllCashCropExpenseReport';
import AllExpenseCategories from './AllExpenseCategories';
import ExpenseCategory from './expenseCategory';


const incomeExpenseItems = [
  {
    id: 1,
    title: 'Sales and Expenses',
    subItems: [
      { id: 12, title: 'Record Expense' },
      { id: 11, title: 'Record Sales' },
      { id: 13, title: 'Add Expense Category' },
      { id: 14, title: 'All Expense Categories' },
      { id: 15, title: 'All Sales Reports' },
      { id: 16, title: 'All Expenses Reports' },
    ]
  }
];

function CashCropFinanceHome() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

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
          <h2 style={{ fontWeight: 'bold', color: 'red' }}>Cash Crops Farm CashBook</h2>
          <ul className="list-group">
            {incomeExpenseItems.map((item) => (
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
                          e.stopPropagation(); 
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
           {selectedSubItem && selectedSubItem.id === 12 && <AddCashCropExpense />}
          {/* {selectedSubItem && selectedSubItem.id === 12 && <AddVegeExpense />} */}

          {selectedSubItem && selectedSubItem.id === 13 && <ExpenseCategory/>}
          {selectedSubItem && selectedSubItem.id === 14 && <AllExpenseCategories/>}
          {selectedSubItem && selectedSubItem.id === 18 && <AllCashCropExpenseReport/>} 
          {!selectedSubItem && <p>Select an item from the sidebar to view details.</p>}
        </div>
      </div>
      <CashCropFooter toggleModal={toggleModal} />
    </div>
  );
}

export default CashCropFinanceHome;
