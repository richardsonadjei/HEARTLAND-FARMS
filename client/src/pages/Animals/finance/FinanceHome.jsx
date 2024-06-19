import React, { useState } from 'react';

import AnimalsFooter from '../AnimalsFooter';
import ExpenseCategory from './AddExpenseCategory';
import AllExpenseCategories from './AllExpenseCategories';
import AddAnimalExpense from './AddAnimalExpense';
import AllAnimalExpenseReport from './AllAnimalExpenseReport';
import AddAnimalSale from './AddSale';

const incomeExpenseItems = [
  {
    id: 1,
    title: 'Click To Add Sales and Expenses Record',
    subItems: [
      { id: 11, title: 'Record Expense' },
      { id: 15, title: 'Add New Expense Category' },
      { id: 16, title: 'View All Expense Categories' },
      { id: 17, title: 'All Expenses Report' },
      { id: 12, title: 'Record Sale' },
   
     
      
    ]
  }
];

function FinanceHome() {
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
          <h2 style={{ fontWeight: 'bold', color: 'red' }}>Animals Farm CashBook</h2>
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
          {/* {selectedSubItem && selectedSubItem.id === 11 && <AddVegeIncome />} */}
          {selectedSubItem && selectedSubItem.id === 15 && <ExpenseCategory />}
          {selectedSubItem && selectedSubItem.id === 16 && <AllExpenseCategories />}
          {selectedSubItem && selectedSubItem.id === 11 && <AddAnimalExpense />}
          {selectedSubItem && selectedSubItem.id === 17 && <AllAnimalExpenseReport />}
          {selectedSubItem && selectedSubItem.id === 12 && <AddAnimalSale/>}
          {!selectedSubItem && <p>Select an item from the sidebar to view details.</p>}
        </div>
      </div>
      <AnimalsFooter toggleModal={toggleModal} />
    </div>
  );
}

export default FinanceHome;
