import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const UpdateGuineaFowlStock = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    batchNumber: '',
    quantity: 0,
    updatedBy: currentUser ? currentUser.userName : '',
  });

  const [batchNumbers, setBatchNumbers] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // Fetch available batch numbers when the component mounts
    fetchBatchNumbers();
  }, []);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-guinea-fowl');
      if (!response.ok) {
        throw new Error('Error fetching batch numbers');
      }
      const responseData = await response.json();

      // Extract batchNumbers with quantity information
      const batchNumbers = responseData.map((batch) => ({
        batchNumber: batch.batchNumber,
        quantity: batch.quantity, // Assuming there is a quantity property in your batch data
      }));

      setBatchNumbers(batchNumbers);
    } catch (error) {
      console.error('Error fetching batch numbers:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a PUT request to update Guinea Fowl stock
      const response = await fetch(`/api/${formData.batchNumber}/update-quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quantity: formData.quantity,
          updatedBy: formData.updatedBy, // Include updatedBy in the request body
        }),
      });

      if (!response.ok) {
        throw new Error('Error updating Guinea Fowl quantity');
      }

      // Set success message
      setSuccessMessage('Guinea Fowl quantity updated successfully');

      // Clear the success message after a delay (3 seconds)
      setTimeout(() => {
        setSuccessMessage(null);

        // Navigate the user to /guinea-fowl-dashboard
        window.location.href = '/guinea-fowl-dashboard';
      }, 3000);
    } catch (error) {
      // Set error message
      setErrorMessage(`Error updating Guinea Fowl quantity: ${error.message}`);

      // Clear the error message after a delay (3 seconds)
      setTimeout(() => {
        setErrorMessage(null);

        // Refresh the page
        window.location.reload();
      }, 3000);
    }
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2 className="mb-4 text-center">Update Guinea Fowl Quantity</h2>
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <Form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <FormGroup row>
              <Label for="batchNumber" className="text-white" sm={4}>
                Batch Number:
              </Label>
              <Col sm={8}>
                <Input
                  type="select"
                  id="batchNumber"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Batch Number</option>
                  {batchNumbers.map((batch) => (
                    <option key={batch.batchNumber} value={batch.batchNumber}>
                      {`${batch.batchNumber} - Stock: ${batch.quantity}`}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="quantity" className="text-white" sm={4}>
                Quantity:
              </Label>
              <Col sm={8}>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="updatedBy" className="text-white" sm={4}>
                Updated By:
              </Label>
              <Col sm={8}>
                <Input
                  type="text"
                  id="updatedBy"
                  name="updatedBy"
                  value={formData.updatedBy}
                  onChange={handleChange}
                  readOnly
                />
              </Col>
            </FormGroup>
            <Button type="submit">Update Quantity</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateGuineaFowlStock;
