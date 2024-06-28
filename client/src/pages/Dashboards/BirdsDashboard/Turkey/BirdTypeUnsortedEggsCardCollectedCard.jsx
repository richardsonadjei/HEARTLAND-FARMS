import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

const BirdTypeUnsortedEggsCard = () => {
  const defaultBirdType = 'Turkey'; // Default bird type
  const [unsortedEggs, setUnsortedEggs] = useState({ totalCrates: 0, totalLoose: 0 });
  const [error, setError] = useState(null);
  const [todayDate, setTodayDate] = useState('');

  useEffect(() => {
    const fetchUnsortedEggs = async () => {
      try {
        const response = await fetch(`/api/eggs-collected-today/${encodeURIComponent(defaultBirdType)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUnsortedEggs(data[0]); // Assuming data is an array with a single object based on your example response
        setError(null);
      } catch (error) {
        console.error(`Error fetching ${defaultBirdType} unsorted eggs:`, error);
        setUnsortedEggs({ totalCrates: 0, totalLoose: 0 });
        setError(`Failed to fetch ${defaultBirdType} unsorted eggs data`);
      }
    };

    const currentDate = new Date();
    setTodayDate(currentDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }));

    fetchUnsortedEggs();
    const interval = setInterval(fetchUnsortedEggs, 10000);
    return () => clearInterval(interval);
  }, [defaultBirdType]);

  const noDataMessageStyle = {
    color: 'red',
    fontWeight: 'bold',
    animation: 'blinker 1.5s linear infinite'
  };

  return (
    <Card className="card-eggs-collected">
      <Card.Body>
        <Card.Title>{defaultBirdType} Unsorted Eggs Collected {todayDate}</Card.Title>
        {unsortedEggs && unsortedEggs._id ? (
          <Card.Text>
            <strong>Total Crates:</strong> {unsortedEggs.crates}<br />
            <strong>Total Loose:</strong> {unsortedEggs.loose}<br />
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

export default BirdTypeUnsortedEggsCard;
