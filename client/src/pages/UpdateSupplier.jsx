import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Input, Button, Container } from 'reactstrap';
import { useParams } from 'react-router-dom';

const UpdateSupplier = () => {
  const { supplierName } = useParams();

  // State to hold form data
  const [formData, setFormData] = useState({
    SupplierName: '',
    StreetAddress: '',
    City: '',
    Region: '',
    GhanaPostGPS: '',
    Country: '',
    PhoneNumber: '',
    Email: '',
    SalesRepName: '',
    SalesRepPhoneNumber: '',
  });

  // Function to fetch supplier details on component mount
useEffect(() => {
    const fetchSupplierDetails = async () => {
      try {
        // Replace with your API endpoint
        const response = await fetch(`/api/suppliers/${supplierName}`);
        const data = await response.json();
  
        if (data.success) {
          // Check if the keys exist before updating the state
          const updatedFormData = {};
  
          for (const key in formData) {
            if (data.data.hasOwnProperty(key)) {
              updatedFormData[key] = data.data[key];
            }
          }
  
          // Update the state with supplier details
          setFormData((prevFormData) => ({ ...prevFormData, ...updatedFormData }));
        } else {
          console.error('Error fetching supplier details:', data.message);
        }
      } catch (error) {
        console.error('Error fetching supplier details:', error);
      }
    };
  
    fetchSupplierDetails();
  }, [supplierName]); // Remove formData from the dependency array
  
  

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the supplier
      const response = await fetch(`/api/update-supplier/${supplierName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Display success or error message
      console.log(data.message);
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container>
      <h2>Update Supplier</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="SupplierName">Supplier Name:</Label>
          <Input
            type="text"
            name="SupplierName"
            id="SupplierName"
            value={formData.SupplierName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="StreetAddress">Street Address:</Label>
          <Input
            type="text"
            name="StreetAddress"
            id="StreetAddress"
            value={formData.StreetAddress}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="City">City:</Label>
          <Input
            type="text"
            name="City"
            id="City"
            value={formData.City}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="Region">Region:</Label>
          <Input
            type="text"
            name="Region"
            id="Region"
            value={formData.Region}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="GhanaPostGPS">GhanaPost GPS:</Label>
          <Input
            type="text"
            name="GhanaPostGPS"
            id="GhanaPostGPS"
            value={formData.GhanaPostGPS}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for="Country">Country:</Label>
          <Input
            type="text"
            name="Country"
            id="Country"
            value={formData.Country}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="PhoneNumber">Phone Number:</Label>
          <Input
            type="text"
            name="PhoneNumber"
            id="PhoneNumber"
            value={formData.PhoneNumber}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="Email">Email:</Label>
          <Input
            type="email"
            name="Email"
            id="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="SalesRepName">Sales Representative Name:</Label>
          <Input
            type="text"
            name="SalesRepName"
            id="SalesRepName"
            value={formData.SalesRepName}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label for="SalesRepPhoneNumber">Sales Representative Phone Number:</Label>
          <Input
            type="text"
            name="SalesRepPhoneNumber"
            id="SalesRepPhoneNumber"
            value={formData.SalesRepPhoneNumber}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button type="submit">Update Supplier</Button>
      </Form>
    </Container>
  );
};

export default UpdateSupplier;
