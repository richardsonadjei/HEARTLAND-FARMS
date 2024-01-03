import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const MoveGuineaFowl = () => {
  const [formData, setFormData] = useState({
    batchNumber: '',
    fromFarmSection: '',
    toFarmSection: '',
    quantity: '',
    movementBy: '',
    movementReason: '',
  });

  const [farmSections, setFarmSections] = useState([]);
  const [batchNumbers, setBatchNumbers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const fetchFarmSections = async () => {
    try {
      const response = await fetch('/api/all-sections');
      const data = await response.json();
      const availableFarmSections = data.map((section) => ({ value: section.sectionName, label: section.sectionName }));
      setFarmSections(availableFarmSections);
    } catch (error) {
      console.error('Error fetching farm sections:', error);
    }
  };

  const fetchBatchDetails = async (selectedBatchNumber) => {
    try {
      const response = await fetch(`/api/guinea-fowls/${selectedBatchNumber}`);
      const data = await response.json();

      if (data.success) {
        const selectedBatch = data.data;
        setFormData((prevFormData) => ({
          ...prevFormData,
          batchNumber: selectedBatch.batchNumber || '',
          fromFarmSection: selectedBatch.farmSection || '',
          // Add a conditional check for selectedBatch.farmSection
          availableQuantity: selectedBatch.quantity || 0,
        }));
      } else {
        console.error('Error fetching batch data:', data.error);
      }
    } catch (error) {
      console.error('Error fetching batch data:', error);
    }
  };

 const handleBatchNumberChange = async (selectedBatchNumber) => {
  try {
    const response = await fetch(`/api/guinea-fowls/${selectedBatchNumber}`);
    const data = await response.json();

    if (data.success) {
      const selectedBatch = data.guineaFowl; // Update here to access the guineaFowl property
      setFormData((prevFormData) => ({
        ...prevFormData,
        batchNumber: selectedBatch.batchNumber || '',
        fromFarmSection: selectedBatch.farmSection || '',
      }));
    } else {
      console.error('Error fetching batch data:', data.error);
    }
  } catch (error) {
    console.error('Error fetching batch data:', error);
  }
};

  const fetchBatchNumbers = async () => {
    try {
      const response = await fetch('/api/all-guinea-fowl');
      if (!response.ok) {
        throw new Error('Error fetching batch numbers');
      }
      const responseData = await response.json();
      const batchNumbers = responseData.map((batch) => ({ value: batch.batchNumber, label: `${batch.batchNumber} - Stock: ${batch.quantity}` }));
      setBatchNumbers(batchNumbers);
    } catch (error) {
      console.error('Error fetching batch numbers:', error.message);
    }
  };

  // Add the handleInputChange function
  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchFarmSections();
    fetchBatchNumbers();
  }, []);

  useEffect(() => {
    // When a batch number is selected, fetch the associated farm section
    const fetchFarmSectionForBatch = async () => {
      if (formData.batchNumber) {
        try {
          const response = await fetch(`/api/guinea-fowls/${formData.batchNumber}`);
          const data = await response.json();

          if (data.success) {
            // Add a conditional check for data.data.farmSection
            setFormData((prevFormData) => ({
              ...prevFormData,
              fromFarmSection: data.data.farmSection ? data.data.farmSection : '',
            }));
          } else {
            console.error('Error fetching farm section:', data.error);
          }
        } catch (error) {
          console.error('Error fetching farm section:', error);
        }
      }
    };

    fetchFarmSectionForBatch();
  }, [formData.batchNumber]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !formData.batchNumber ||
        !formData.fromFarmSection ||
        !formData.toFarmSection ||
        !formData.quantity ||
        !formData.movementReason
      ) {
        throw new Error('All fields are required');
      }

      const response = await fetch('/api/move-guinea-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to move batch');
      }

      alert('Batch moved successfully');

      setTimeout(() => {
        window.location.href = '/guinea-fowl-dashboard';
      }, 3000);
    } catch (error) {
      alert(`Error: ${error.message}`);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#d3d3d3' : 'white',
      color: state.isFocused ? 'black' : 'black',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
  };

  return (
    <Container>
      <Row className="mt-4">
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Move Guinea Fowl Batch</h2>
          <Form onSubmit={handleSubmit} style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
            <FormGroup row>
              <Label for="batchNumber" sm={4}>
                Batch Number:
              </Label>
              <Col sm={8}>
                <Input
                  type="select"
                  id="batchNumber"
                  name="batchNumber"
                  value={formData.batchNumber}
                  onChange={(e) => {
                    handleInputChange('batchNumber', e.target.value);
                    fetchBatchDetails(e.target.value);
                  }}
                >
                  <option value="" disabled>
                    Select Batch Number
                  </option>
                  {batchNumbers.map((batch) => (
                    <option key={batch.value} value={batch.value}>
                      {batch.label}
                    </option>
                  ))}
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="fromFarmSection" sm={4}>
                From Farm Section:
              </Label>
              <Col sm={8}>
                <Input type="text" id="fromFarmSection" name="fromFarmSection" value={formData.fromFarmSection} readOnly />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="toFarmSection" sm={4}>
                To Farm Section:
              </Label>
              <Col sm={8}>
                <Select
                  id="toFarmSection"
                  name="toFarmSection"
                  value={formData.toFarmSection}
                  options={farmSections}
                  onChange={(selectedOption) => handleInputChange('toFarmSection', selectedOption.value)}
                  isSearchable
                  styles={customStyles}
                />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="quantity" sm={4}>
                Quantity:
              </Label>
              <Col sm={8}>
                <Input type="number" id="quantity" name="quantity" value={formData.quantity} onChange={(e) => handleInputChange('quantity', e.target.value)} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="movementBy" sm={4}>
                Movement By:
              </Label>
              <Col sm={8}>
                <Input type="text" id="movementBy" name="movementBy" value={formData.movementBy || currentUser.userName} readOnly />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="movementReason" sm={4}>
                Movement Reason:
              </Label>
              <Col sm={8}>
                <Input type="text" id="movementReason" name="movementReason" value={formData.movementReason} onChange={(e) => handleInputChange('movementReason', e.target.value)} />
              </Col>
            </FormGroup>

            <Button type="submit" color="primary">
              Move Batch
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default MoveGuineaFowl;
