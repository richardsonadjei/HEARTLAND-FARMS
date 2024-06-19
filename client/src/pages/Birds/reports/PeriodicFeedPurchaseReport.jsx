import React, { useState, useEffect } from 'react';
import { Container, Form, FormGroup, Label, Input } from 'reactstrap';

const PeriodicFeedPurchasesReport = () => {
  const [feedPurchases, setFeedPurchases] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading indicator

  useEffect(() => {
    // Initial data fetch on component mount
    fetchFeedPurchases();
  }, []);

  const fetchFeedPurchases = async () => {
    setLoading(true); // Set loading to true when fetching data
    try {
      const response = await fetch(`/api/feed-purchases?startDate=${startDate}&endDate=${endDate}`);
      if (!response.ok) {
        throw new Error('Failed to fetch feed purchases');
      }
      const purchases = await response.json();
      setFeedPurchases(purchases);

      const total = purchases.reduce((sum, purchase) => sum + purchase.totalCost, 0);
      setTotalCost(total);

      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchFeedPurchases();
  };

  return (
    <Container fluid>
      <h2 className="mt-4">Periodic Feed Purchases Report</h2>
      {errorMessage && <p>{errorMessage}</p>}
      <Form onSubmit={handleSubmit} inline>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="startDate" className="mr-sm-2">Start Date:</Label>
          <Input type="date" name="startDate" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </FormGroup>
        <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
          <Label for="endDate" className="mr-sm-2">End Date:</Label>
          <Input type="date" name="endDate" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </FormGroup>
        <button type="submit" className="btn btn-primary">View Report</button>
      </Form>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        feedPurchases.length > 0 && (
          <div className="table-responsive mt-3">
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Feed Name</th>
                  <th>Supplier</th>
                  <th>Manufacture Date</th>
                  <th>Expiry Date</th>
                  <th>Quantity Purchased</th>
                  <th>Cost Per Bag</th>
                  <th>Total Cost</th>
                  <th>Payment Method</th>
                  <th>Purchased By</th>
                </tr>
              </thead>
              <tbody>
                {feedPurchases.map((purchase, index) => (
                  <tr key={purchase._id}>
                    <td>{index + 1}</td>
                    <td>{purchase.feedName}</td>
                    <td>{purchase.supplier}</td>
                    <td>{new Date(purchase.manufactureDate).toLocaleDateString('en-US')}</td>
                    <td>{new Date(purchase.expiryDate).toLocaleDateString('en-US')}</td>
                    <td>{purchase.quantityPurchased}</td>
                    <td>{purchase.costPerBag}</td>
                    <td>{purchase.totalCost}</td>
                    <td>{purchase.paymentMethod}</td>
                    <td>{purchase.purchasedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3">
              <h5>Total Cost: ₵{totalCost.toFixed(2)}</h5>
            </div>
          </div>
        )
      )}
    </Container>
  );
};

export default PeriodicFeedPurchasesReport;
