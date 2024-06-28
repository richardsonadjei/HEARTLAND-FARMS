import React, { useState } from 'react';
import CashCropFooter from '../CashCropsFooter';
import PlantainBatchLandPreparationRecord from './reports/PlantainBatchLandPreparationsReport';
import PlantainBatchPlantingRecord from './reports/PlantainBatchPlantingRecord';
import PlantainBatchManualWeedingReport from './reports/PlantainBatchManualWeedingsReport';
import PlantainBatchWeedicideApplicationRecord from './reports/PlantainBatchWeedicideApplicationReport';
import PlantainBatchPestAndDiseaseControlRecord from './reports/PlantainBatchPestAndDiseasesControlReport';
import PlantainBatchFertilizerApplicationRecord from './reports/PlantainBatchFertilizerApplicationReport';
import PlantainBatchHarvestRecord from './reports/PlantainBatchHarvestRecord';
import PlantainAllFarmActivitiesReport from './reports/AllPlantainFarmActivitiesReport';

const farmItems = [
  {
    id: 1,
    title: 'Plantain Farm Activities Record',
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
];

function PlantainFarmManager() {
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
          <h2>Plantain Farm Book</h2>
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
              <h2>{selectedItem.title}</h2>

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
                  {selectedAction === 'batchLandPreparation' && (
                    <div>
                      <PlantainBatchLandPreparationRecord />
                    </div>
                  )}
                  {selectedAction === 'allLandPreparation' && (
                    <div>
                      <PlantainAllFarmActivitiesReport />
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
                  {selectedAction === 'batchPlanting' && (
                    <div>
                      <PlantainBatchPlantingRecord />
                    </div>
                  )}
                  {selectedAction === 'allPlanting' && (
                    <div>
                      <PlantainAllFarmActivitiesReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 13 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchManualWeeding')}
                  >
                    Batch Manual Weeding Report
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('allManualWeeding')}
                  >
                    All Manual Weeding Records
                  </button>
                  {selectedAction === 'batchManualWeeding' && (
                    <div>
                      <PlantainBatchManualWeedingReport />
                    </div>
                  )}
                  {selectedAction === 'allManualWeeding' && (
                    <div>
                      <PlantainAllFarmActivitiesReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 14 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchWeedicideApplication')}
                  >
                    Batch Weedicide Application Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('allWeedicideApplication')}
                  >
                    All Weedicide Application Records
                  </button>
                  {selectedAction === 'batchWeedicideApplication' && (
                    <div>
                      <PlantainBatchWeedicideApplicationRecord />
                    </div>
                  )}
                  {selectedAction === 'allWeedicideApplication' && (
                    <div>
                      <PlantainAllFarmActivitiesReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 15 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchPestAndDiseaseControl')}
                  >
                    Batch Pest And Disease Control Record
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('allPestAndDiseaseControl')}
                  >
                    All Pest And Disease Control Records
                  </button>
                  {selectedAction === 'batchPestAndDiseaseControl' && (
                    <div>
                      <PlantainBatchPestAndDiseaseControlRecord />
                    </div>
                  )}
                  {selectedAction === 'allPestAndDiseaseControl' && (
                    <div>
                      <PlantainAllFarmActivitiesReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 16 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchFertilizerApplication')}
                  >
                    Batch Fertilizer Application
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('allFertilizerApplicationReport')}
                  >
                    All Fertilizer Application Records
                  </button>
                  {selectedAction === 'batchFertilizerApplication' && (
                    <div>
                      <PlantainBatchFertilizerApplicationRecord />
                    </div>
                  )}
                  {selectedAction === 'allFertilizerApplicationReport' && (
                    <div>
                      <PlantainAllFarmActivitiesReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 17 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('batchHarvestRecords')}
                  >
                    Batch Harvest Records
                  </button>
                  <button
                    className="btn btn-secondary me-2 mt-2"
                    onClick={() => handleActionClick('allHarvestRecords')}
                  >
                    All Harvest Records
                  </button>
                  {selectedAction === 'batchHarvestRecords' && (
                    <div>
                      <PlantainBatchHarvestRecord />
                    </div>
                  )}
                  {selectedAction === 'allHarvestRecords' && (
                    <div>
                      <PlantainAllFarmActivitiesReport />
                    </div>
                  )}
                </div>
              )}

              {selectedSubItem && selectedSubItem.id === 19 && (
                <div>
                  <button
                    className="btn btn-primary me-2 mt-2"
                    onClick={() => handleActionClick('allFarmActivities')}
                  >
                    All Plantain Farm Activities Record
                  </button>
                  {selectedAction === 'allFarmActivities' && (
                    <div>
                      <PlantainAllFarmActivitiesReport />
                    </div>
                  )}
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

export default PlantainFarmManager;

