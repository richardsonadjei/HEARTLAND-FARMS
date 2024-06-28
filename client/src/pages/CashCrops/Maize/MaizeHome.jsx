import React, { useState } from 'react';
import CashCropFooter from '../CashCropsFooter';
import MaizeBatchLandPreparationRecord from './reports/MaizeBatchLandPreparationRecord';
import MaizeBatchPlantingRecord from './reports/MaizeBatchPlantingRecord';
import MaizeBatchManualWeedingReport from './reports/MaizeBatchWeedicideApplicationRecord';
import MaizeBatchWeedicideApplicationRecord from './reports/MaizeBatchWeedicideApplicationRecord';
import MaizeBatchPestAndDiseaseControlRecord from './reports/MaizeBatchPestAndDiseaseControlReport';
import MaizeBatchFertilizerApplicationRecord from './reports/MaizeFertilizerApplicationReport';
import MaizeBatchHarvestRecord from './reports/MaizeBatchHarvestReports';
import MaizeAllFarmActivitiesReport from './reports/AllMaizeFarmActivitiesReports';
import MaizeBatchExpense from './reports/BatchExpenseReport';

const farmItems = [
  {
    id: 1,
    title: 'Maize Farm Activities Record',
    subItems: [
      { id: 11, title: 'Land Preparation' },
      { id: 12, title: 'Planting' },
      { id: 13, title: 'Manual Weeding' },
      { id: 14, title: 'Weedicide Application' },
      { id: 15, title: 'Pest And Diseases Control' },
      { id: 16, title: 'Fertilizer And Manure Application' },
      { id: 17, title: 'Harvest Records' },
      { id: 19, title: 'All Farm Activities' },
    ],
  },
  {
    id: 2,
    title: 'Expenses',
    subItems: [
      { id: 21, title: 'Batch Expense Record' },
    ],
  },
  {
    id: 3,
    title: 'Income',
    subItems: [
      { id: 31, title: 'Batch Income' },
    ],
  },
  {
    id: 4,
    title: 'Profit-Loss',
    subItems: [
      { id: 34, title: 'Batch Profit And Loss' },
    ],
  },
];

function MaizeFarmManager() {
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

  const currentUser = { role: 'employee' }; // Placeholder for current user role, replace with actual Redux useSelector

  // Filter farmItems based on the user's role
  const farmItemsFiltered = currentUser && currentUser.role === 'employee' ?
    farmItems.filter(item => item.id === 1) :
    farmItems;

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          <h2>Maize Farm Book</h2>
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
                    onClick={() => handleActionClick('batchLandPreparation')}
                  >
                    Batch Land Preparation Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allLandPreparation')}
                  >
                    All Land Preparation Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchLandPreparation' && (
                    <div>
                      <MaizeBatchLandPreparationRecord />
                    </div>
                  )}
                  {selectedAction === 'allLandPreparation' && (
                    <div>
                      {/* Render All Land Preparation Records component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 12 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('batchPlanting')}
                  >
                    Batch Planting Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allPlanting')}
                  >
                    All Planting Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchPlanting' && (
                    <div>
                      <MaizeBatchPlantingRecord />
                    </div>
                  )}
                  {selectedAction === 'allPlanting' && (
                    <div>
                      {/* Render All Planting Records component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 13 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('batchManualWeeding')}
                  >
                    Batch Manual Weeding Report
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allManualWeeding')}
                  >
                    All Manual Weeding Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchManualWeeding' && (
                    <div>
                      <MaizeBatchManualWeedingReport />
                    </div>
                  )}
                  {selectedAction === 'allManualWeeding' && (
                    <div>
                      {/* Render All Manual Weeding Records component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 14 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('batchWeedicideApplication')}
                  >
                    Batch Weedicide Application Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allWeedicideApplication')}
                  >
                    All Weedicide Application Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchWeedicideApplication' && (
                    <div>
                      <MaizeBatchWeedicideApplicationRecord />
                    </div>
                  )}
                  {selectedAction === 'allWeedicideApplication' && (
                    <div>
                      {/* Render All Weedicide Application Records component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 15 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('batchPestAndDiseaseControl')}
                  >
                    Batch Pest And Disease Control Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allPestAndDiseaseControl')}
                  >
                    All Pest And Disease Control Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchPestAndDiseaseControl' && (
                    <div>
                      <MaizeBatchPestAndDiseaseControlRecord />
                    </div>
                  )}
                  {selectedAction === 'allPestAndDiseaseControl' && (
                    <div>
                      {/* Render All Pest And Disease Control Records component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 16 && (
                <div>
                  <button
                    className="btn btn-primary me-2                     mr-2"
                    onClick={() => handleActionClick('batchFertilizerApplication')}
                  >
                    Batch Fertilizer Application Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allFertilizerApplication')}
                  >
                    All Fertilizer Application Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchFertilizerApplication' && (
                    <div>
                      <MaizeBatchFertilizerApplicationRecord />
                    </div>
                  )}
                  {selectedAction === 'allFertilizerApplication' && (
                    <div>
                      {/* Render All Fertilizer Application Records component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 17 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('batchHarvestRecords')}
                  >
                    Batch Harvest Records
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allHarvestRecords')}
                  >
                    All Harvest Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchHarvestRecords' && (
                    <div>
                      <MaizeBatchHarvestRecord />
                    </div>
                  )}
                  {selectedAction === 'allHarvestRecords' && (
                    <div>
                      {/* Render All Harvest Records component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 19 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('allMaizeFarmActivities')}
                  >
                    All Maize Farm Activities Report
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'allMaizeFarmActivities' && (
                    <div>
                      <MaizeAllFarmActivitiesReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 21 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('batchExpense')}
                  >
                    Batch Expense Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allExpense')}
                  >
                    All Expense Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchExpense' && (
                    <div>
                      <MaizeBatchExpense />
                    </div>
                  )}
                  {selectedAction === 'allExpense' && (
                    <div>
                      {/* Render All Expense Records component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 31 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('batchIncome')}
                  >
                    Batch Income Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allIncome')}
                  >
                    All Income Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchIncome' && (
                    <div>
                      {/* Render Batch Income Record component */}
                    </div>
                  )}
                  {selectedAction === 'allIncome' && (
                    <div>
                      {/* Render All Income Records component */}
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 34 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2"
                    onClick={() => handleActionClick('batchProfitLoss')}
                  >
                    Batch Profit and Loss Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2"
                    onClick={() => handleActionClick('allProfitLoss')}
                  >
                    All Profit and Loss Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchProfitLoss' && (
                    <div>
                      {/* Render Batch Profit and Loss Record component */}
                    </div>
                  )}
                  {selectedAction === 'allProfitLoss' && (
                    <div>
                      {/* Render All Profit and Loss Records component */}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <CashCropFooter />
    </div>
  );
}

export default MaizeFarmManager;

