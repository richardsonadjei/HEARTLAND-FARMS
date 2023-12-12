import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';

const FeedStockReport = () => {
  const [batches, setBatches] = useState([]);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchFeedBatches = async () => {
      try {
        // Fetch all batches from the server using the provided endpoint
        const response = await fetch('/api/all-feed-batches'); // Update the endpoint

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setBatches(data);
        setShowReport(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchFeedBatches();
  }, []); // The empty dependency array ensures this effect runs only once when the component mounts

  return (
    <Container>
      <Row className="mt-4">
        <Col>
          {showReport && (
            <Table responsive bordered hover>
              <caption className="text-center font-weight-bold mb-2 text-white">
                Feed Stock Report
              </caption>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Feed Name</th>
                  <th>Feed Category</th>
                  <th>Manufacture Date</th>
                  <th>Expiry Date</th>
                  <th>Quantity In Stock</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {batches.map((batch, index) => (
                  <tr key={batch.feedPurchaseId}>
                    <th scope="row">{index + 1}</th>
                    <td>{batch.feedName}</td>
                    <td>{batch.feedCategory}</td>
                    <td>{new Date(batch.manufactureDate).toLocaleDateString()}</td>
                    <td>{new Date(batch.expiryDate).toLocaleDateString()}</td>
                    <td>{batch.quantityInStock}</td>
                    <td>{new Date(batch.lastUpdated).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default FeedStockReport;
