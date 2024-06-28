import React, { useState } from 'react';
import BirdsFooter from '../BirdsFooter';
import AllPoultryBatches from './reports/AllPoultryReport';
import AllBirdAdditionsReport from './reports/BirdAdditionsReport';
import VaccinationChart from './reports/VaccinationChart';
import PoultryMortalityReport from './reports/PoultryMortalityReport';
import PoultrySortedEggsStockReport from './reports/SortedEggsStockReport';
import PoultryUnsortedEggsStockReport from './reports/UnsortedEggsReport';
import PoultryExpenseReport from './reports/ExpenseReport';
import PeriodExpenseReport from './reports/PeriodExpenseReport';
import PoultryBirdSaleReport from './reports/PoultrySalesReport';
import PoultryBatchSalesReport from './reports/PoultryBatchSalesReport';
import PoultryBatchVaccinationRecord from './reports/PoultryBatchVaccinationReport';
import PoultryBatchExpenseReport from './reports/PoultryBatchExpenseReport';
import BirdTypeDailyEggsCollected from './reports/BirdTypeDailyEggsCollected';

// Import useSelector from react-redux to fetch current user
import { useSelector } from 'react-redux';

const farmItems = [
  {
    id: 1,
    title: 'Click To View Poultry Farm Records',
    subItems: [
      { id: 11, title: 'All Poultry' },
      { id: 13, title: 'Birth Update/Additions History' },
      { id: 14, title: 'Medical Treatment Records' },
      { id: 15, title: 'Mortality  Records' },
      { id: 16, title: 'All Poultry Records' },
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

function PoultryHome() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = useSelector((state) => state.user.currentUser); // Fetch current user from Redux store

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

  // Filter farmItems based on the user's role
  const farmItemsFiltered = currentUser && currentUser.role === 'employee' ? farmItems.filter(item => item.id === 1) : farmItems;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          <h2>Poultry Farm Record Book</h2>
          <ul className="list-group">
            {farmItemsFiltered.map((item) => (
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
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('allPoultry')}
                  >
                    All Poultry
                  </button>
                  {selectedAction === 'allPoultry' && (
                    <div>
                      <AllPoultryBatches />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 13 && <AllBirdAdditionsReport />}
              {selectedSubItem && selectedSubItem.id === 14 && <MedicalTreatmentRecords />}
              {selectedSubItem && selectedSubItem.id === 15 && <PoultryMortalityReport />}
              {selectedSubItem && selectedSubItem.id === 16 && <AllPoultryReport />}

              {selectedSubItem && selectedSubItem.id === 31 && <DailyEggsCollected />}
              {selectedSubItem && selectedSubItem.id === 32 && <SortedEggStock />}
              {selectedSubItem && selectedSubItem.id === 33 && <UnsortedEggStock />}

              {selectedSubItem && selectedSubItem.id === 21 && <PoultryExpenseReport />}
              {selectedSubItem && selectedSubItem.id === 22 && <PeriodExpenseReport />}
              {selectedSubItem && selectedSubItem.id === 51 && <PoultryBirdSaleReport />}
              {selectedSubItem && selectedSubItem.id === 52 && <PoultryBatchSalesReport />}

              {selectedSubItem && selectedSubItem.id === 34 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('vaccinationChart')}
                  >
                    Complete Vaccination Chart
                  </button>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('vaccination-records')}
                  >
                    Batch Vaccination Records
                  </button>
                  <button
                    className="btn btn-secondary mt-2 mr-2"
                    onClick={() => handleActionClick('deworming')}
                  >
                    Deworming Records
                  </button>
                  <button
                    className="btn btn-primary me-2 mt-2 mr-2"
                    onClick={() => handleActionClick('otherMedicalRecords')}
                  >
                    Other Medical Records
                  </button>
                  {selectedAction === 'vaccinationChart' && (
                    <div>
                      <VaccinationChart />
                    </div>
                  )}
                  {selectedAction === 'vaccination-records' && (
                    <div>
                      <PoultryBatchVaccinationRecord />
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

export default PoultryHome;
