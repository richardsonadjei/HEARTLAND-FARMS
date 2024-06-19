import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllAnimalMedicalTreatmentGroups = () => {
  const [groups, setGroups] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/animal-medical-treatment-groups');
      if (!response.ok) {
        throw new Error('Failed to fetch animal medical treatment groups');
      }
      const data = await response.json();
      setGroups(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (group) => {
    setSelectedGroup(group);
    setEditedName(group.name);
    setEditedDescription(group.description);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/animal-medical-treatment-groups/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal medical treatment group');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/animal-medical-treatment-groups/${selectedGroup._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: editedName, description: editedDescription }),
      });
      if (!response.ok) {
        throw new Error('Failed to update animal medical treatment group');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1>All Animal Medical Treatment Groups</h1>
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
          {groups.map((group, index) => (
            <tr key={group._id}>
              <th scope="row">{index + 1}</th>
              <td>{group.name}</td>
              <td>{group.description}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px', color: 'blue' }} onClick={() => handleEdit(group)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(group._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Animal Medical Treatment Group</ModalHeader>
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

export default AllAnimalMedicalTreatmentGroups;
