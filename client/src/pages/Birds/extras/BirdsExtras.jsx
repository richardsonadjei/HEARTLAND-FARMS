import React, { useState } from 'react';
import NewBird from './NewBird';
import BirdsFooter from '../BirdsFooter';
import AllBirdsTypes from '../reports/AllBirdsTypesReport';
import NewBirdBreed from './NewBreed';
import AllBirdBreeds from '../reports/AllBirdBreedsReport';
import AddMedicationCategory from './AddMedicationCategories';
import AllMedicationCategories from './AllMedicationCategories';
import AddBirdDrug from './AddBirdDrugs';
import AddFarmSection from './FarmSection';
import NewFeedName from './NewFeedName';
import AllFeedNames from './AllFeedNames';
import RegisterIncubator from './RegisterIncubator';
import AllIncubators from './AllIncubators';





const extrasItems = [
  {
    id: 1,
    title: 'Click To View More Features',
    subItems: [
      { id: 11, title: 'Add New Bird' },
      { id: 12, title: 'View Bird Types' },
      { id: 13, title: 'Add New Breed' },
      { id: 14, title: 'All Bird Breeds' },
      { id: 16, title: 'Add Medicine Category' },
      { id: 17, title: 'View All Medicine Categories' },
      { id: 18, title: 'Register New Drug' },
      { id: 19, title: 'Add Farm Section' },
      { id: 20, title: 'Add New Feed Name' },
      { id: 21, title: 'All Feed Name' },
      { id: 22, title: 'Register A New Incubator' },
      { id: 23, title: 'View All Incubators' },
    
    ],
  }
];

function BirdExtras() {
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
          {selectedSubItem && selectedSubItem.id === 11 && <NewBird/>}
          {selectedSubItem && selectedSubItem.id === 12 && <AllBirdsTypes />}
          {selectedSubItem && selectedSubItem.id === 13 && <NewBirdBreed/>}
          {selectedSubItem && selectedSubItem.id === 14 && <AllBirdBreeds/>}  
          {selectedSubItem && selectedSubItem.id === 16 && <AddMedicationCategory/>}  
          {selectedSubItem && selectedSubItem.id === 17 && <AllMedicationCategories/>}  
          {selectedSubItem && selectedSubItem.id === 18 && <AddBirdDrug/>}  
          {selectedSubItem && selectedSubItem.id === 19 && <AddFarmSection/>}  
          {selectedSubItem && selectedSubItem.id === 20 && <NewFeedName/>}  
          {selectedSubItem && selectedSubItem.id === 21 && <AllFeedNames/>}  
          {selectedSubItem && selectedSubItem.id === 22 && <RegisterIncubator/>}  
          {selectedSubItem && selectedSubItem.id === 23 && <AllIncubators/>}  
         
          
        </div>
      </div>
      <BirdsFooter toggleModal={toggleModal} />
    </div>
  );
}

export default BirdExtras;
