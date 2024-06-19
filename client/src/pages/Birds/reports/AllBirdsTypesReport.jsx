import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllBirdsTypes = () => {
  const [animalTypes, setAnimalTypes] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedAnimalType, setSelectedAnimalType] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedNotes, setEditedNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-birds-types');
      if (!response.ok) {
        throw new Error('Failed to fetch animal types');
      }
      const data = await response.json();
      setAnimalTypes(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (animalType) => {
    setSelectedAnimalType(animalType);
    setEditedName(animalType.name);
    setEditedNotes(animalType.notes);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/birds/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal type');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/birds/${selectedAnimalType._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedName, notes: editedNotes }),
      });
      if (!response.ok) {
        throw new Error('Failed to update animal type');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1>All Animal Types</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {animalTypes.map((animalType, index) => (
            <tr key={animalType._id}>
              <th scope="row">{index + 1}</th>
              <td>{animalType.name}</td>
              <td>{animalType.notes}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(animalType)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(animalType._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Animal Type</ModalHeader>
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
              <Label for="editedNotes">Notes</Label>
              <Input
                type="textarea"
                id="editedNotes"
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
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

export default AllBirdsTypes;
