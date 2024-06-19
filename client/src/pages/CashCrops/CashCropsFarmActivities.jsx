import React, { useState } from 'react';
import CashCropFooter from './CashCropsFooter';
import CashCropLandPreparation from './farmActivities/LandPreparation';
import CashCropPlanting from './farmActivities/Planting';
import ManualWeeding from './farmActivities/ManualWeeding';
import CashCropWeedicideApplication from './farmActivities/WeedicideApplication';
import CashCropPestAndDiseaseControl from './farmActivities/PestAndDiseaseControl';
import CashCropFertilizerApplication from './farmActivities/FertlilizerApplication';
import CashCropHarvest from './farmActivities/Harvest';
import AllCashCropsActivitiesReports from './AllCashCropsActivitiesReport';


const farmActivities = [
  {
    id: 1,
    title: 'Cash Crop Farm Activities ',
    subItems: [
      { id: 11, title: 'Land Preparation' },
      { id: 12, title: 'Nursery' },
      { id: 13, title: 'Planting' },
      { id: 14, title: 'Irrigation' },
      { id: 15, title: 'Manual Weeding' },
      { id: 16, title: 'Weedicide Application' },
      { id: 17, title: 'Pest And Diseases Control' },
      { id: 18, title: 'Fertilizer And Manure Application' },
      { id: 19, title: 'Harvesting' },
      { id: 20, title: 'Post-Harvest Management' },
      { id: 25, title: 'All CashCrops Farm Activities' },
     
    ],
  }
];

function CashCropAllFarmActivities() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedSubItem(null); // Reset selected sub-item when main item is clicked
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          <h2 style={{ fontWeight: 'bold', color: 'blue' }}>Farm Activities</h2>
          <ul className="list-group">
            {farmActivities.map((item) => (
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
          {selectedSubItem && selectedSubItem.id === 11 && <CashCropLandPreparation />}
          {selectedSubItem && selectedSubItem.id === 13 && <CashCropPlanting />}
          {selectedSubItem && selectedSubItem.id === 15 && <ManualWeeding/>}
          {selectedSubItem && selectedSubItem.id === 16 && <CashCropWeedicideApplication/>}
          {selectedSubItem && selectedSubItem.id === 17 && <CashCropPestAndDiseaseControl/>}
          {selectedSubItem && selectedSubItem.id === 18 && <CashCropFertilizerApplication/>}
          {selectedSubItem && selectedSubItem.id === 19 && <CashCropHarvest/>}
          {selectedSubItem && selectedSubItem.id === 25 && <AllCashCropsActivitiesReports/>} 


          {!selectedSubItem && <p>Select an item from the sidebar to view details.</p>}
        </div>
      </div>
      <CashCropFooter toggleModal={toggleModal} />
    </div>
  );
}

export default CashCropAllFarmActivities;
