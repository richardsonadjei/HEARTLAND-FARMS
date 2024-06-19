import React, { useState } from 'react';

import AnimalsFooter from '../AnimalsFooter';

import AllVaccinationsReport from './reports/AllVaccinationsReport';
import AllMedicalTreatmentRecords from './reports/AllMedicalTreatmentReports';
import AnimalWeightReport from './reports/WeightReport';
import AllAnimalReport from './reports/AllReport';
import MortalityReport from './reports/MortalityReport';
import AllAnimalsReport from './reports/AllAnimalsReport';
import AllAnimalBirths from './reports/AllBirthReport';
import ExpensesByTypeAndIdentityNumber from './reports/AnimalExpenseReportByTypeAndId';
import AllAnimalExpenseByTypeReport from './reports/AnimalExpenseByType';
import AllAnimalSalesByTypeReport from './reports/AnimalSalesReport';



const farmItems = [
  {
    id: 1,
    title: 'Click To View Cattle Farm Records',
    subItems: [
      { id: 11, title: 'All Cattle' },
      { id: 12, title: 'Birth Records' },
      { id: 13, title: 'Vaccination Records' },
      { id: 14, title: 'Medical Treatment Records' },
      { id: 15, title: 'Growth Rate/Weight Records' },
      { id: 16, title: 'Mortality  Records' },
      { id: 17, title: 'All Cattle Records' },
    ],
  },
  {
    id: 2,
    title: 'Expenses',
    subItems: [
      { id: 21, title: 'View Expenses' },

     
    ],
  },
  {
    id: 3,
    title: 'Income',
    subItems: [
      { id: 31, title: 'View Cattle Sales' },
     
    ],
  },
 
];

function CattleHome() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };


  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedSubItem(null); // Reset selected sub-item when main item is clicked
    setSelectedAction(null); // Reset selected action when main item is clicked
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
    setSelectedAction(null); // Reset selected action when sub-item is clicked
  };

  const handleActionClick = (action) => {
    setSelectedAction(action);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          <h2>Cattle Farm Record Book</h2>
          <ul className="list-group">
            {farmItems.map((item) => (
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
                  <button
                    className="btn btn-primary me-2 mr-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('allGoats')}
                  >
                    All Cattle
                  </button>
                  {/* <button
                    className="btn btn-secondary me-2 mr-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allNursery')}
                  >
                    All Nursery Records
                  </button> */}
                  {/* Render components based on selected action */}
                  {selectedAction === 'allGoats' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <AllAnimalsReport/>
                    </div>
                  )}
                  {selectedAction === 'allNursery' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllCabbageNursingRecords/>
                    </div>
                  )}

                  
                </div>
              )}

{selectedSubItem && selectedSubItem.id === 31 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('allSalesByType')}
                  >
                    All Sales By Type
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allNursery')}
                  >
                    All Nursery Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'allSalesByType' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <AllAnimalSalesByTypeReport/>
                    </div>
                  )}
                  {selectedAction === 'allNursery' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllCabbageNursingRecords/>
                    </div>
                  )}

                  
                </div>
              )}

              

{selectedSubItem && selectedSubItem.id === 12 && <AllAnimalBirths/>}
{selectedSubItem && selectedSubItem.id === 13 && <AllVaccinationsReport/>}

{selectedSubItem && selectedSubItem.id === 14 && <AllMedicalTreatmentRecords/>}
{selectedSubItem && selectedSubItem.id === 15 && <AnimalWeightReport/>}
{selectedSubItem && selectedSubItem.id === 16 && <MortalityReport/>}
{selectedSubItem && selectedSubItem.id === 17 && <AllAnimalReport/>}

{selectedSubItem && selectedSubItem.id === 21 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchExpense')}
                  >
                    Batch Expense Record
                  </button>
                  <button
                    className="btn btn-secondary mt-2 mr-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allExpense')}
                  >
                    All Expense Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchExpense' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <ExpensesByTypeAndIdentityNumber/>
                    </div>
                  )}
                  {selectedAction === 'allExpense' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllAnimalExpenseByTypeReport/>
                    </div>
                  )}

                  
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <AnimalsFooter toggleModal={toggleModal} />
    </div>
  );
}

export default CattleHome;
