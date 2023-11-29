import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const ApproveFeedRequest = () => {
  const [requestId, setRequestId] = useState('');
  const [quantityIssued, setQuantityIssued] = useState('');
  const [quantityRequested, setQuantityRequested] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to extract query parameters from the URL
    const getQueryParam = (name) => {
      const params = new URLSearchParams(window.location.search);
      return params.get(name);
    };

    // Autofill requestId from URL parameter
    const urlRequestId = getQueryParam('requestId');
    if (urlRequestId) {
      setRequestId(urlRequestId);
    }

    // Autofill quantityIssued from URL parameter
    const urlQuantityIssued = getQueryParam('quantityIssued');
    if (urlQuantityIssued) {
      setQuantityIssued(urlQuantityIssued);
    }

    // Autofill quantityRequested from URL parameter
    const urlQuantityRequested = getQueryParam('quantityRequested');
    if (urlQuantityRequested) {
      setQuantityRequested(urlQuantityRequested);
    }
  }, []);

  const handleApprove = async () => {
    try {
      // Validate inputs
      if (!requestId || !quantityIssued) {
        setError('Please fill in all fields');
        return;
      }

      console.log('Making API request to issue feed:', { requestId, quantityIssued });

      // Make API request to issue feed
      const response = await fetch('api/issue-feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ requestId, quantityIssued }),
      });

      console.log('API response:', response);

      const data = await response.json();

      if (response.ok) {
        // Handle success
        console.log('Feed Request Approved:', data);
        // You can add additional logic here, such as updating the UI or redirecting to another page.
      } else {
        // Handle error
        setError(data.message || 'An error occurred while approving feed request');
      }
    } catch (error) {
      console.error('Error approving feed request:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Form>
            <FormGroup>
              <Label for="requestId">Request ID</Label>
              <Input
                type="text"
                name="requestId"
                id="requestId"
                placeholder="Enter Request ID"
                value={requestId}
                onChange={(e) => setRequestId(e.target.value)}
                disabled // Disable input since it's autofilled
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantityRequested">Quantity Requested</Label>
              <Input
                type="number"
                name="quantityRequested"
                id="quantityRequested"
                placeholder="Enter Quantity Requested"
                value={quantityRequested}
                readOnly // Set to readOnly to make it read-only
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantityIssued">Quantity Issued</Label>
              <Input
                type="number"
                name="quantityIssued"
                id="quantityIssued"
                placeholder="Enter Quantity Issued"
                value={quantityIssued}
                onChange={(e) => setQuantityIssued(e.target.value)}
              />
            </FormGroup>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button color="primary" onClick={handleApprove}>
              Approve Feed Request
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ApproveFeedRequest;
