import React, { useState } from 'react';
import BatchNursery from './reports/BatchNursery';
import AllCabbageNursingRecords from './reports/AllCabbageNurseryReport';
import CabbageBatchExpense from './reports/CabbageBatchExpenseReport';
import AllCabbageExpenses from './reports/AllCabbageExpenseReport';
import CabbageBatchTransplantingReport from './reports/CabbageBatchTransplantingReport';
import AllCabbageTransplantingReport from './reports/AllCabbageTransplantingReport';
import CabbageBatchDirectPlantingReport from './reports/CabbageBatchDirectPlantingReport';
import AllCabbageDirectPlantingReport from './reports/AllCabbageDirectPlantingReport';
import CabbageBatchFertilizerApplication from './reports/CabbageBatchFertilizerApplicationReport';
import AllCabbageFertilizerApplicationRecord from './reports/AllCabbageFertilizerApplicationReport';
import CabbageProfitLossReport from './reports/CabbageProfitAndLoss';
import CabbagePestAndWeedControl from './reports/CabbagePestAndWeedControlsReport';
import AllCabbagePestAndWeedControlReport from './reports/AllCabbagePestAndWeedControl';
import CabbageAllActivitiesReport from './reports/AllCabbageFarmActivities';
import CabbageBatchOtherActivitiesRecords from './reports/CabbageBatchOtherActivitiesReport';
import BatchHarvestingRecords from './reports/CabbageBatchHarvestingRecords';
import VegeFooter from '../VegeFooter';
import { useSelector } from 'react-redux';

const farmItems = [
  {
    id: 1,
    title: 'Cabbage Farm Activities Record',
    subItems: [
      { id: 11, title: 'Nursery Records' },
      { id: 12, title: 'Transplanting Records' },
      { id: 13, title: 'Direct Planting Records' },
      { id: 14, title: 'Fertilizer Application Records' },
      { id: 15, title: 'Pest And Weed Control Records' },
      { id: 16, title: 'Other Activities Records' },
      { id: 17, title: 'Harvest Records' },
      { id: 18, title: 'All Farm Activities Records' },
    ],
  },
  {
    id: 2,
    title: 'Expenses',
    subItems: [
      { id: 21, title: 'Expenses By Batch' },
    ],
  },
  {
    id: 3,
    title: 'Income',
    subItems: [
      { id: 31, title: 'Income' },
    ],
  },
  {
    id: 4,
    title: 'Profit-Loss',
    subItems: [
      { id: 34, title: 'Batch Profit/Loss' },
      { id: 35, title: 'Seasonal Profit Loss' },
    ],
  },
];

function CabbageFarmManager() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const currentUser = useSelector((state) => state.user.currentUser); // Fetch current user from Redux store

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
          <h2>Cabbage Farm Book</h2>
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
                    onClick={() => handleActionClick('batchNursery')}
                  >
                    Batch Nursery Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allNursery')}
                  >
                    All Nursery Records
                  </button>
                  {selectedAction === 'batchNursery' && (
                    <div>
                      <BatchNursery />
                    </div>
                  )}
                  {selectedAction === 'allNursery' && (
                    <div>
                      <AllCabbageNursingRecords />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 12 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('batchTransplanting')}
                  >
                    Batch Transplanting Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allTransplanting')}
                  >
                    All Transplanting Records
                  </button>
                  {selectedAction === 'batchTransplanting' && (
                    <div>
                      <CabbageBatchTransplantingReport />
                    </div>
                  )}
                  {selectedAction === 'allTransplanting' && (
                    <div>
                      <AllCabbageTransplantingReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 13 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchDirectPlanting')}
                  >
                    Batch Direct Planting Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('allDirectPlanting')}
                  >
                    All Direct Planting Records
                  </button>
                  {selectedAction === 'batchDirectPlanting' && (
                    <div>
                      <CabbageBatchDirectPlantingReport />
                    </div>
                  )}
                  {selectedAction === 'allDirectPlanting' && (
                    <div>
                      <AllCabbageDirectPlantingReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 14 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchFertilizerApplication')}
                  >
                    Batch Fertilizer Application Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('allFertilizerApplication')}
                  >
                    All Fertilizer Application Records
                  </button>
                  {selectedAction === 'batchFertilizerApplication' && (
                    <div>
                      <CabbageBatchFertilizerApplication />
                    </div>
                  )}
                  {selectedAction === 'allFertilizerApplication' && (
                    <div>
                      <AllCabbageFertilizerApplicationRecord />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 15 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchPestAndWeedControl')}
                  >
                    Batch Pest And Weed Control Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('allPestAndWeedControl')}
                  >
                    All Pest And Weed Control Records
                  </button>
                  {selectedAction === 'batchPestAndWeedControl' && (
                    <div>                      <CabbagePestAndWeedControl />
                    </div>
                  )}
                  {selectedAction === 'allPestAndWeedControl' && (
                    <div>
                      <AllCabbagePestAndWeedControlReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 16 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchOtherActivities')}
                  >
                    Batch Other Activities
                  </button>
                  {selectedAction === 'batchOtherActivities' && (
                    <div>
                      <CabbageBatchOtherActivitiesRecords />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 17 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchHarvesting')}
                  >
                    Batch Harvesting
                  </button>
                  {selectedAction === 'batchHarvesting' && (
                    <div>
                      <BatchHarvestingRecords />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 18 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('allFarmActivities')}
                  >
                    All Cabbage Farm Activities Record
                  </button>
                  {selectedAction === 'allFarmActivities' && (
                    <div>
                      <CabbageAllActivitiesReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 21 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchExpense')}
                  >
                    Batch Expense Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('allExpense')}
                  >
                    All Expense Records
                  </button>
                  {selectedAction === 'batchExpense' && (
                    <div>
                      <CabbageBatchExpense />
                    </div>
                  )}
                  {selectedAction === 'allExpense' && (
                    <div>
                      <AllCabbageExpenses />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 31 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchIncome')}
                  >
                    Batch Income
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('otherIncome')}
                  >
                    Other Income
                  </button>
                  {selectedAction === 'batchIncome' && (
                    <div>
                      {/* Render Batch Income component */}
                    </div>
                  )}
                  {selectedAction === 'otherIncome' && (
                    <div>
                      {/* Render Other Income component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 34 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchProfitLoss')}
                  >
                    Batch Profit And Loss
                  </button>
                  {selectedAction === 'batchProfitLoss' && (
                    <div>
                      <CabbageProfitLossReport />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {!selectedItem && <p>Select an item from the sidebar to view details.</p>}
        </div>
      </div>
      <VegeFooter toggleModal={toggleModal} />
    </div>
  );
}

export default CabbageFarmManager;

                     
