import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const BirdAgeCategoriesTable = () => {
  const defaultBirdType = 'Poultry'; // Default bird type
  const [ageCategories, setAgeCategories] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgeCategories = async () => {
      try {
        const response = await fetch(`/api/birds-by-age-category/${encodeURIComponent(defaultBirdType)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAgeCategories(data);
        setError(null);
      } catch (error) {
        console.error(`Error fetching bird age categories for ${defaultBirdType}:`, error);
        setAgeCategories({});
        setError(`Failed to fetch bird age categories data for ${defaultBirdType}`);
      }
    };

    fetchAgeCategories();
    const interval = setInterval(fetchAgeCategories, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderTableRows = () => {
    const rows = [];

    // Check if ageCategories is not empty and is an object
    if (Object.keys(ageCategories).length > 0 && typeof ageCategories === 'object') {
      Object.entries(ageCategories).forEach(([ageCategory, data]) => {
        if (data.totalQuantity === 0) return;

        const breeds = data.types ? Object.entries(data.types) : [['', { breeds: { '': data.totalQuantity } }]]; // Fallback to current data structure
        const ageCategoryRowSpan = breeds.reduce((acc, [_, typeData]) => {
          const breedCount = typeData.breeds ? Object.keys(typeData.breeds).length : 0;
          return acc + (breedCount || 1);
        }, 0);

        let firstAgeCategoryRendered = false;

        breeds.forEach(([type, typeData], typeIndex) => {
          const breedEntries = typeData.breeds ? Object.entries(typeData.breeds) : [['', typeData.totalQuantity]];

          breedEntries.forEach(([breed, quantity], breedIndex) => {
            rows.push(
              <tr key={`${ageCategory}-${breed}`}>
                {!firstAgeCategoryRendered && breedIndex === 0 && (
                  <td rowSpan={ageCategoryRowSpan}>{ageCategory}</td>
                )}
                <td>{breed || 'N/A'}</td>
                <td>{quantity}</td>
              </tr>
            );
          });

          if (breedEntries.length === 0) {
            rows.push(
              <tr key={`${ageCategory}-${type}-no-breeds`}>
                {!firstAgeCategoryRendered && typeIndex === 0 && (
                  <td rowSpan={ageCategoryRowSpan}>{ageCategory}</td>
                )}
                <td colSpan="2">No breeds available</td>
              </tr>
            );
          }

          firstAgeCategoryRendered = true;
        });
      });
    } else {
      // If ageCategories is empty or not an object, show a fallback message or component
      rows.push(
        <tr key="no-data">
          <td colSpan="3">No data available</td>
        </tr>
      );
    }

    return rows;
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{defaultBirdType} Age Categories</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Age Category</th>
              <th>Breed</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(ageCategories).length > 0 ? (
              renderTableRows()
            ) : (
              <tr>
                <td colSpan="3">No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
        {error && <Card.Text>{error}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default BirdAgeCategoriesTable;
