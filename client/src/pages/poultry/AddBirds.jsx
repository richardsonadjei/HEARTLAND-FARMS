// AddBirds.jsx
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const AddBirds = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    batchNumber: '',
    quantityToAdd: 0,
    addedBy: currentUser ? currentUser.userName : '',
  });

  const [batchNumbers, setBatchNumbers] = useState([]);
  const [existingQuantity, setExistingQuantity] = useState(null);

  useEffect(() => {
    // Fetch available batch numbers when the component mounts
    fetchBatchNumbers();
  }, []);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-batchesNoDates');
      if (!response.ok) {
        throw new Error('Error fetching batch numbers');
      }
      const data = await response.json();
      setBatchNumbers(data.data.map((batch) => batch.batchNumber));
    } catch (error) {
      console.error('Error fetching batch numbers:', error.message);
    }
  };

  const fetchExistingQuantity = async (selectedBatchNumber) => {
    try {
      const response = await fetch(`/api/batch/${selectedBatchNumber}`);
      if (!response.ok) {
        throw new Error(`Error fetching existing quantity. Status: ${response.status}`);
      }
      const data = await response.json();
  
      // Check if data contains a property named 'data' and if it has a 'quantity' property
      const existingQuantity = data.data && data.data.quantity;
  
      setExistingQuantity(existingQuantity);
      
    } catch (error) {
      console.error('Error fetching existing quantity:', error.message);
    }
  };
  
  const handleChange = async (e) => {
    const { name, value } = e.target;

    if (name === 'batchNumber') {
      // If batchNumber changes, fetch the existing quantity
      await fetchExistingQuantity(value);
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API
      const response = await fetch('/api/add-birds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error adding birds to batch');
      }

      // Alert the user
    alert('Birds added to batch successfully');

    // Navigate the user to /poultry-dashboard after a short delay (2 seconds in this example)
    setTimeout(() => {
      window.location.href = '/poultry-dashboard';
    }, 2000);
    } catch (error) {
      // Handle error (you may want to provide user feedback)
      console.error('Error adding birds to batch:', error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
        <h2 className="mb-4 text-center">Add Birds To An Existing Batch</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="batchNumber">Batch Number:</Label>
              <Input
                type="select"
                id="batchNumber"
                name="batchNumber"
                value={formData.batchNumber}
                onChange={handleChange}
              >
                <option value="" disabled>Select Batch Number</option>
                {batchNumbers.map((batchNumber) => (
                  <option key={batchNumber} value={batchNumber}>
                    {batchNumber}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="existingQuantity">Existing Quantity:</Label>
              <Input
                type="text"
                id="existingQuantity"
                name="existingQuantity"
                value={existingQuantity !== null ? existingQuantity : ''}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="quantityToAdd">Quantity to Add:</Label>
              <Input
                type="number"
                id="quantityToAdd"
                name="quantityToAdd"
                value={formData.quantityToAdd}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="addedBy">Added By:</Label>
              <Input
                type="text"
                id="addedBy"
                name="addedBy"
                value={formData.addedBy}
                onChange={handleChange}
              />
            </FormGroup>
            <Button type="submit">Add Birds to Batch</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddBirds;
