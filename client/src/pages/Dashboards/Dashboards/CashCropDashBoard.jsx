import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, Title, Tooltip, Legend);

const CashCropDashboard = () => {
  const [expenseData, setExpenseData] = useState({
    labels: [],
    datasets: [{
      label: 'Total Amount Spent (Ghc)',
      data: [],
      backgroundColor: '#4BC0C0',
    }],
  });

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchExpenseData = async () => {
      try {
        const response = await fetch('/api/startup-expenses-summary');
        const data = await response.json();
        
        const labels = data.map(item => item.category);
        const amounts = data.map(item => item.totalAmountSpent);

        setExpenseData({
          labels,
          datasets: [{
            ...expenseData.datasets[0],
            data: amounts,
          }],
        });

        const total = amounts.reduce((acc, amount) => acc + amount, 0);
        setTotalAmount(total);
      } catch (error) {
        console.error('Error fetching expense data:', error);
      }
    };

    fetchExpenseData();
    const intervalId = setInterval(fetchExpenseData, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const barOptions = {
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return 'Ghc' + value.toFixed(2);
          }
        }
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Row>
      <Col md={12}>
        <Card>
          <Card.Body style={{ padding: '10px' }}>
            <Card.Title>Start Up Expense Summary</Card.Title>
            <div style={{ height: '300px' }}>
              <Bar data={expenseData} options={barOptions} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
              <strong>Total: Ghc{totalAmount.toFixed(2)}</strong>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default CashCropDashboard;
