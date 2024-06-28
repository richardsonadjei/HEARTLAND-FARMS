import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container, Table } from 'react-bootstrap';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import CustomSidebar from './Dashboards/SideBar';

// Register the required components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FarmDashboard = ({ setSelectedDashboard }) => {
  const [cropProduction, setCropProduction] = useState({
    labels: [],
    datasets: [{
      label: 'Crop Production (Kg)',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  });
  const [livestockInventory, setLivestockInventory] = useState({
    labels: [],
    datasets: [{
      label: 'Livestock Count',
      data: [],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  });
  const [machineryStatus, setMachineryStatus] = useState([]);

  const fetchCropProduction = async () => {
    try {
      const response = await fetch('/api/crop-production');
      const data = await response.json();

      const crops = Object.keys(data);
      const quantities = Object.values(data);

      setCropProduction({
        labels: crops,
        datasets: [{
          ...cropProduction.datasets[0],
          data: quantities,
        }],
      });
    } catch (error) {
      console.error('Error fetching crop production:', error);
    }
  };

  const fetchLivestockInventory = async () => {
    try {
      const response = await fetch('/api/livestock-inventory');
      const data = await response.json();

      const types = Object.keys(data);
      const counts = Object.values(data);

      setLivestockInventory({
        labels: types,
        datasets: [{
          ...livestockInventory.datasets[0],
          data: counts,
        }],
      });
    } catch (error) {
      console.error('Error fetching livestock inventory:', error);
    }
  };

  const fetchMachineryStatus = async () => {
    try {
      const response = await fetch('/api/machinery-status');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setMachineryStatus(data);
      } else {
        console.error('Machinery status data is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching machinery status:', error);
    }
  };

  useEffect(() => {
    fetchCropProduction();
    fetchLivestockInventory();
    fetchMachineryStatus();

    const interval = setInterval(() => {
      fetchCropProduction();
      fetchLivestockInventory();
      fetchMachineryStatus();
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval);
  }, []);

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <CustomSidebar setSelectedDashboard={setSelectedDashboard} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Crop Production</Card.Title>
              <Bar data={cropProduction} options={barOptions} />
              <p className="mt-3">Total Crop Production: {cropProduction.datasets[0].data.reduce((acc, amount) => acc + amount, 0)} Kg</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Livestock Inventory</Card.Title>
              <Bar data={livestockInventory} options={barOptions} />
              <p className="mt-3">Total Livestock Count: {livestockInventory.datasets[0].data.reduce((acc, count) => acc + count, 0)}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Machinery Status</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Status</th>
                    <th>Last Maintenance</th>
                  </tr>
                </thead>
                <tbody>
                  {machineryStatus.map((machine, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{machine.name}</td>
                      <td>{machine.status}</td>
                      <td>{new Date(machine.lastMaintenance).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FarmDashboard;
