import React, { useEffect, useState } from 'react';
import { Row, Col, Card, ProgressBar, Table } from 'react-bootstrap';
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

const formatDate = (date) => {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const day = days[date.getDay()];
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  const suffix = (dayOfMonth) => {
    if (dayOfMonth >= 11 && dayOfMonth <= 13) {
      return 'th';
    }
    switch (dayOfMonth % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}, ${month} ${dayOfMonth}${suffix(dayOfMonth)} ${year}`;
};

const BirdsFarmDashboard = () => {
  const [unsortedEggs, setUnsortedEggs] = useState({ totalCrates: 0, totalLoose: 0 });
  const [sortedEggs, setSortedEggs] = useState([]);
  const [sortedEggsStock, setSortedEggsStock] = useState([]);
  const [unsortedEggsStock, setUnsortedEggsStock] = useState([]);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState('');
  const [birdsSummary, setBirdsSummary] = useState([]);

  useEffect(() => {
    const fetchUnsortedEggs = async () => {
      try {
        const response = await fetch('/api/poultry-unsorted-eggs-collected-today');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUnsortedEggs(data);
        setError(null); // Clear error state if successful
      } catch (error) {
        console.error('Error fetching unsorted eggs:', error);
        setUnsortedEggs({ totalCrates: 0, totalLoose: 0 }); // Set to default values on error
        setError('Failed to fetch unsorted eggs data'); // Set error message
      }
    };

    const fetchSortedEggs = async () => {
      try {
        const response = await fetch('/api/poultry-sorted-eggs-collected-today');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSortedEggs(data);
        setError(null); // Clear error state if successful
      } catch (error) {
        console.error('Error fetching sorted eggs:', error);
        setSortedEggs([]); // Set to empty array on error
        setError('Failed to fetch sorted eggs data'); // Set error message
      }
    };

    const fetchEggsStock = async () => {
      try {
        const response = await fetch('/api/eggs-stock');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSortedEggsStock(data.sortedEggsStock);
        setUnsortedEggsStock(data.unsortedEggsStock);
        setError(null); // Clear error state if successful
      } catch (error) {
        console.error('Error fetching eggs stock:', error);
        setSortedEggsStock([]); // Set to empty array on error
        setUnsortedEggsStock([]); // Set to empty array on error
        setError('Failed to fetch eggs stock data'); // Set error message
      }
    };

    const fetchBirdsSummary = async () => {
      try {
        const response = await fetch('/api/birds-summary');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setBirdsSummary(data);
        setError(null); // Clear error state if successful
      } catch (error) {
        console.error('Error fetching birds summary:', error);
        setBirdsSummary([]); // Set to empty array on error
        setError('Failed to fetch birds summary data'); // Set error message
      }
    };

    fetchUnsortedEggs();
    fetchSortedEggs();
    fetchEggsStock();
    fetchBirdsSummary();

    const interval = setInterval(() => {
      fetchUnsortedEggs();
      fetchSortedEggs();
      fetchEggsStock();
      fetchBirdsSummary();
    }, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  useEffect(() => {
    // Update current date in the format "Monday, January 12th"
    setCurrentDate(formatDate(new Date()));
  }, []);

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

  // Function to generate different colors for each farm section
  const getBackgroundColor = (index) => {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#FFC107'];
    return colors[index % colors.length];
  };

  return (
    <div className="dashboard-container">
      <Row className="mt-3">
        <Col md={4}>
          <Card className="card-eggs-collected">
            <Card.Body>
              <Card.Title>Poultry Unsorted Eggs Collected Today</Card.Title>
              {unsortedEggs ? (
                <>
                  <Card.Text>
                    <strong>Total Crates:</strong> {unsortedEggs.totalCrates}<br />
                    <strong>Total Loose:</strong> {unsortedEggs.totalLoose}
                  </Card.Text>
                </>
              ) : error ? (
                <Card.Text>{error}</Card.Text>
              ) : (
                <Card.Text>Loading...</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
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
                  <Card.Text>Loading...</Card.Text>
                )}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Financial Statistics</Card.Title>
              <ProgressBar now={80} label="80%" />
              <Row className="mt-3">
                <Col md={6}>
                  <Card.Text><strong>Current Profit:</strong> 70 Lakh</Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text><strong>Expected Profit:</strong> 85 Lakh</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
            <Card.Title>Birds Production Details</Card.Title>
              {birdsSummary.length > 0 ? (
                renderBirdsSummaryChart()
              ) : error ? (
                <Card.Text>{error}</Card.Text>
              ) : (
                <Card.Text>Loading...</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Sorted Eggs Stock</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Crates</th>
                    <th>Loose</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEggsStock.length > 0 ? (
                    Object.keys(sortedEggsStock[0].sizes).map((size, index) => (
                      <tr key={index}>
                        <td>{size.charAt(0).toUpperCase() + size.slice(1)}</td>
                        <td>{sortedEggsStock[0].sizes[size].crates}</td>
                        <td>{sortedEggsStock[0].sizes[size].loose}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Unsorted Eggs Stock</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Crates</th>
                    <th>Loose</th>
                  </tr>
                </thead>
                <tbody>
                  {unsortedEggsStock.length > 0 ? (
                    unsortedEggsStock.map((item, index) => (
                      <tr key={index}>
                        <td>{item.crates}</td>
                        <td>{item.loose}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2">No data available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default BirdsFarmDashboard;
