// src/components/AnimalFarmDashboard.js
import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
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

const AnimalFarmDashboard = () => {
  const productionData = {
    labels: ['January', 'February', 'April', 'May', 'July', 'August', 'October'],
    datasets: [
      {
        label: 'Production (kg)',
        data: [2300, 1800, 2100, 1900, 2500, 2200, 1600],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  const productionOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Air temperature</Card.Title>
              <Card.Text>34°C <span className="text-danger">High</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Water content</Card.Title>
              <Card.Text>37% <span className="text-success">Good</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>pH value</Card.Title>
              <Card.Text>7 <span className="text-warning">Neutral</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Financial statistics</Card.Title>
              <ProgressBar now={82} label="82%" />
              <Row className="mt-3">
                <Col md={6}>
                  <Card.Text><strong>Current profit:</strong> 74 Lakh</Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text><strong>Expected profit:</strong> 90 Lakh</Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Production details</Card.Title>
              <Bar data={productionData} options={productionOptions} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AnimalFarmDashboard;
