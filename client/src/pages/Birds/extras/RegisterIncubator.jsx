import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';

const RegisterIncubator = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    capacity: 0,
    status: 'active',
    notes: '',
    yearPurchased: new Date().getFullYear(),
    amountPurchased: 0,
    supplierDetails: {
      name: '',
      contact: ''
    }
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSupplierInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      supplierDetails: {
        ...formData.supplierDetails,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register-incubator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to register incubator');
      }

      setSuccessMessage('Incubator registered successfully');
      setTimeout(() => {
        setSuccessMessage('');
        window.location.reload(); // Refresh page after successful addition
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage('');
      }, 1000);
    }
  };

  return (
    <Container>
      <h1 className="mt-5 mb-4">Register Incubator</h1>
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
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="location">Location</Label>
          <Input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="capacity">Capacity</Label>
          <Input
            type="number"
            id="capacity"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            min="1"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="status">Status</Label>
          <Input
            type="select"
            id="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="maintenance">Maintenance</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="notes">Notes</Label>
          <Input
            type="textarea"
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="yearPurchased">Year Purchased</Label>
          <Input
            type="number"
            id="yearPurchased"
            name="yearPurchased"
            value={formData.yearPurchased}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="amountPurchased">Amount Purchased</Label>
          <Input
            type="number"
            id="amountPurchased"
            name="amountPurchased"
            value={formData.amountPurchased}
            onChange={handleInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="supplierName">Supplier Name</Label>
          <Input
            type="text"
            id="supplierName"
            name="name"
            value={formData.supplierDetails.name}
            onChange={handleSupplierInputChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label for="supplierContact">Supplier Contact</Label>
          <Input
            type="text"
            id="supplierContact"
            name="contact"
            value={formData.supplierDetails.contact}
            onChange={handleSupplierInputChange}
            required
          />
        </FormGroup>
        <Button color="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
};

export default RegisterIncubator;
