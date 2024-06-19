import React, { useState } from 'react';
import NewAnimal from './NewAnimal';
import AnimalsFooter from './AnimalsFooter';
import AllAnimalTypes from './reports/AllAnimalTypesReport';
import AllAnimalsReport from './reports/AllAnimalsReport';
import AnimalMedicalTreatmentGroup from './extras/AddMedicalTreatmentGroup';
import AllAnimalMedicalTreatmentGroups from './extras/AllMedicalTreatmentGroupReport';




const extrasItems = [
  {
    id: 1,
    title: 'Click To View More Features',
    subItems: [
      { id: 11, title: 'Add New Animal' },
      { id: 12, title: 'View All Animal Types' },
      { id: 13, title: 'View All Animals' },
      { id: 14, title: 'Add Medical Treatment Group' },
      { id: 16, title: 'All Medical Treatment Groups' },
     
     
    ],
  }
];

function AnimalsExtras() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedSubItem, setSelectedSubItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setSelectedSubItem(null); // Reset selected sub-item when main item is clicked
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubItemClick = (subItem) => {
    setSelectedSubItem(subItem);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 sidebar">
          <h2>Extras</h2>
          <ul className="list-group">
            {extrasItems.map((item) => (
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
          {selectedSubItem && selectedSubItem.id === 11 && <NewAnimal />}
          {selectedSubItem && selectedSubItem.id === 12 && <AllAnimalTypes />}
          {selectedSubItem && selectedSubItem.id === 13 && <AllAnimalsReport/>}
          {selectedSubItem && selectedSubItem.id === 14 && <AnimalMedicalTreatmentGroup/>}  
          {selectedSubItem && selectedSubItem.id === 16 && <AllAnimalMedicalTreatmentGroups/>}  
         
          
        </div>
      </div>
      <AnimalsFooter toggleModal={toggleModal} />
    </div>
  );
}

export default AnimalsExtras;
