import React, { useState, useEffect } from 'react';
import { Table, Container, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const AllSuppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [modal, setModal] = useState(false);
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  const toggleDeleteConfirmationModal = () => setDeleteConfirmationModal(!deleteConfirmationModal);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch('/api/suppliers');
      const data = await response.json();

      if (data.success) {
        setSuppliers(data.data);
      } else {
        console.error('Error fetching suppliers:', data.message);
      }
    } catch (error) {
      console.error('Error fetching suppliers:', error);
    }
  };

  const handleEdit = (supplier) => {
    setSelectedSupplier(supplier);
    toggleModal();
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/suppliers/${selectedSupplier._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedSupplier),
      });

      if (response.ok) {
        toggleModal();
        fetchSuppliers(); // Refresh suppliers after update
      } else {
        console.error('Failed to update supplier');
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  const handleDelete = (supplier) => {
    setSelectedSupplier(supplier);
    toggleDeleteConfirmationModal();
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`/api/suppliers/${selectedSupplier._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSuppliers(); // Refresh suppliers after deletion
      } else {
        console.error('Failed to delete supplier');
      }

      toggleDeleteConfirmationModal();
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier._id}>
              <td>
                <Link to="#" onClick={() => handleEdit(supplier)}>
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
              <td>
                <span className="mr-2" onClick={() => handleEdit(supplier)}>
                  <FaEdit className="text-primary" />
                </span>
                <span onClick={() => handleDelete(supplier)}>
                  <FaTrashAlt className="text-danger" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Update Supplier Modal */}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Supplier</ModalHeader>
        <ModalBody style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
          <Form>
            <FormGroup>
              <Label for="supplierName">Supplier Name</Label>
              <Input type="text" name="supplierName" id="supplierName" value={selectedSupplier.SupplierName} disabled />
            </FormGroup>
            <FormGroup>
              <Label for="streetAddress">Street Address</Label>
              <Input
                type="text"
                name="streetAddress"
                id="streetAddress"
                value={selectedSupplier.StreetAddress}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, StreetAddress: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                name="city"
                id="city"
                value={selectedSupplier.City}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, City: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="region">Region</Label>
              <Input
                type="text"
                name="region"
                id="region"
                value={selectedSupplier.Region}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, Region: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="ghanaPostGPS">GhanaPost GPS</Label>
              <Input
                type="text"
                name="ghanaPostGPS"
                id="ghanaPostGPS"
                value={selectedSupplier.GhanaPostGPS}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, GhanaPostGPS: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="country">Country</Label>
              <Input
                type="text"
                name="country"
                id="country"
                value={selectedSupplier.Country}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, Country: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phoneNumber">Phone Number</Label>
              <Input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                value={selectedSupplier.PhoneNumber}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, PhoneNumber: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                value={selectedSupplier.Email}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, Email: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="salesRepName">Sales Rep Name</Label>
              <Input
                type="text"
                name="salesRepName"
                id="salesRepName"
                value={selectedSupplier.SalesRepName}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, SalesRepName: e.target.value })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="salesRepPhoneNumber">Sales Rep Phone Number</Label>
              <Input
                type="text"
                name="salesRepPhoneNumber"
                id="salesRepPhoneNumber"
                value={selectedSupplier.SalesRepPhoneNumber}
                onChange={(e) => setSelectedSupplier({ ...selectedSupplier, SalesRepPhoneNumber: e.target.value })}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdate}>
            Update
          </Button>{' '}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={deleteConfirmationModal} toggle={toggleDeleteConfirmationModal}>
        <ModalHeader toggle={toggleDeleteConfirmationModal}>Confirm Delete</ModalHeader>
        <ModalBody style={{ backgroundColor: '#f8d7da', color: '#721c24' }}>
          Are you sure you want to delete {selectedSupplier.SupplierName}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={confirmDelete}>
            Yes, Delete
          </Button>{' '}
          <Button color="secondary" onClick={toggleDeleteConfirmationModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllSuppliers;
