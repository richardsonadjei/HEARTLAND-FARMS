import React, { useState } from 'react';
import AnimalsFooter from './AnimalsFooter';
import NewAnimalIDModal from './NewAnimalIDModal'; // Import the NewAnimalIDModal component
import AnimalBirth from './farm Activities/AnimalBirths';
import Vaccination from './farm Activities/Vaccination';
import AddAnimalTreatmentRecord from './farm Activities/MedicalTreatment';
import AddAnimalWeightRecord from './farm Activities/AnimalWeight';
import AnimalMortalityRecord from './farm Activities/AnimalMortality';

const farmActivities = [
  {
    id: 1,
    title: 'Click To Add Animal Farm Record ',
    subItems: [
      { id: 11, title: 'Add New Goat Id/New Animal Purchase' },
      { id: 12, title: 'Record Birth ' },
      { id: 13, title: 'Record Vaccination ' },
      { id: 14, title: 'Records Medical Treatment' },
      { id: 15, title: 'Records Growth Rate/Weight ' },
      { id: 16, title: 'Records Mortality' },
      { id: 17, title: 'Others ' },
      
    ],
  }
];

function AnimalFarmActivities() {
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
          {selectedSubItem && selectedSubItem.id === 11 && <NewAnimalIDModal isOpen={isModalOpen} toggleModal={toggleModal} />}
          {selectedSubItem && selectedSubItem.id === 12 && <AnimalBirth/>}
          {selectedSubItem && selectedSubItem.id === 13 && <Vaccination/>}
          {selectedSubItem && selectedSubItem.id === 14 && <AddAnimalTreatmentRecord/>}
          {selectedSubItem && selectedSubItem.id === 15 && <AddAnimalWeightRecord/>}
          {selectedSubItem && selectedSubItem.id === 16 && <AnimalMortalityRecord/>}
          {selectedSubItem && selectedSubItem.id === 17 && <CashCropHarvest/>}
          {!selectedSubItem && <p>Select an item from the sidebar to view details.</p>}
        </div>
      </div>
      <AnimalsFooter toggleModal={toggleModal} />
    </div>
  );
}

export default AnimalFarmActivities;
