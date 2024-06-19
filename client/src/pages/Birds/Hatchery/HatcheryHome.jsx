import React, { useState } from 'react';
import BirdsFooter from '../BirdsFooter';
import LoadEggBatch from './LoadEggs';
import AllActiveEggBatches from './ActiveEggs';
import AllHatchesWithinPeriod from './AllHatchesWithinAPeriod';
import HatchedEggsByTypeAndPeriod from './HatcheryRecordByTypeAndDate';





const incomeExpenseItems = [
  {
    id: 1,
    title: 'Click Here For Hatchery Details',
    subItems: [
      { id: 11, title: 'Load Eggs' },
      { id: 15, title: 'View Active Eggs Profile' },
      { id: 16, title: 'View All Hatches Within A Period' },
      { id: 17, title: 'View Hatch Records by Bird Type And Date' },
     
     
      
    ]
  }
];

function BirdsHatcheryHome() {
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
          <h2 style={{ fontWeight: 'bold', color: 'green' }}>Hatchery</h2>
          <ul className="list-group">
            {incomeExpenseItems.map((item) => (
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
          {/* {selectedSubItem && selectedSubItem.id === 11 && <AddVegeIncome />} */}
          {selectedSubItem && selectedSubItem.id === 11 && <LoadEggBatch/>}
          {selectedSubItem && selectedSubItem.id === 15 && <AllActiveEggBatches/>}
          {selectedSubItem && selectedSubItem.id === 16 && <AllHatchesWithinPeriod/>}
          {selectedSubItem && selectedSubItem.id === 17 && <HatchedEggsByTypeAndPeriod/>}
          
          {!selectedSubItem && <p>Select an item from the sidebar to view details.</p>}
        </div>
      </div>
      <BirdsFooter toggleModal={toggleModal} />
    </div>
  );
}

export default BirdsHatcheryHome;
