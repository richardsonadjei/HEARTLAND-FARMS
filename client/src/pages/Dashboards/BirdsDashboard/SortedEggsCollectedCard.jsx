import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';

const SortedEggsCard = ({ currentDate }) => {
  const [sortedEggs, setSortedEggs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSortedEggs = async () => {
      try {
        const response = await fetch('/api/poultry-sorted-eggs-collected-today');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSortedEggs(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching sorted eggs:', error);
        setSortedEggs([]);
        setError('Failed to fetch sorted eggs data');
      }
    };

    fetchSortedEggs();
    const interval = setInterval(fetchSortedEggs, 10000);
    return () => clearInterval(interval);
  }, []);

  const noDataMessageStyle = {
    color: 'red',
    fontWeight: 'bold',
    animation: 'blinker 1.5s linear infinite'
  };

  return (
    <Card className="card-sorted-eggs">
      <Card.Body>
        <Card.Title>{currentDate}</Card.Title>
        <Row xs={1} sm={2} md={3} className="g-4">
          {sortedEggs.length > 0 ? (
            sortedEggs.map((sizeData, index) => (
              <Col key={index}>
                <Card>
                  <Card.Body>
                    <Card.Text>
                      <strong>Size:</strong> {sizeData.size}<br />
                      <strong>Total Crates:</strong> {sizeData.totalCrates}<br />
                      <strong>Total Loose:</strong> {sizeData.totalLoose}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : error ? (
            <Card.Text>{error}</Card.Text>
          ) : (
            <Card.Text style={noDataMessageStyle}>
              No Sorted eggs collected today
            </Card.Text>
          )}
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SortedEggsCard;
