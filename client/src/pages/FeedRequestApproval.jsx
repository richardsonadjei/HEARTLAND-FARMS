import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, CardText, Container, Row, Col } from 'reactstrap';

const FeedRequestApproval = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchFeedRequests = async () => {
      try {
        const response = await fetch('/api/view-feed-requests');
        const data = await response.json();
        setRequests(data.data);
      } catch (error) {
        console.error('Error fetching feed requests:', error);
      }
    };

    fetchFeedRequests();
  }, []);

  const handleApprove = (requestId, quantityRequested) => {
    const queryParams = new URLSearchParams({
      requestId: requestId,
      quantityRequested: quantityRequested,
    });

    window.location.href = `/approve-feed-requests?${queryParams.toString()}`;
  };

  const handleReject = (requestId) => {
    window.location.href = `/reject-feed-requests/${requestId}`;
  };

  return (
    <Container>
      <h2 style={{ marginTop: '20px' }}>Feed Request Approval</h2>
      <Row>
        {requests.map((request) => (
          <Col key={request._id} sm="4">
            <Card className="mb-3">
              <CardBody>
                <CardTitle style={{ fontWeight: 'bold', color: 'blue' }}>
                  Request from {request.employeeName}
                </CardTitle>
                <CardText>
                  <strong>Feed Category:</strong> {request.feedCategory}
                  <br />
                  <strong>Quantity Requested:</strong> {request.quantityRequested}
                  <br />
                  <strong>Feed Name :</strong> {request.feedName}
                </CardText>
                {request.status === 'Pending' && (
                  <div>
                    <Button color="success" onClick={() => handleApprove(request._id, request.quantityRequested)}>
                      Approve
                    </Button>{' '}
                    <Button color="danger" onClick={() => handleReject(request._id)}>
                      Reject
                    </Button>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeedRequestApproval;
