import React, { useState } from 'react';
import CashCropFooter from '../CashCropsFooter';
import CassavaBatchLandPreparationRecord from './reports/CassavaBatchLandPreparations';
import CassavaBatchPlantingRecord from './reports/CassavaBatchPlantingRecord';
import CassavaBatchManualWeedingReport from './reports/CassavaBatchManualWeedingRecord';
import CassavaBatchWeedicideApplicationRecord from './reports/CassavaBatchWeedicideApplicationRecord';
import CassavaBatchPestAndDiseaseControlRecord from './reports/CassavaBatchPestAndDiseasesReport';
import CassavaBatchFertilizerApplicationRecord from './reports/CassavaBatchFertilizerApplicationReport';
import CassavaBatchHarvestRecord from './reports/CassavaBatchHarvestReport';
import CassavaAllFarmActivitiesReport from './reports/AllCassavaFarmActivitiesReport';

// Import useSelector from react-redux to fetch current user
import { useSelector } from 'react-redux';

const farmItems = [
  {
    id: 1,
    title: 'Cassava Farm Activities Record',
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

function CassavaFarmManager() {
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
    <div className="container-fluid ">
      <div className="row">
        <div className="col-md-3 sidebar ">
          <h2>Cassava Farm Book</h2>
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
                      <CassavaBatchLandPreparationRecord />
                    </div>
                  )}
                  {selectedAction === 'allLandPreparation' && (
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
                      <CassavaBatchPlantingRecord/>
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
                      <CassavaBatchManualWeedingReport/>
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
                      <CassavaBatchWeedicideApplicationRecord/>
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
                  <button                   className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchPestAndDiseaseControl')}
                  >
                    Batch Pest And Disease Control Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allPestAndDiseaseControl')}
                  >
                    All Cassava Pest And Disease Control Record
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchPestAndDiseaseControl' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <CassavaBatchPestAndDiseaseControlRecord/>
                    </div>
                  )}
                  {selectedAction === 'allPestAndDiseaseControl' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllSpringOnionsDirectPestAndDiseaseControlReport/>
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
                    Batch Fertilizer And Manure Application Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allFertilizerApplication')}
                  >
                    All Cassava Fertilizer And Manure Application Record
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchFertilizerApplication' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <CassavaBatchFertilizerApplicationRecord/>
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

              {selectedSubItem && selectedSubItem.id === 17 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchHarvestRecord')}
                  >
                    Batch Harvest Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allHarvestRecord')}
                  >
                    All Cassava Harvest Record
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchHarvestRecord' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <CassavaBatchHarvestRecord/>
                    </div>
                  )}
                  {selectedAction === 'allHarvestRecord' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllSpringOnionsHarvestReport/>
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 18 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('batchPostHarvestManagement')}
                  >
                    Batch Post Harvest Management
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2" // Add Bootstrap classes for secondary button
                    onClick={() => handleActionClick('allPostHarvestManagement')}
                  >
                    All Cassava Post Harvest Management Record
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'batchPostHarvestManagement' && (
                    <div>
                      {/* Render Batch Nursery Record component */}
                      <CassavaBatchPostHarvestManagementRecord/>
                    </div>
                  )}
                  {selectedAction === 'allPostHarvestManagement' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <AllSpringOnionsPostHarvestManagementRecord/>
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 19 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2" // Add Bootstrap classes for primary button and margin
                    onClick={() => handleActionClick('allFarmActivities')}
                  >
                    All Cassava Farm Activities Record
                  </button>
                  {/* Render components based on selected action */}
                  {selectedAction === 'allFarmActivities' && (
                    <div>
                      {/* Render All Nursery Records component */}
                      <CassavaAllFarmActivitiesReport/>
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

export default CassavaFarmManager;

                   
