import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const RelocateBirds = () => {
  const { currentUser } = useSelector((state) => state.user);

  // State to manage form data
  const [formData, setFormData] = useState({
    type: '',
    batchNumber: '',
    fromFarmSection: '',
    toFarmSection: '',
    quantity: '',
    relocationBy: currentUser ? currentUser.userName : '',
    relocationReason: '',
  });

  // State to store available batch numbers
  const [batchNumberOptions, setBatchNumberOptions] = useState([]);

  // State to store available farm sections
  const [farmSections, setFarmSections] = useState([]);

  // State to store available bird types
  const [typeOptions, setTypeOptions] = useState([]);

  // Effect to fetch bird types when the component mounts
  useEffect(() => {
    fetchTypeOptions();
  }, []);

  // Function to fetch available bird types from the server
  const fetchTypeOptions = async () => {
    try {
      const response = await fetch('/api/all-birds-types');
      if (!response.ok) {
        throw new Error('Failed to fetch bird types');
      }
      const types = await response.json();
      const sortedTypes = types.sort((a, b) => a.name.localeCompare(b.name));
      const options = sortedTypes.map((type) => ({ value: type.name, label: type.name }));
      setTypeOptions(options);
    } catch (error) {
      console.error('Error fetching bird types:', error.message);
    }
  };

  // Function to fetch batch numbers based on selected bird type
  const fetchBatchNumberOptions = async (selectedType) => {
    try {
      const response = await fetch('/api/all-bird-batches');
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const filteredBatches = batches.filter(batch => batch.type === selectedType);
      const options = filteredBatches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchNumberOptions(options);
    } catch (error) {
      console.error('Error fetching batch numbers:', error.message);
    }
  };

  // Function to fetch farm section of selected batch
  const fetchFromFarmSection = async (selectedBatchNumber) => {
    try {
      const response = await fetch(`/api/birdBatches/${selectedBatchNumber}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batch details');
      }
      const batchDetails = await response.json();
      const fromFarmSection = batchDetails.farmSection; // Adjust this according to your API response structure
      setFormData({ ...formData, fromFarmSection }); // Update the fromFarmSection in formData
    } catch (error) {
      console.error('Error fetching batch details:', error.message);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/relocate-birds', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Handle success or error response from the server
      if (data.success) {
        alert('Batch relocated successfully');
        // Redirect or perform other actions as needed
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Internal Server Error');
    }
  };

  // Function to handle input changes
  const handleInputChange = async (selectedOption, field) => {
    const value = selectedOption ? selectedOption.value : ''; // Ensure a value is set even when clearing the selection
    setFormData({ ...formData, [field]: value });

    if (field === 'type') {
      await fetchBatchNumberOptions(value);
      // Clear fromFarmSection when type changes
      setFormData({ ...formData, fromFarmSection: '' });
    }

    if (field === 'batchNumber') {
      await fetchFromFarmSection(value);
    }
  };

  // Function to handle input changes for text inputs
  const handleInputChangeText = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Relocate Bird Batch</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="type">Type</Label>
              <Select
                id="type"
                options={typeOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'type')}
                isSearchable
                placeholder="Select Type"
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="batchNumber">Batch Number</Label>
              <Select
                id="batchNumber"
                options={batchNumberOptions}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'batchNumber')}
                isSearchable
                placeholder="Select Batch Number"
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="fromFarmSection">From Farm Section</Label>
              <Input
                type="text"
                name="fromFarmSection"
                id="fromFarmSection"
                placeholder="From Farm Section"
                value={formData.fromFarmSection}
                onChange={handleInputChangeText}
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="toFarmSection">To Farm Section</Label>
              <Select
                id="toFarmSection"
                options={farmSections}
                onChange={(selectedOption) => handleInputChange(selectedOption, 'toFarmSection')}
                isSearchable
                placeholder="Select To Farm Section"
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="quantity">Quantity</Label>
              <Input
                type="number"
                name="quantity"
                id="quantity"
                placeholder="Enter Quantity"
                value={formData.quantity}
                onChange={handleInputChangeText}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="relocationBy">Relocation By</Label>
              <Input
                type="text"
                name="relocationBy"
                id="relocationBy"
                value={formData.relocationBy}
                onChange={handleInputChangeText}
                readOnly
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="relocationReason">Relocation Reason</Label>
              <Input
                type="text"
                name="relocationReason"
                id="relocationReason"
                placeholder="Enter Relocation Reason"
                value={formData.relocationReason}
                onChange={handleInputChangeText}
                required
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">
          Relocate Batch
        </Button>
      </Form>
    </Container>
  );
};

export default RelocateBirds;
