import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllIncubators = () => {
  const [incubators, setIncubators] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedIncubator, setSelectedIncubator] = useState(null);
  const [editedFormData, setEditedFormData] = useState({
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-incubators');
      if (!response.ok) {
        throw new Error('Failed to fetch incubators');
      }
      const data = await response.json();
      setIncubators(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (incubator) => {
    setSelectedIncubator(incubator);
    setEditedFormData({
      name: incubator.name,
      location: incubator.location,
      capacity: incubator.capacity,
      status: incubator.status,
      notes: incubator.notes,
      yearPurchased: incubator.yearPurchased,
      amountPurchased: incubator.amountPurchased,
      supplierDetails: incubator.supplierDetails
    });
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/incubators/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete incubator');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData({ ...editedFormData, [name]: value });
  };

  const handleSupplierInputChange = (e) => {
    const { name, value } = e.target;
    setEditedFormData({
      ...editedFormData,
      supplierDetails: {
        ...editedFormData.supplierDetails,
        [name]: value
      }
    });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/incubators/${selectedIncubator._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedFormData),
      });
      if (!response.ok) {
        throw new Error('Failed to update incubator');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1>All Incubators</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Year Purchased</th>
            <th>Amount Purchased</th>
            <th>Supplier Name</th>
            <th>Supplier Contact</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {incubators.map((incubator, index) => (
            <tr key={incubator._id}>
              <th scope="row">{index + 1}</th>
              <td>{incubator.incubatorId}</td>
              <td>{incubator.name}</td>
              <td>{incubator.location}</td>
              <td>{incubator.capacity}</td>
              <td>{incubator.status}</td>
              <td>{incubator.yearPurchased}</td>
              <td>{incubator.amountPurchased}</td>
              <td>{incubator.supplierDetails.name}</td>
              <td>{incubator.supplierDetails.contact}</td>
              <td>{incubator.notes}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }} onClick={() => handleEdit(incubator)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(incubator._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Incubator</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={editedFormData.name}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={editedFormData.location}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="capacity">Capacity</Label>
              <Input
                type="number"
                id="capacity"
                name="capacity"
                value={editedFormData.capacity}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="status">Status</Label>
              <Input
                type="select"
                id="status"
                name="status"
                value={editedFormData.status}
                onChange={handleInputChange}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="yearPurchased">Year Purchased</Label>
              <Input
                type="number"
                id="yearPurchased"
                name="yearPurchased"
                value={editedFormData.yearPurchased}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="amountPurchased">Amount Purchased</Label>
              <Input
                type="number"
                id="amountPurchased"
                name="amountPurchased"
                value={editedFormData.amountPurchased}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="supplierName">Supplier Name</Label>
              <Input
                type="text"
                id="supplierName"
                name="name"
                value={editedFormData.supplierDetails.name}
                onChange={handleSupplierInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="supplierContact">Supplier Contact</Label>
              <Input
                type="text"
                id="supplierContact"
                name="contact"
                value={editedFormData.supplierDetails.contact}
                onChange={handleSupplierInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="notes">Notes</Label>
              <Input
                type="textarea"
                id="notes"
                name="notes"
                value={editedFormData.notes}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSave}>Save</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllIncubators;
