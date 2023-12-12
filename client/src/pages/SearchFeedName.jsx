// SearchFeedName.jsx

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Link } from 'react-router-dom';


const SearchFeedName = () => {
  const [options, setOptions] = useState([]);
  const [selectedFeed, setSelectedFeed] = useState(null);

  useEffect(() => {
    const fetchFeedNames = async () => {
      try {
        const response = await fetch('/api/search-feed-name');
        const data = await response.json();

        if (data && Array.isArray(data)) {
          const feedNames = data.map((feed) => ({
            value: feed._id,
            label: feed.feedName,
          }));
          setOptions(feedNames);
        } else {
          console.error('Invalid data format received from the server');
        }
      } catch (error) {
        console.error('Error fetching feed names:', error);
      }
    };

    fetchFeedNames();
  }, []);

  const handleFeedChange = (selectedOption) => {
    setSelectedFeed(selectedOption);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : 'black',
      backgroundColor: state.isSelected ? '#007BFF' : 'white',
      ':hover': {
        backgroundColor: '#007BFF',
        color: 'white',
      },
    }),
  };

  return (
    <div className="search-feed-container">
      <h2>Search Feed by Name</h2>
      <div className="search-field-container">
        <Select
          placeholder="Select a Feed"
          options={options}
          onChange={handleFeedChange}
          value={selectedFeed}
          styles={customStyles}
        />

        {selectedFeed && (
          <Link to={`/view-feed/${selectedFeed.value}`}>
            <button className="search-button">
              View Feed Details
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SearchFeedName;
