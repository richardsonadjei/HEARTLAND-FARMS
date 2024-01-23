import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import Select from 'react-select';

const SellEggs = () => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [crates, setCrates] = useState('');
  const [unitPricePerCrate, setUnitPricePerCrate] = useState('');
  const [category, setCategory] = useState(null);
  const [size, setSize] = useState('');
  const [salesMadeBy, setSalesMadeBy] = useState('');

  const categoryOptions = [
    { value: 'sorted', label: 'Sorted' },
    { value: 'unsorted', label: 'Unsorted' },
  ];

  const sizeOptions = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium' },
    { value: 'large', label: 'Large' },
    { value: 'extraLarge', label: 'Extra Large' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/sell-eggs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          phoneNumber,
          crates,
          unitPricePerCrate,
          category: category ? category.value : '',
          size: category && category.value === 'sorted' ? size || undefined : undefined,
          salesMadeBy,
        }),
      });

      if (response.ok) {
        alert('Egg sale record created successfully!');
        window.location.href = '/poultry-getting-started';
      } else {
        alert('Error creating egg sale. Please try again.');
      }
    } catch (error) {
      console.error('Error creating egg sale:', error);
      alert('Internal Server Error. Please try again.');
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
      <Row>
        <Col>
          <h2 style={{ color: 'white' }}>Sell Eggs Form</h2>
          <Form onSubmit={handleSubmit}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="customerName" style={{ color: 'white' }}>Customer Name</Label>
                  <Input
                    type="text"
                    name="customerName"
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="phoneNumber" style={{ color: 'white' }}>Phone Number</Label>
                  <Input
                    type="text"
                    name="phoneNumber"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="crates" style={{ color: 'white' }}>Crates</Label>
                  <Input
                    type="text"
                    name="crates"
                    id="crates"
                    value={crates}
                    onChange={(e) => setCrates(e.target.value)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="unitPricePerCrate" style={{ color: 'white' }}>Unit Price per Crate</Label>
                  <Input
                    type="text"
                    name="unitPricePerCrate"
                    id="unitPricePerCrate"
                    value={unitPricePerCrate}
                    onChange={(e) => setUnitPricePerCrate(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="category" >Category</Label>
                  <Select
                    id="category"
                    name="category"
                    options={categoryOptions}
                    value={category}
                    onChange={(selectedOption) => setCategory(selectedOption)}
                    styles={customStyles}
                  />
                </FormGroup>
              </Col>
              {category && category.value === 'sorted' && (
                <Col md={6}>
                  <FormGroup>
                    <Label for="size" style={{ color: 'white' }}>Size</Label>
                    <Select
                      id="size"
                      name="size"
                      options={sizeOptions}
                      value={sizeOptions.find((option) => option.value === size)}
                      onChange={(selectedOption) => setSize(selectedOption.value)}
                      styles={customStyles}
                      
                    />
                  </FormGroup>
                </Col>
              )}
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="salesMadeBy" style={{ color: 'white' }}>Sales Made By</Label>
                  <Input
                    type="text"
                    name="salesMadeBy"
                    id="salesMadeBy"
                    value={salesMadeBy}
                    onChange={(e) => setSalesMadeBy(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button color="primary" type="submit">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default SellEggs;
