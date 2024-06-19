import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';

const AddFarmSection = () => {
  const [sectionName, setSectionName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('');
  const [bulbType, setBulbType] = useState('');
  const [bulbCount, setBulbCount] = useState('');
  const [bulbWattage, setBulbWattage] = useState('');
  const [layingPointType, setLayingPointType] = useState('');
  const [layingPointQuantity, setLayingPointQuantity] = useState('');
  const [feederType, setFeederType] = useState('');
  const [feederQuantity, setFeederQuantity] = useState('');
  const [drinkerType, setDrinkerType] = useState('');
  const [drinkerQuantity, setDrinkerQuantity] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/bird-farm-sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sectionName,
          description,
          capacity,
          lighting: {
            bulbType,
            bulbCount,
            bulbWattage
          },
          layingPoints: {
            layingPointType,
            quantity: layingPointQuantity
          },
          feeders: {
            feederType,
            quantity: feederQuantity
          },
          drinkers: {
            drinkerType,
            quantity: drinkerQuantity
          }
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to create farm section');
      }
      setSuccess(true);
      setTimeout(() => {
        window.location.reload();
      }, 1000); // Redirect after 1 second
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Add New Farm Section</h1>
          {error && <p className="text-danger">{error}</p>}
          {success && (
            <p className="text-success">Farm section created successfully. Redirecting...</p>
          )}
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="sectionName">Section Name</Label>
              <Input
                type="text"
                id="sectionName"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="capacity">Capacity</Label>
              <Input
                type="number"
                id="capacity"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="bulbType">Bulb Type</Label>
              <Input
                type="text"
                id="bulbType"
                value={bulbType}
                onChange={(e) => setBulbType(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="bulbCount">Bulb Count</Label>
              <Input
                type="number"
                id="bulbCount"
                value={bulbCount}
                onChange={(e) => setBulbCount(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="bulbWattage">Bulb Wattage</Label>
              <Input
                type="number"
                id="bulbWattage"
                value={bulbWattage}
                onChange={(e) => setBulbWattage(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="layingPointType">Laying Point Type</Label>
              <Input
                type="text"
                id="layingPointType"
                value={layingPointType}
                onChange={(e) => setLayingPointType(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="layingPointQuantity">Laying Point Quantity</Label>
              <Input
                type="number"
                id="layingPointQuantity"
                value={layingPointQuantity}
                onChange={(e) => setLayingPointQuantity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="feederType">Feeder Type</Label>
              <Input
                type="text"
                id="feederType"
                value={feederType}
                onChange={(e) => setFeederType(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="feederQuantity">Feeder Quantity</Label>
              <Input
                type="number"
                id="feederQuantity"
                value={feederQuantity}
                onChange={(e) => setFeederQuantity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="drinkerType">Drinker Type</Label>
              <Input
                type="text"
                id="drinkerType"
                value={drinkerType}
                onChange={(e) => setDrinkerType(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="drinkerQuantity">Drinker Quantity</Label>
              <Input
                type="number"
                id="drinkerQuantity"
                value={drinkerQuantity}
                onChange={(e) => setDrinkerQuantity(e.target.value)}
              />
            </FormGroup>
            <Button type="submit" color="primary">Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddFarmSection;
