import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col, Alert } from 'reactstrap';

const CreateFeedNameForm = () => {
  // State to hold form data
  const [name, setName] = useState('');
  // State to manage success message
  const [successMessage, setSuccessMessage] = useState('');
  // State to manage error message
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a request to your server to create the FeedName
      const response = await fetch('/api/new-feedName', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        // FeedName created successfully
        setSuccessMessage('FeedName created successfully');
        setErrorMessage(''); // Clear any previous error messages
        // Optionally, you can refresh the page after a delay
        setTimeout(() => {
          window.location.reload();
        }, 2000); // Refresh after 2 seconds
      } else {
        // Handle error response
        const errorData = await response.json();
        setErrorMessage(`Error: ${errorData.error}`);
        setSuccessMessage(''); // Clear any previous success messages
      }
    } catch (error) {
      // Handle network or other errors
      setErrorMessage(`Error: ${error.message}`);
      setSuccessMessage(''); // Clear any previous success messages
    }
  };

  return (
    <Container>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          {successMessage && <Alert color="success">{successMessage}</Alert>}
          {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
          <Form onSubmit={handleFormSubmit}>
            <FormGroup>
              <Label for="feedName">Feed Name</Label>
              <Input
                type="text"
                name="feedName"
                id="feedName"
                placeholder="Enter feed name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </FormGroup>
            <Button color="primary" type="submit">
              Create FeedName
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateFeedNameForm;
