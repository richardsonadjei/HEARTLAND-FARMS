import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BirdsSummaryChart = () => {
  const defaultBirdType = 'Guinea Fowl'; // Default bird type
  const [birdsSummary, setBirdsSummary] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBirdsSummary = async () => {
      try {
        const response = await fetch(`/api/birds-summary-by-location/${encodeURIComponent(defaultBirdType)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBirdsSummary(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching birds summary:', error);
        setBirdsSummary([]);
        setError('Failed to fetch birds summary data');
      }
    };

    fetchBirdsSummary();
    const interval = setInterval(fetchBirdsSummary, 10000);
    return () => clearInterval(interval);
  }, [defaultBirdType]);

  const getBackgroundColor = (index) => {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#FFC107'];
    return colors[index % colors.length];
  };

  const renderBirdsSummaryChart = () => {
    if (birdsSummary.length === 0) {
      return <Card.Text>No data available</Card.Text>;
    }

    const labels = birdsSummary.map(item => item.farmHouseLocation);

    const birdTypes = [...new Set(birdsSummary.flatMap(item => item.types.map(type => type.type)))];

    const datasets = birdTypes.map((type, index) => {
      return {
        label: type,
        data: birdsSummary.map(item => {
          const birdTypeData = item.types.find(birdType => birdType.type === type);
          return birdTypeData ? birdTypeData.totalMales + birdTypeData.totalFemales : 0;
        }),
        backgroundColor: getBackgroundColor(index),
        borderWidth: 1,
      };
    });

    const data = {
      labels,
      datasets,
    };

    const options = {
      scales: {
        x: {
          stacked: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    return <Bar data={data} options={options} />;
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{`${defaultBirdType} Birds Stock And Distribution`}</Card.Title>
        {birdsSummary.length > 0 ? (
          renderBirdsSummaryChart()
        ) : error ? (
          <Card.Text>{error}</Card.Text>
        ) : (
          <Card.Text>Loading...</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};

export default BirdsSummaryChart;
