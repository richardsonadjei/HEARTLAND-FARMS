import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

const defaultBirdType = "Poultry"; // Define the default bird type

const EggsStockTable = ({ type }) => {
  const [sortedEggsStock, setSortedEggsStock] = useState([]);
  const [unsortedEggsStock, setUnsortedEggsStock] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEggsStock = async () => {
      try {
        const response = await fetch(`/api/eggs-stock/${defaultBirdType}`); // Fetch based on defaultBirdType
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSortedEggsStock(data.sortedEggsStock);
        setUnsortedEggsStock(data.unsortedEggsStock);
        setError(null);
      } catch (error) {
        console.error('Error fetching eggs stock:', error);
        setSortedEggsStock([]);
        setUnsortedEggsStock([]);
        setError('Failed to fetch eggs stock data');
      }
    };

    fetchEggsStock();
    const interval = setInterval(fetchEggsStock, 10000);
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <Card>
      <Card.Body>
        <Card.Title>{type === 'sorted' ? 'Sorted Eggs Stock' : 'Unsorted Eggs Stock'}</Card.Title>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Size</th>
              <th>Total Crates</th>
              <th>Total Loose</th>
            </tr>
          </thead>
          <tbody>
            {type === 'sorted' ? (
              sortedEggsStock.length > 0 ? (
                Object.entries(sortedEggsStock[0].sizes).map(([size, details], index) => (
                  <tr key={index}>
                    <td>{size.charAt(0).toUpperCase() + size.slice(1)}</td>
                    <td>{details.crates}</td>
                    <td>{details.loose}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No data available</td>
                </tr>
              )
            ) : (
              unsortedEggsStock.length > 0 ? (
                unsortedEggsStock.map((item, index) => (
                  <tr key={index}>
                    <td>Unsorted</td>
                    <td>{item.crates}</td>
                    <td>{item.loose}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No data available</td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        {error && <Card.Text>{error}</Card.Text>}
      </Card.Body>
    </Card>
  );
};

export default EggsStockTable;
