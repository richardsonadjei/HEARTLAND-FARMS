import React, { useState } from 'react';
import VegeFooter from '../VegeFooter';
import GreenPepperBatchNurseryReport from './Reports/GreenPepperBatchNurseryReport';
import AllGreenPepperNursingRecords from './Reports/AllGreenPepperNursingRecords';
import GreenPepperBatchTransplantingReport from './GreenPepperTransplantingBatchRecords';
import AllGreenPepperTransplantingReport from './Reports/AllGreenPepperTransplantingReport';
import GreenPepperDirectPlanting from './Reports/GreenPepperDirectPlanting';
import AllGreenPepperDirectPlantingReport from './Reports/AllGreenPepperDirectPlantingReport';
import GreenPepperBatchFertilizerApplication from './Reports/GreenPepperFertilizerApplicationReport';
import AllGreenPepperFertilizerApplicationRecord from './Reports/AllGreenPepperFertilizerApplication';
import GreenPepperPestAndWeedControl from './Reports/GreenPepperPestAndWeedControlReport';
import AllGreenPepperPestAndWeedControlReport from './Reports/AllGreenPepperPestAndWeedControl';
import GreenPepperBatchOtherActivitiesRecords from './Reports/GreenPepperOtherActivitiesReport';
import AllGreenPepperOtherActivitiesRecords from './Reports/AllGreenPepperOtherActivitiesReport';
import GreenPepperBatchHarvestingRecords from './Reports/GreenPepperHarvestRecords';
import GreenPepperAllFarmActivitiesReport from './Reports/AllGreenPepperFarmActivitiesRecords';
import GreenPepperBatchExpense from './Reports/GreenPepperBatchExpenseReport';
import GreenPepperBatchIncome from './Reports/GreenPepperSalesReport';
import GreenPepperProfitLossReport from './Reports/GreenPepperProfitAndLossReport';
import { useSelector } from 'react-redux';




const farmItems = [
  {
    id: 1,
    title: 'Green Pepper Farm Activities Record',
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

function GreenPepperFarmManager() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);
  const [selectedAction, setSelectedAction] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const currentUser = useSelector((state) => state.user.currentUser);
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
          <h2>Green Pepper Farm Book</h2>
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
                      <GreenPepperBatchNurseryReport />
                    </div>
                  )}
                  {selectedAction === 'allNursery' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllGreenPepperNursingRecords/>
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
                      <GreenPepperBatchTransplantingReport/>
                    </div>
                  )}
                  {selectedAction === 'allTransplanting' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllGreenPepperTransplantingReport/>
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
                      <GreenPepperDirectPlanting />
                    </div>
                  )}
                  {selectedAction === 'allDirectPlanting' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllGreenPepperDirectPlantingReport/>
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
                      <GreenPepperBatchFertilizerApplication/>
                    </div>
                  )}
                  {selectedAction === 'allFertilizerApplication' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllGreenPepperFertilizerApplicationRecord/>
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
                      <GreenPepperPestAndWeedControl/>
                    </div>
                  )}
                  {selectedAction === 'allPestAndWeedControl' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllGreenPepperPestAndWeedControlReport/>
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
                    All Green Pepper Other Activities Records
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchOtherActivities' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <GreenPepperBatchOtherActivitiesRecords/>
                    </div>
                  )}
                  {selectedAction === 'allOtherActivities' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllGreenPepperOtherActivitiesRecords/>
                    </div>
                  )}

                  
                </div>
              )}

{selectedSubItem && selectedSubItem.id === 17 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchHarvesting')}
                  >
                    Batch Harvesting
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchHarvesting' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <GreenPepperBatchHarvestingRecords/>
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
                    All Green Pepper Farm Activities Record
                  </button>
                  
                  {/* Render components based on selected action */}
                  {selectedAction === 'allFarmActivies' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <GreenPepperAllFarmActivitiesReport/>
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
                      <GreenPepperBatchExpense/>
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
                      <GreenPepperBatchIncome/>
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
                      <GreenPepperProfitLossReport/>
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

export default GreenPepperFarmManager;
