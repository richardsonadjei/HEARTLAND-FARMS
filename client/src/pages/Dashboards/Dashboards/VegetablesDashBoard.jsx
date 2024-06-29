// src/components/VegetablesDashboard.js
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

const VegetablesDashboard = () => {
  const productionData = {
    labels: ['January', 'February', 'April', 'May', 'July', 'August', 'October'],
    datasets: [
      {
        label: 'Production (kg)',
        data: [1500, 1200, 1800, 1600, 2000, 1400, 1100],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
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
              <Card.Text>36°C <span className="text-danger">High</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Water content</Card.Title>
              <Card.Text>35% <span className="text-success">Good</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>pH value</Card.Title>
              <Card.Text>7.5 <span className="text-warning">Neutral</span></Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Financial statistics</Card.Title>
              <ProgressBar now={85} label="85%" />
              <Row className="mt-3">
                <Col md={6}>
                  <Card.Text><strong>Current profit:</strong> 54 Lakh</Card.Text>
                </Col>
                <Col md={6}>
                  <Card.Text><strong>Expected profit:</strong> 72 Lakh</Card.Text>
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

export default VegetablesDashboard;
