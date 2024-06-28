import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const UnsortedEggsCard = () => {
  const [unsortedEggs, setUnsortedEggs] = useState({ totalCrates: 0, totalLoose: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnsortedEggs = async () => {
      try {
        const response = await fetch('/api/poultry-unsorted-eggs-collected-today');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUnsortedEggs(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching unsorted eggs:', error);
        setUnsortedEggs({ totalCrates: 0, totalLoose: 0 });
        setError('Failed to fetch unsorted eggs data');
      }
    };

    fetchUnsortedEggs();
    const interval = setInterval(fetchUnsortedEggs, 10000);
    return () => clearInterval(interval);
  }, []);

  const noDataMessageStyle = {
    color: 'red',
    fontWeight: 'bold',
    animation: 'blinker 1.5s linear infinite'
  };

  return (
    <Card className="card-eggs-collected">
      <Card.Body>
        <Card.Title>Poultry Unsorted Eggs Collected Today</Card.Title>
        {unsortedEggs.totalCrates > 0 || unsortedEggs.totalLoose > 0 ? (
          <Card.Text>
            <strong>Total Crates:</strong> {unsortedEggs.totalCrates}<br />
            <strong>Total Loose:</strong> {unsortedEggs.totalLoose}
          </Card.Text>
        ) : error ? (
          <Card.Text>{error}</Card.Text>
        ) : (
          <Card.Text style={noDataMessageStyle}>
            No unsorted eggs collected today
          </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default UnsortedEggsCard;
