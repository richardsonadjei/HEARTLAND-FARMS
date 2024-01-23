import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from 'reactstrap';

const UpdateBatch = () => {
  const { currentUser } = useSelector((state) => state.user);

  // State to manage form data
  const [formData, setFormData] = useState({
    batchNumber: '',
    newQuantity: '',
    updatedBy: currentUser ? currentUser.userName : '',
    previousQuantity: 0, // New field for previous quantity
  });

  // State to store available batch numbers
  const [batchNumbers, setBatchNumbers] = useState([]);

  // Effect to fetch batch numbers when the component mounts
  useEffect(() => {
    fetchBatchNumbers();
  }, []);

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-batchesNoDates');
      if (!response.ok) {
        throw new Error('Error fetching batch numbers');
      }
      const data = await response.json();
  
      // Check if the data.data.batches property exists and is an array
      if (data && data.data && data.data.batches && Array.isArray(data.data.batches)) {
        const availableBatchNumbers = data.data.batches.map((batch) => batch.batchNumber);
        setBatchNumbers(availableBatchNumbers);
      } else {
        throw new Error('Invalid data structure in the response');
      }
    } catch (error) {
      console.error('Error fetching batch numbers:', error.message);
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBatchNumberChange = async (selectedBatchNumber) => {
    try {
      const response = await fetch(`/api/batch/${selectedBatchNumber}`);
      const data = await response.json();

      if (data.success) {
        const selectedBatch = data.data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          batchNumber: selectedBatch.batchNumber || '',
          newQuantity: '', // Clear new quantity when batch changes
          previousQuantity: selectedBatch.quantity || 0, // Set previous quantity
        }));
      } else {
        console.error('Error fetching batch data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching batch data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/update-batch-quantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        // Handle success
        alert('Batch quantity updated successfully');
        // Redirect to /poultry-dashboard after 1 second
        setTimeout(() => {
          window.location.href = '/poultry-getting-started';
        }, 1000);
      } else {
        // Handle error
        console.error(`Error: ${data.error}`);
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Internal Server Error');
    }
  };

  return (
    <Container>
      <Row>
        <Col sm="6" className="mx-auto mt-5">
          <h2 className="mb-4 text-center">Update Batch Quantity</h2>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="batchNumber">Batch Number</Label>
              <Input
                type="select"
                name="batchNumber"
                id="batchNumber"
                value={formData.batchNumber}
                onChange={(e) => handleBatchNumberChange(e.target.value)}
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
              <Label for="previousQuantity">Previous Quantity</Label>
              <Input
                type="text"
                name="previousQuantity"
                id="previousQuantity"
                value={formData.previousQuantity}
                readOnly
              />
            </FormGroup>

            <FormGroup>
              <Label for="newQuantity">New Quantity</Label>
              <Input
                type="number"
                name="newQuantity"
                id="newQuantity"
                value={formData.newQuantity}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            {/* Assuming you get the 'updatedBy' from the user's authentication */}
            <FormGroup>
              <Label for="updatedBy">Updated By</Label>
              <Input
                type="text"
                name="updatedBy"
                id="updatedBy"
                value={formData.updatedBy}
                onChange={handleInputChange}
                readOnly
              />
            </FormGroup>

            <Button color="primary" type="submit">
              Update Batch Quantity
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateBatch;
