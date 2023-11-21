import React, { useState, useEffect } from 'react';
import { Table, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const AllSuppliers = () => {
  // State to hold the list of suppliers
  const [suppliers, setSuppliers] = useState([]);

  // Function to fetch all suppliers from the API
  const fetchSuppliers = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch('/api/suppliers');
      const data = await response.json();

      if (data.success) {
        // Update the state with the list of suppliers
        setSuppliers(data.data);
      } else {
        console.error('Error fetching suppliers:', data.message);
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  // Fetch suppliers on component mount
  useEffect(() => {
    fetchSuppliers();
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  return (
    <Container>
      <h2>All Suppliers</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Street Address</th>
            <th>City</th>
            <th>Region</th>
            <th>GhanaPost GPS</th>
            <th>Country</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Sales Rep Name</th>
            <th>Sales Rep Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>
                <Link to={`/update-supplier`}>
                  {supplier.SupplierName}
                </Link>
              </td>
              <td>{supplier.StreetAddress}</td>
              <td>{supplier.City}</td>
              <td>{supplier.Region}</td>
              <td>{supplier.GhanaPostGPS}</td>
              <td>{supplier.Country}</td>
              <td>{supplier.PhoneNumber}</td>
              <td>{supplier.Email}</td>
              <td>{supplier.SalesRepName}</td>
              <td>{supplier.SalesRepPhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllSuppliers;
