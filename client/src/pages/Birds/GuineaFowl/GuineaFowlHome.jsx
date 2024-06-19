import React, { useState } from 'react';
import BirdsFooter from '../BirdsFooter';
import AllBirdAdditionsReport from './reports/BirdAdditionsReport';
import VaccinationChart from './reports/VaccinationChart';
import PeriodExpenseReport from './reports/PeriodExpenseReport';
import AllBirdBatches from './reports/AllBirdsReport';
import BirdMortalityReport from './reports/BirdMortalityReport';
import BirdBatchExpenseReport from './reports/BirdBatchExpenseReport';
import BirdBatchSalesReport from './reports/BirdBatchSalesReport';
import BirdBatchVaccinationRecord from './reports/BirdBatchVaccinationReport';
import BirdSaleReport from './reports/BirdSalesReport';
import BirdVaccinationReport from './reports/BirdVaccinationsReport';
import BirdSortedEggsStockReport from './reports/SortedEggsStockReport';
import BirdUnsortedEggsStockReport from './reports/UnsortedEggsReport';
import BirdTypeDailyEggsCollected from './reports/BirdTypeDailyEggsCollected';
import BirdExpenseReport from './reports/ExpenseReport';





const farmItems = [
  {
    id: 1,
    title: 'Click To View Farm Farm Records',
    subItems: [
      { id: 11, title: 'All Guinea Fowls' },
      { id: 13, title: 'Birth Update/Additions History' },
      { id: 14, title: 'Medical Treatment Records' },
      { id: 15, title: 'Mortality  Records' },
      { id: 16, title: 'All Guinea Fowl Records' },
    ],
  },
  {
    id: 2,
    title: 'Click To Egg Management Records',
    subItems: [
      { id: 31, title: 'Daily Eggs Collected' },
      { id: 32, title: 'Sorted Egg Stock' },
      { id: 33, title: 'Unsorted Egg Stock' },
      
    ],
  },
  {
    id: 3,
    title: 'Expenses',
    subItems: [
      { id: 21, title: 'All Expenses' },
      { id: 22, title: 'All Expenses Within A Period' },
      { id: 23, title: 'All Expenses For A Particular Batch' },
     

     
    ],
  },
  {
    id: 4,
    title: 'Income',
    subItems: [
      { id: 51, title: 'All Sales Report' },
      { id: 52, title: 'Batch Sales Report' },
     
    ],
  },
  {
    id: 5,
    title: 'Profit-Loss',
    subItems: [
      { id: 34, title: 'View Poultry Profit/Loss' },
     
    ],
  },
  {
    id: 6,
    title: 'View Misc Records',
    subItems: [
      { id: 34, title: 'All Vaccines' },
      { id: 34, title: 'Vaccination Cycle Chart' },
   
     
    ],
  },
];

function GuineaFowlHome() {
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
          <h2>Guinea Fowl Farm Record Book</h2>
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
                    All Birds
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
                      <AllBirdBatches/>
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

{selectedSubItem && selectedSubItem.id === 13 && <AllBirdAdditionsReport/>}
 {/* {selectedSubItem && selectedSubItem.id === 14 && <AllVaccinationsReport/>} */}

{selectedSubItem && selectedSubItem.id === 15 && <BirdMortalityReport/>}
{selectedSubItem && selectedSubItem.id === 32 && <BirdSortedEggsStockReport/>}
{selectedSubItem && selectedSubItem.id === 33 && <BirdUnsortedEggsStockReport/>}  
{selectedSubItem && selectedSubItem.id === 21 && <BirdExpenseReport/>}  
{selectedSubItem && selectedSubItem.id === 22 && <PeriodExpenseReport/>}  
{selectedSubItem && selectedSubItem.id === 51 && <BirdSaleReport/>}  
{selectedSubItem && selectedSubItem.id === 52 && <BirdBatchSalesReport/>}  
{selectedSubItem && selectedSubItem.id === 31 && <BirdTypeDailyEggsCollected/>}  
{selectedSubItem && selectedSubItem.id === 23 && <BirdBatchExpenseReport/>}  

{selectedSubItem && selectedSubItem.id === 14 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('vaccinationChart')}
                  >
                    Complete Vaccination Chart
                  </button>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('vaccination-records')}
                  >
                    Batch Vaccination Records
                  </button>
                  <button
                    className="btn btn-secondary mt-2 mr-2 me-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('deworming')}
                  >
                   Deworming Records
                  </button>
                  <button
                    className="btn btn-primary me-2 mt-2 mr-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('allBirdVaccinationRecord')}
                  >
                    All Birds Vacinnation Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'vaccinationChart' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <VaccinationChart/>
                    </div>
                  )}
                  {selectedAction === 'vaccination-records' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <BirdBatchVaccinationRecord/>
                    </div>
                  )}
                 
                  {selectedAction === 'allBirdVaccinationRecord' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <BirdVaccinationReport/>
                    </div>
                  )}

                  
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <BirdsFooter toggleModal={toggleModal} />
    </div>
  );
}

export default GuineaFowlHome;
