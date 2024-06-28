import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container, Table } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import AccountsCustomSidebar from './AccountsSideBar';

const AccountMonitoringDashboard = ({ setSelectedDashboard }) => {
  const [partnerContributions, setPartnerContributions] = useState({});
  const [overallPartnerTotal, setOverallPartnerTotal] = useState(0);
  const [expenseData, setExpenseData] = useState({
    labels: [],
    datasets: [{
      label: 'Farm Expenses (Ghc)',
      data: [],
      backgroundColor: 'rgba(255, 99, 132, 0.6)',
    }],
  });
  const [incomeData, setIncomeData] = useState({
    labels: [],
    datasets: [{
      label: 'Income Summary (Ghc)',
      data: [],
      backgroundColor: 'rgba(54, 162, 235, 0.6)',
    }],
  });
  const [assets, setAssets] = useState([]);
  const [netBalance, setNetBalance] = useState(0);

  useEffect(() => {
    fetchPartnerContributions();
    fetchExpenseData();
    fetchIncomeData();
    fetchAssets();

    const interval = setInterval(() => {
      fetchPartnerContributions();
      fetchExpenseData();
      fetchIncomeData();
      fetchAssets();
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const overallTotalExpenses = expenseData.datasets[0].data.reduce((acc, amount) => acc + amount, 0);
    const overallTotalIncome = incomeData.datasets[0].data.reduce((acc, amount) => acc + amount, 0);
    const balance = overallTotalIncome - overallTotalExpenses;
    setNetBalance(balance);
  }, [expenseData, incomeData]);

  const netBalanceColor = netBalance >= 0 ? 'green' : 'red';

  const netBalanceStyles = {
    textAlign: 'center',
    padding: '10px',
    backgroundColor: '#f2f2f2',
    borderRadius: '5px',
    marginTop: '20px',
    width: 'fit-content',
    margin: 'auto',
  };

  const netBalanceValueStyles = {
    color: netBalanceColor,
    fontWeight: 'bold',
    fontSize: '1.5em',
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const fetchPartnerContributions = async () => {
    try {
      const response = await fetch('/api/total-partners-contributions');
      const data = await response.json();
      setPartnerContributions(data);

      // Calculate overall total contributions
      const total = Object.values(data).reduce((acc, amount) => acc + amount, 0);
      setOverallPartnerTotal(total);
    } catch (error) {
      console.error('Error fetching partner contributions:', error);
    }
  };

  const fetchExpenseData = async () => {
    try {
      const response = await fetch('/api/total-farm-expenses-by-category');
      const data = await response.json();

      const categories = Object.keys(data);
      const amounts = Object.values(data);

      setExpenseData({
        labels: categories,
        datasets: [{
          ...expenseData.datasets[0],
          data: amounts,
        }],
      });
    } catch (error) {
      console.error('Error fetching farm expenses:', error);
    }
  };

  const fetchIncomeData = async () => {
    try {
      const response = await fetch('/api/income-summary');
      const data = await response.json();

      const categories = Object.keys(data);
      const amounts = Object.values(data);

      setIncomeData({
        labels: categories,
        datasets: [{
          ...incomeData.datasets[0],
          data: amounts,
        }],
      });
    } catch (error) {
      console.error('Error fetching income summary:', error);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await fetch('/api/assets');
      const data = await response.json();
      setAssets(Array.isArray(data) ? data : []); // Ensure data is an array
    } catch (error) {
      console.error('Error fetching assets:', error);
      setAssets([]); // Set assets to an empty array in case of error
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md={12}>
          <AccountsCustomSidebar setSelectedDashboard={setSelectedDashboard} />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Partner Contributions and Asset Details</Card.Title>
              <Row>
                <Col md={6}>
                  <Bar
                    data={{
                      labels: Object.keys(partnerContributions),
                      datasets: [{
                        label: 'Partner Contributions (Ghc)',
                        data: Object.values(partnerContributions),
                        backgroundColor: [
                          'rgba(255, 99, 132, 0.6)',
                          'rgba(54, 162, 235, 0.6)',
                          'rgba(255, 206, 86, 0.6)',
                          'rgba(75, 192, 192, 0.6)',
                        ],
                        borderWidth: 1,
                      }],
                    }}
                    options={barOptions}
                  />
                  <p className="mt-3">Overall Total Contributions: {overallPartnerTotal} Ghc</p>
                </Col>
                <Col md={6}>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Acquisition Date</th>
                        <th>Value (Ghc)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(assets) && assets.length > 0 ? (
                        assets.map((asset, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{asset.name}</td>
                            <td>{new Date(asset.acquisitionDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</td>
                            <td>{asset.value}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">No assets available</td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Farm Expenses by Category</Card.Title>
              <Bar data={expenseData} options={barOptions} />
              <p className="mt-3">Overall Total Farm Expenses: Ghc {expenseData.datasets[0].data.reduce((acc, amount) => acc + amount, 0)}</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Income Summary</Card.Title>
              <Bar data={incomeData} options={barOptions} />
              <p className="mt-3">Overall Total Income: Ghc {incomeData.datasets[0].data.reduce((acc, amount) => acc + amount, 0)}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={12}>
          <Card style={netBalanceStyles}>
            <Card.Body>
              <p className="mt-1" style={netBalanceValueStyles}>Net Balance: Ghc {netBalance}</p>
            
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountMonitoringDashboard;
