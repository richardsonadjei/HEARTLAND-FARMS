import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { useParams } from 'react-router-dom';

const ViewFeed = () => {
  const [feedDetails, setFeedDetails] = useState({});
  const { id } = useParams();

  useEffect(() => {
    // Function to fetch data from the server based on the feed ID
    const fetchFeedDetails = async () => {
      try {
        const response = await fetch(`/api/feed/${id}`);
        const data = await response.json();

        // Set the feed details in the state
        setFeedDetails(data);
      } catch (error) {
        console.error('Error fetching feed details:', error);
      }
    };

    // Fetch data when the component mounts
    fetchFeedDetails();
  }, [id]); // Trigger useEffect when the ID parameter changes

  // Function to convert date to local date string
  const convertToLocalDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Feed Details</h2>
          <ul>
            <li>
              <strong>Feed Name:</strong> {feedDetails.feedName}
            </li>
            <li>
              <strong>Manufacture Date:</strong> {convertToLocalDate(feedDetails.manufactureDate)}
            </li>
            <li>
              <strong>Expiry Date:</strong> {convertToLocalDate(feedDetails.expiryDate)}
            </li>
            <li>
              <strong>Feed Category:</strong> {feedDetails.feedCategory}
            </li>
            <li>
              <strong>Quantity in Stock:</strong> {feedDetails.quantityInStock}
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewFeed;
