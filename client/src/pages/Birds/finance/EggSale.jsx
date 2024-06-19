import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useSelector } from 'react-redux';

const EggSale = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [typeOptions, setTypeOptions] = useState([]);
  const [formData, setFormData] = useState({
    type: '',
    customerName: '',
    phoneNumber: '',
    crates: 0,
    unitPricePerCrate: 0,
    totalAmount: 0,
    category: 'unsorted',
    size: '',
    salesMadeBy: currentUser ? currentUser.userName : '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSizes, setShowSizes] = useState(false);

  useEffect(() => {
    fetchTypeOptions();
  }, []);

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
      console.error(error.message);
      setErrorMessage('Failed to fetch bird types');
    }
  };

  const handleInputChange = (selectedOption, field) => {
    setFormData({ ...formData, [field]: selectedOption.value });
  };

  const handleInputChangeText = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, category: value });
    setShowSizes(value === 'sorted');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let sufficientStock = false;
      let message = '';

      if (formData.category === 'sorted') {
        const response = await fetch('/api/sorted-bird-eggs-stock');
        if (!response.ok) {
          throw new Error('Failed to fetch sorted bird eggs stock');
        }
        const sortedStock = await response.json();

        sufficientStock = validateSortedStock(sortedStock);
        if (!sufficientStock) {
          message = 'Insufficient sorted egg stock';
        }
      } else {
        const response = await fetch('/api/unsorted-bird-eggs-stock');
        if (!response.ok) {
          throw new Error('Failed to fetch unsorted bird eggs stock');
        }
        const unsortedStock = await response.json();

        sufficientStock = validateUnsortedStock(unsortedStock);
        if (!sufficientStock) {
          message = 'Insufficient unsorted egg stock';
        }
      }

      if (!sufficientStock) {
        throw new Error(message);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    try {
      const response = await fetch('/api/egg-sale', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Failed to create egg sale');
      }
      setSuccessMessage('Egg sale created successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload();
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
    }
  };

  const validateSortedStock = (sortedStock) => {
    const { type, size, crates } = formData;
  
    // Convert crates to a number explicitly
    const numberOfCrates = Number(crates);
  
    // Find the stock item that matches the selected type and size
    const stockItem = sortedStock.sizes[size];
  
    // If no stock item is found or available crates are less than required, return false
    if (!stockItem || stockItem.crates < numberOfCrates) {
      return false;
    }
  
    // Return true if sufficient stock is available
    return true;
  };
  
  

  const validateUnsortedStock = (unsortedStock) => {
    const { type, crates } = formData;
    if (!Array.isArray(unsortedStock)) {
      return false; // Handle edge case where unsortedStock is not an array
    }
    const stockItem = unsortedStock.find(item => item.type === type);

    if (!stockItem || stockItem.crates < crates) {
      return false;
    }

    return true;
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Record Egg Sale</h1>
      {successMessage && (
        <div className="alert alert-success mt-3" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3" role="alert">
          {errorMessage}
        </div>
      )}
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
              <Label for="customerName">Customer Name</Label>
              <Input
                type="text"
                id="customerName"
                value={formData.customerName}
                onChange={(e) => handleInputChangeText(e, 'customerName')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                id="phoneNumber"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChangeText(e, 'phoneNumber')}
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                id="category"
                value={formData.category}
                onChange={handleCategoryChange}
                required
              >
                <option value="sorted">Sorted</option>
                <option value="unsorted">Unsorted</option>
              </Input>
            </FormGroup>
          </Col>
          {showSizes && (
            <Col md={6}>
              <FormGroup>
                <Label for="size">Size</Label>
                <Input
                  type="select"
                  id="size"
                  value={formData.size}
                  onChange={(e) => handleInputChangeText(e, 'size')}
                  required
                >
                  <option value="">Select Size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="extraLarge">Extra Large</option>
                </Input>
              </FormGroup>
            </Col>
          )}
          <Col md={6}>
            <FormGroup>
              <Label for="crates">Crates</Label>
              <Input
                type="number"
                id="crates"
                value={formData.crates}
                onChange={(e) => handleInputChangeText(e, 'crates')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="unitPricePerCrate">Unit Price Per Crate</Label>
              <Input
                type="number"
                id="unitPricePerCrate"
                value={formData.unitPricePerCrate}
                onChange={(e) => handleInputChangeText(e, 'unitPricePerCrate')}
                required
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="salesMadeBy">Sales Made By</Label>
              <Input
                type="text"
                id="salesMadeBy"
                value={formData.salesMadeBy}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Button color="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default EggSale;

