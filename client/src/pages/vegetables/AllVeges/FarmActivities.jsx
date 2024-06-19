import React, { useState } from 'react';
import NurseSeed from './NurseSeeds'; // Import the NurseSeed component
import VegeTransplanting from './VegeTransplanting';
import VegeDirectPlanting from './VegeDirectPlanting';
import VegeFertilizerApplication from './VegeFertilizerApplication';
import VegeOtherActivities from './VegeOtherActivities';
import VegeHarvest from './VegeHarvest';
import VegePestAndWeedControl from './VegePestAndWeedControl';
import VegeFooter from '../VegeFooter';

const farmActivities = [
  {
    id: 1,
    title: 'Farm Activities ',
    subItems: [
      { id: 11, title: 'Nursery' },
      { id: 12, title: 'Transplanting' },
      { id: 13, title: 'Direct Planting' },
      { id: 14, title: 'Fertilizing' },
      { id: 15, title: 'Pest And Weed Control' },
      { id: 17, title: 'Harvesting' },
      { id: 16, title: 'Other Activities' },
     
     
    ],
  }
];

function AllFarmActivities() {
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
          {selectedSubItem && selectedSubItem.id === 11 && <NurseSeed />}
          {selectedSubItem && selectedSubItem.id === 12 && <VegeTransplanting />}
          {selectedSubItem && selectedSubItem.id === 13 && <VegeDirectPlanting/>}
          {selectedSubItem && selectedSubItem.id === 14 && <VegeFertilizerApplication/>}
          {selectedSubItem && selectedSubItem.id === 15 && <VegePestAndWeedControl/>}
          {selectedSubItem && selectedSubItem.id === 16 && <VegeOtherActivities/>}
          {selectedSubItem && selectedSubItem.id === 17 && <VegeHarvest/>}


          {!selectedSubItem && <p>Select an item from the sidebar to view details.</p>}
        </div>
      </div>
      <VegeFooter toggleModal={toggleModal} />
    </div>
  );
}

export default AllFarmActivities;
