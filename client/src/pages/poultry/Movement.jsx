// Import necessary dependencies
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const Movement = () => {
  const { currentUser } = useSelector((state) => state.user);
  // State to manage form data
  const [formData, setFormData] = useState({
    batchNumber: '',
    fromFarmSection: '',
    toFarmSection: '',
    quantity: '',
    movementBy: currentUser ? currentUser.userName : '',
    movementReason: '',
    availableQuantity: 0,
  });
// State to store the breed of the selected batch for display only
const [selectedBatchBreed, setSelectedBatchBreed] = useState('');
  // State to store available batch numbers
  const [batchNumbers, setBatchNumbers] = useState([]);

  // State to store available farm sections
  const [farmSections, setFarmSections] = useState([]);

  // Function to fetch available batch numbers from the server
// Function to fetch available batch options from the server
const fetchBatchNumbers = async () => {
  try {
    const response = await fetch('/api/all-batchesNoDates');
    if (!response.ok) {
      throw new Error('Error fetching batch numbers');
    }
    const data = await response.json();

    // Check if the data.data.batches property exists and is an array
    if (data && data.data && data.data.batches && Array.isArray(data.data.batches)) {
      const batchNumbers = data.data.batches.map((batch) => batch.batchNumber);
      setBatchNumbers(batchNumbers);
    } else {
      throw new Error('Invalid data structure in the response');
    }
  } catch (error) {
    console.error('Error fetching batch numbers:', error.message);
  }
};


  // Function to fetch available farm sections from the server
 // Function to fetch available farm sections from the server
const fetchFarmSections = async () => {
  try {
    const response = await fetch('/api/all-sections');
    const data = await response.json();
    

    // Extract section names from the data
    const availableFarmSections = data.map((section) => section.sectionName);
    setFarmSections(availableFarmSections);
  } catch (error) {
    console.error('Error fetching farm sections:', error);
  }
};


  // Effect to fetch batch numbers and farm sections when the component mounts
  useEffect(() => {
    fetchBatchNumbers();
    fetchFarmSections();
  }, []);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Include the breed in the form data
    const { availableQuantity, ...formDataWithoutAvailableQuantity } = formData;
    const formDataWithBreed = {
      ...formDataWithoutAvailableQuantity,
      breed: selectedBatchBreed, // Include the breed in the data sent to the server
    };
  
    // Example: Fetch API
    try {
      const response = await fetch('/api/move-birds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataWithBreed),
      });
  
      const data = await response.json();
  
      // Handle success or error response from the server
      if (data.success) {
        alert('Batch moved successfully');
        // You can redirect the user or perform other actions as needed
        // Redirect to /poultry-dashboard after 2 seconds
        setTimeout(() => {
          window.location.href = '/poultry-dashboard';
        }, 2000);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Internal Server Error');
    }
  };

  // Function to handle input changes
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
          fromFarmSection: selectedBatch.farmSection || '',
          availableQuantity: selectedBatch.quantity || 0,
        }));
        setSelectedBatchBreed(selectedBatch.breed || '');
      } else {
        console.error('Error fetching batch data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching batch data:', error);
    }
  };

  return (
    <Container>
      
      <Row>
        <Col sm="6" className="mx-auto mt-5">
        <h2 className="mb-4 text-center">Move Batch Form</h2>
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
              <Label for="fromFarmSection">From Farm Section</Label>
              <Input
                type="text"
                name="fromFarmSection"
                id="fromFarmSection"
                placeholder="From Farm Section"
                value={formData.fromFarmSection}
                onChange={handleInputChange}
                readOnly
              />
            </FormGroup>

            <FormGroup>
              <Label for="toFarmSection">To Farm Section</Label>
              <Input
                type="select"
                name="toFarmSection"
                id="toFarmSection"
                value={formData.toFarmSection}
                onChange={handleInputChange}
              >
                <option value="" disabled>Select To Farm Section</option>
                {farmSections.map((section) => (
                  <option key={section} value={section}>
                    {section}
                  </option>
                ))}
              </Input>
            </FormGroup>
 {/* Display-only Breed field */}
            <FormGroup>
              <Label for="breed">Breed</Label>
              <Input
                type="text"
                name="breed"
                id="breed"
                value={selectedBatchBreed}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="availableQuantity">Available Quantity</Label>
              <Input
                type="text"
                name="availableQuantity"
                id="availableQuantity"
                value={formData.availableQuantity}
                readOnly
              />
            </FormGroup>

            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <Input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Enter Quantity"
                value={formData.quantity}
                onChange={handleInputChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="movementBy">Movement By</Label>
              <Input
                type="text"
                name="movementBy"
                id="movementBy"
                placeholder="Enter Movement By"
                value={formData.movementBy}
                onChange={handleInputChange}
                readOnly
              />
            </FormGroup>

            <FormGroup>
              <Label for="movementReason">Movement Reason</Label>
              <Input
                type="text"
                name="movementReason"
                id="movementReason"
                placeholder="Enter Movement Reason"
                value={formData.movementReason}
                onChange={handleInputChange}
              />
            </FormGroup>

            <Button color="primary" type="submit">
              Move Batch
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Movement;
