import React, { useState } from 'react';
import SpringOnionBatchNurseryReport from './reports/SpringOnionNurseryReport';
import SpringOnionsBatchTransplantingReport from './reports/SpringOnionBatchTransplantingReport';
import AllSpringOnionsNursingRecords from './reports/AllSpringOnionNurseryRecords';
import AllSpringOnionsTransplantingReport from './reports/AllSpringOnionTransplantingRecord';
import SpringOnionsDirectPlanting from './reports/SpringOnionsDIrectPlantingRecord';
import AllSpringOnionsDirectPlantingReport from './reports/AllSpringOnionsDirectPlantingRecord';
import SpringOnionFertilizerApplication from './reports/SpringOnionsFertilizerApplicationReport';
import AllSpringOnionsFertilizerApplicationRecord from './reports/AllSpringOnionsFertlizingRecord';
import SpringOnionsPestAndWeedControl from './reports/SpringOnionPestAndWeedControl';
import AllSpringOnionsPestAndWeedControlReport from './reports/AllSpringOnionsPestAndWeedControlReport';
import VegeFooter from '../VegeFooter';
import SpringOnionsBatchExpense from './reports/SpringOnionsBatchExpenseReport';
import SpringOnionBatchIncome from './reports/SpringOnionsBatchIncomeReport';
import SpringOnionsProfitLossReport from './reports/SpringOnionBatchProfitAndLossReport';
import SpringOnionsBatchOtherActivitiesRecords from './reports/SpringOnionsBatchOtherActivitiesRecords';



const farmItems = [
  {
    id: 1,
    title: 'Spring Onion Farm Activities Record',
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
      { id: 21, title: 'View Expenses ' },

     
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

function SpringOnionFarmManager() {
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
          <h2>Spring Onion Farm Book</h2>
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
                    onClick={() => handleActionClick('batchNursery')}
                  >
                    Batch Nursery Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allNursery')}
                  >
                    All Nursery Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchNursery' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <SpringOnionBatchNurseryReport />
                    </div>
                  )}
                  {selectedAction === 'allNursery' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllSpringOnionsNursingRecords/>
                    </div>
                  )}

                  
                </div>
              )}

{selectedSubItem && selectedSubItem.id === 12 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mr-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchTransplanting')}
                  >
                    Batch Transplanting Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allTransplanting')}
                  >
                    All Transplanting Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchTransplanting' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <SpringOnionsBatchTransplantingReport/>
                    </div>
                  )}
                  {selectedAction === 'allTransplanting' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllSpringOnionsTransplantingReport/>
                    </div>
                  )}

                  
                </div>
              )}
{selectedSubItem && selectedSubItem.id === 13 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchDirectPlanting')}
                  >
                    Batch Direct Planting Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allDirectPlanting')}
                  >
                    All Direct Planting Record
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchDirectPlanting' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <SpringOnionsDirectPlanting/>
                    </div>
                  )}
                  {selectedAction === 'allDirectPlanting' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllSpringOnionsDirectPlantingReport/>
                    </div>
                  )}

                  
                </div>
              )}

{selectedSubItem && selectedSubItem.id === 14 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchFertilizerApplication')}
                  >
                    Batch Fertilizer Application Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allFertilizerApplication')}
                  >
                    All Fertilizer Applicaion Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchFertilizerApplication' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <SpringOnionFertilizerApplication/>
                    </div>
                  )}
                  {selectedAction === 'allFertilizerApplication' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllSpringOnionsFertilizerApplicationRecord/>
                    </div>
                  )}

                  
                </div>
              )}


{selectedSubItem && selectedSubItem.id === 15 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchPestAndWeedControl')}
                  >
                    Batch Pest And Weed Control Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allPestAndWeedControl')}
                  >
                    All Pest And Weed Control Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchPestAndWeedControl' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <SpringOnionsPestAndWeedControl/>
                    </div>
                  )}
                  {selectedAction === 'allPestAndWeedControl' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllSpringOnionsPestAndWeedControlReport/>
                    </div>
                  )}

                  
                </div>
              )}


{selectedSubItem && selectedSubItem.id === 16 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchOtherActivities')}
                  >
                    Batch Other Activities
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allOtherActivities')}
                  >
                    All Spring Onions Other Activities Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchOtherActivities' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <SpringOnionsBatchOtherActivitiesRecords/>
                    </div>
                  )}
                  {selectedAction === 'allOtherActivities' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllGreenPepperPestAndWeedControlReport/>
                    </div>
                  )}

                  
                </div>
              )}

{selectedSubItem && selectedSubItem.id === 18 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('allFarmActivies')}
                  >
                    All Cabbage Farm Activities Record
                  </button>
                  
                  {/* Render components based on selected action */}
                  {selectedAction === 'allFarmActivies' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <AllCabbageFarmActivitiesReport/>
                    </div>
                  )}
                  

                  
                </div>
              )}

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
                      <SpringOnionsBatchExpense />
                    </div>
                  )}
                  {selectedAction === 'allExpense' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllCabbageExpenses/>
                    </div>
                  )}

                  
                </div>
              )}
            </div>
          )}

{selectedSubItem && selectedSubItem.id === 31 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchIncome')}
                  >
                    Batch Income
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('batchIncome')}
                  >
                   Other Income
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchIncome' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <SpringOnionBatchIncome/>
                    </div>
                  )}
                  {selectedAction === 'oherIncome' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllCabbageFertilizerApplicationRecord/>
                    </div>
                  )}

                  
                </div>
              )}

{selectedSubItem && selectedSubItem.id === 34 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchProfitLoss')}
                  >
                    Batch Profit And Loss
                  </button>
                  
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchProfitLoss' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <SpringOnionsProfitLossReport/>
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

export default SpringOnionFarmManager;
