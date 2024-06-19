import React, { useState } from 'react';

import BirdsFooter from '../BirdsFooter';

import NewBirdBatch from './NewBirdBatch';
import AddBirdsToBatch from './AddBirdsToABatch';
import AddBirdVaccinationChart from './AddBirdVaccinationChart';
import VaccinateBird from './VaccinateBirds';
import RecordBirdMortality from './RecordMortality';
import CollectEggs from './CollectEggs';
import DewormBird from './DewormBirds';
import PurchaseFeed from './PurchaseFeed';
import BirdFeedStock from '../reports/BirdFeedStockReport';
import PeriodicFeedPurchasesReport from '../reports/PeriodicFeedPurchaseReport';
import IssueBirdFeed from './IssueBirdFeed';
import PeriodicFeedIssueReport from '../reports/BirdFeedIssuedReport';
import BirdHealthDiagnosis from './DiagnoseBirds';
import RelocateBirds from './RelocateBirds';

const farmActivities = [
  {
    id: 1,
    title: 'Click To Add Stock Monitoring Record ',
    subItems: [
      { id: 11, title: 'Add New Batch' },
      { id: 12, title: 'Add Birds To An Existing Stock ' },
      { id: 13, title: 'Update An Existing Stock ' },
      { id: 14, title: 'Relocate Birds' },
      { id: 15, title: 'Take Stock' },
      { id: 16, title: 'Records Mortality' },
      
    ],
  },
  {
    id: 2,
    title: 'Click To Add Egg Monitoring Record ',
    subItems: [
      { id: 18, title: 'Record Eggs Collected' },
     
      
    ],
  },
  {
    id: 3,
    title: 'Click To Add Feed Monitoring Record',
    subItems: [
      { id: 31, title: 'Record Feed Purchased' },
      { id: 19, title: 'View Feed Purchased' },
      { id: 20, title: 'View Feed Stock' },
      { id: 35, title: 'Issue Feed' },
      { id: 36, title: 'View All Feed Issued' },
      
      
    ],
  },

  {
    id: 4,
    title: 'Click To Add Health And Medication Record',
    subItems: [
      { id: 22, title: 'Add Vaccine To Vaccination Cycle' },
      { id: 23, title: 'Vaccinate Birds' },
      { id: 24, title: 'Deworm Birds' },
      { id: 25, title: 'Record Sick Bird Diagnosis' },
    
      
    ],
  },
];

function BirdFarmActivities() {
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
    if (subItem.id === 11) {
      toggleModal(); // Open the modal when the sub-item with id 11 is clicked
    }
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
          {selectedSubItem && selectedSubItem.id === 11 && <NewBirdBatch/>}
          {selectedSubItem && selectedSubItem.id === 12 && <AddBirdsToBatch/>}
          {selectedSubItem && selectedSubItem.id === 14 && <RelocateBirds/>}
          {selectedSubItem && selectedSubItem.id === 22 && <AddBirdVaccinationChart/>}
          {selectedSubItem && selectedSubItem.id === 23 && <VaccinateBird/>}
          {selectedSubItem && selectedSubItem.id === 25 && <BirdHealthDiagnosis/>}
          {selectedSubItem && selectedSubItem.id === 16 && <RecordBirdMortality/>}
          {selectedSubItem && selectedSubItem.id === 18 && <CollectEggs/>}
          {selectedSubItem && selectedSubItem.id === 17 && <CashCropHarvest/>} 
          {selectedSubItem && selectedSubItem.id === 24 && <DewormBird/>} 
          {selectedSubItem && selectedSubItem.id === 31 && <PurchaseFeed/>} 
          {selectedSubItem && selectedSubItem.id === 20 && <BirdFeedStock/>} 
          {selectedSubItem && selectedSubItem.id === 19 && <PeriodicFeedPurchasesReport/>} 
          {selectedSubItem && selectedSubItem.id === 35 && <IssueBirdFeed/>} 
          {selectedSubItem && selectedSubItem.id === 36 && <PeriodicFeedIssueReport/>} 
          {!selectedSubItem && <p>Select an item from the sidebar to view details.</p>}
        </div>
      </div>
      <BirdsFooter toggleModal={toggleModal} />
    </div>
  );
}

export default BirdFarmActivities;
