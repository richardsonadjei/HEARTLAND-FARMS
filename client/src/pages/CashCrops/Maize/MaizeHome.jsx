import React, { useState } from 'react';
import CashCropFooter from '../CashCropsFooter';
import MaizeBatchLandPreparationRecord from './reports/MaizeBatchLandPreparationRecord';
import MaizeBatchPlantingRecord from './reports/MaizeBatchPlantingRecord';
import MaizeBatchManualWeedingReport from './reports/MaizeBatchManualWeedingReport';
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
      { id: 18, title: 'Post-Harvest Management' },
      { id: 19, title: 'All Farm Activities' },
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

  return (
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-3 sidebar ">
          <h2>Maize Farm Book</h2>
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
                    onClick={() => handleActionClick('batchLandPreparation')}
                  >
                    Batch Land Preparation Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allLandPreparation')}
                  >
                    All Land Preparation Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchLandPreparation' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <MaizeBatchLandPreparationRecord />
                    </div>
                  )}
                  {selectedAction === 'aallLandPreparation' && (
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
                    onClick={() => handleActionClick('batchPlanting')}
                  >
                    Batch Planting Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mr-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allPlanting')}
                  >
                    All Planting Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchPlanting' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <MaizeBatchPlantingRecord/>
                    </div>
                  )}
                  {selectedAction === 'allPlanting' && (
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
                    onClick={() => handleActionClick('batchManualWeeding')}
                  >
                    Batch Manual Weeding Report
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allManualWeeding')}
                  >
                    All Direct Planting Record
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchManualWeeding' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <MaizeBatchManualWeedingReport/>
                    </div>
                  )}
                  {selectedAction === 'allManualWeeding' && (
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
                    onClick={() => handleActionClick('batchWeedidideApplication')}
                  >
                    Batch Weedicide Application Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allWeedicideApplication')}
                  >
                    All Weedicide Applicaion Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchWeedidideApplication' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <MaizeBatchWeedicideApplicationRecord/>
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
                    onClick={() => handleActionClick('batchPestAndDiseaseControl')}
                  >
                    Batch Pest And Disease Control Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allPestAndDiseaseControl')}
                  >
                    All Pest And Weed Disease Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchPestAndDiseaseControl' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <MaizeBatchPestAndDiseaseControlRecord/>
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
                    onClick={() => handleActionClick('batchFertilizerApplication')}
                  >
                    Batch Fertilizer Applicaion
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allFertilizerApplicationReport')}
                  >
                    All Spring Onions Other Activities Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchFertilizerApplication' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <MaizeBatchFertilizerApplicationRecord/>
                    </div>
                  )}
                  {selectedAction === 'allFertilizerApplicationReport' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllGreenPepperPestAndWeedControlReport/>
                    </div>
                  )}

                  
                </div>
              )}

{selectedSubItem && selectedSubItem.id === 17 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchHarvestRecords')}
                  >
                    Batch Harvest Records
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allHarvestRecords')}
                  >
                    All Spring Onions Other Activities Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchHarvestRecords' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <MaizeBatchHarvestRecord/>
                    </div>
                  )}
                  {selectedAction === 'allFertilizerApplicationReport' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllGreenPepperPestAndWeedControlReport/>
                    </div>
                  )}

                  
                </div>
              )}

{selectedSubItem && selectedSubItem.id === 19 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('allFarmActivies')}
                  >
                    All Maize Farm Activities Record
                  </button>
                  
                  {/* Render components based on selected action */}
                  {selectedAction === 'allFarmActivies' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <MaizeAllFarmActivitiesReport/>
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
                      <MaizeBatchExpense />
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
      <CashCropFooter toggleModal={toggleModal} />
    </div>
  );
}

export default MaizeFarmManager;
