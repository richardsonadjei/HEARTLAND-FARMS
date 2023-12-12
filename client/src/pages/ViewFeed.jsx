import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'reactstrap';
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
          <h2 className="text-center mt-4 mb-4">Feed Details</h2>
          <Table striped bordered responsive>
            <tbody>
              <tr>
                <th>Feed Name</th>
                <td>{feedDetails.feedName}</td>
              </tr>
              <tr>
                <th>Manufacture Date</th>
                <td>{convertToLocalDate(feedDetails.manufactureDate)}</td>
              </tr>
              <tr>
                <th>Expiry Date</th>
                <td>{convertToLocalDate(feedDetails.expiryDate)}</td>
              </tr>
              <tr>
                <th>Feed Category</th>
                <td>{feedDetails.feedCategory}</td>
              </tr>
              <tr>
                <th>Quantity in Stock</th>
                <td>{feedDetails.quantityInStock}</td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewFeed;
