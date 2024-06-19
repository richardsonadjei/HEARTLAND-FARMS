import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const IssueBirdFeed = () => {
  const [feedOptions, setFeedOptions] = useState([]);
  const [feedName, setFeedName] = useState('');
  const [quantityIssued, setQuantityIssued] = useState(0);
  const [dateIssued, setDateIssued] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchFeedNames();
  }, []);

  const fetchFeedNames = async () => {
    try {
      const response = await fetch('/api/feed-names');
      if (!response.ok) {
        throw new Error('Failed to fetch feed names');
      }
      const feedNames = await response.json();
      const options = feedNames.map((feed) => ({ value: feed.name, label: feed.name }));
      setFeedOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/issue-bird-feed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ feedName, quantityIssued, dateIssued }),
      });
      if (!response.ok) {
        throw new Error('Failed to issue bird feed');
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Redirect after 1 second
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Issue Bird Feed</h1>
          {error && <p className="text-danger">{error}</p>}
          {success && (
            <p className="text-success">Bird feed issued successfully. Redirecting...</p>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="feedName">Feed Name</Label>
              <Select
                id="feedName"
                options={feedOptions}
                onChange={(selectedOption) => setFeedName(selectedOption.value)}
                isSearchable
                placeholder="Select Feed Name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantityIssued">Quantity Issued</Label>
              <Input
                type="number"
                id="quantityIssued"
                value={quantityIssued}
                onChange={(e) => setQuantityIssued(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="dateIssued">Date Issued</Label>
              <Input
                type="date"
                id="dateIssued"
                value={dateIssued}
                onChange={(e) => setDateIssued(e.target.value)}
                required
              />
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default IssueBirdFeed;
