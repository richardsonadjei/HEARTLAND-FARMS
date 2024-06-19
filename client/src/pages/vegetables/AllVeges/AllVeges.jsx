import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllVeges = () => {
  const [vegetables, setVegetables] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedVegetable, setSelectedVegetable] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-vegetables');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetables');
      }
      const data = await response.json();
      setVegetables(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (vegetable) => {
    setSelectedVegetable(vegetable);
    setEditedName(vegetable.name);
    setEditedDescription(vegetable.description);
    toggleModal();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this vegetable?');
    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`/api/delete-vegetable/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vegetable');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/edit-vegetable/${selectedVegetable._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedName, description: editedDescription }),
      });
      if (!response.ok) {
        throw new Error('Failed to update vegetable');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1>All Vegetables</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vegetables.map((vegetable, index) => (
            <tr key={vegetable._id}>
              <th scope="row">{index + 1}</th>
              <td>{vegetable.name}</td>
              <td>{vegetable.description}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(vegetable)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(vegetable._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Vegetable</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editedName">Name</Label>
              <Input
                type="text"
                id="editedName"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedDescription">Description</Label>
              <Input
                type="textarea"
                id="editedDescription"
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
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

export default AllVeges;
