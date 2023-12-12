
import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';

const RequestFeed = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [employeeName, setEmployeeName] = useState(currentUser ? currentUser.userName : '');
  const [feedCategory, setFeedCategory] = useState('');
  const [feedName, setFeedName] = useState('');
  const [quantityRequested, setQuantityRequested] = useState('');
  const [feedCategories, setFeedCategories] = useState([]);
  const [feedNames, setFeedNames] = useState([]);
  
  useEffect(() => {
    fetch('/api/all-feed-category')
      .then((response) => response.json())
      .then((data) => {
       
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setFeedCategories(data.data);
        } else {
          console.error('Invalid feed categories data:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching feed categories:', error);
      });
  
    fetch('/api/all-feed-names')
      .then((response) => response.json())
      .then((data) => {
      
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setFeedNames(data.data);
        } else {
          console.error('Invalid feed names data:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching feed names:', error);
      });
  }, []);


  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      employeeName: currentUser ? currentUser.userName : '',
      feedCategory,
      feedName,
      quantityRequested,
    };
  
    fetch('/api/request-feed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert('Feed request created successfully!');
          // Redirect to "/feed-management" after successful submission
          window.location.href = '/feed-management';
        } else {
          alert('Error creating feed request: ' + result.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error creating feed request. Please try again.');
      });
  };
  return (
    <Container>
      <Row>
        <Col>
        <h2 style={{ marginTop: '20px' }}>Feed Request Form</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="employeeName" sm={2}>Employee Name</Label>
              <Col sm={10}>
                <Input type="text" name="employeeName" id="employeeName" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} readOnly />
              </Col>
            </FormGroup>
     
            
<FormGroup row>
  <Label for="feedCategory" sm={2}>Feed Category</Label>
  <Col sm={10}>
    <Input type="select" name="feedCategory" id="feedCategory" value={feedCategory} onChange={(e) => setFeedCategory(e.target.value)}>
      <option value="" disabled>Select Feed Category</option>
      {feedCategories.map((category) => (
        <option key={category._id} value={category.name}>
          {category.name}
        </option>
      ))}
    </Input>
  </Col>
</FormGroup>
<FormGroup row>
  <Label for="feedName" sm={2}>Feed Name</Label>
  <Col sm={10}>
    <Input type="select" name="feedName" id="feedName" value={feedName} onChange={(e) => setFeedName(e.target.value)}>
      <option value="" disabled>Select Feed Name</option>
      {feedNames.map((name) => (
        <option key={name._id} value={name.name}>
          {name.name}
        </option>
      ))}
    </Input>
  </Col>
</FormGroup>

<FormGroup row>
              <Label for="quantityRequested" sm={2}>
                Quantity Requested
              </Label>
              <Col sm={10}>
                <Input
                  type="number"
                  name="quantityRequested"
                  id="quantityRequested"
                  value={quantityRequested}
                  onChange={(e) => setQuantityRequested(e.target.value)}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col sm={{ size: 10, offset: 2 }}>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestFeed;