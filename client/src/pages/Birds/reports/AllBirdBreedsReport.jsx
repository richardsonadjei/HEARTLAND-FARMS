import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllBirdBreeds = () => {
  const [birdBreeds, setBirdBreeds] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedBirdBreed, setSelectedBirdBreed] = useState(null);
  const [editedBreedName, setEditedBreedName] = useState('');
  const [editedOrigin, setEditedOrigin] = useState('');
  const [editedCharacteristics, setEditedCharacteristics] = useState('');
  const [editedPurpose, setEditedPurpose] = useState('');
  const [editedNotes, setEditedNotes] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/breeds');
      if (!response.ok) {
        throw new Error('Failed to fetch bird breeds');
      }
      const data = await response.json();
      setBirdBreeds(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (birdBreed) => {
    setSelectedBirdBreed(birdBreed);
    setEditedBreedName(birdBreed.breedName);
    setEditedOrigin(birdBreed.origin);
    setEditedCharacteristics(birdBreed.characteristics);
    setEditedPurpose(birdBreed.purpose);
    setEditedNotes(birdBreed.notes);
    toggleModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/breeds/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete bird breed');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/breeds/${selectedBirdBreed._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          breedName: editedBreedName,
          origin: editedOrigin,
          characteristics: editedCharacteristics,
          purpose: editedPurpose,
          notes: editedNotes,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update bird breed');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <h1>All Bird Breeds</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Breed Name</th>
            <th>Origin</th>
            <th>Characteristics</th>
            <th>Purpose</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {birdBreeds.map((birdBreed, index) => (
            <tr key={birdBreed._id}>
              <th scope="row">{index + 1}</th>
              <td>{birdBreed.breedName}</td>
              <td>{birdBreed.origin}</td>
              <td>{birdBreed.characteristics}</td>
              <td>{birdBreed.purpose}</td>
              <td>{birdBreed.notes}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(birdBreed)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(birdBreed._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Bird Breed</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editedBreedName">Breed Name</Label>
              <Input
                type="text"
                id="editedBreedName"
                value={editedBreedName}
                onChange={(e) => setEditedBreedName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedOrigin">Origin</Label>
              <Input
                type="text"
                id="editedOrigin"
                value={editedOrigin}
                onChange={(e) => setEditedOrigin(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedCharacteristics">Characteristics</Label>
              <Input
                type="textarea"
                id="editedCharacteristics"
                value={editedCharacteristics}
                onChange={(e) => setEditedCharacteristics(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedPurpose">Purpose</Label>
              <Input
                type="select"
                id="editedPurpose"
                value={editedPurpose}
                onChange={(e) => setEditedPurpose(e.target.value)}
              >
                <option value="Egg Production">Egg Production</option>
                <option value="Meat Production">Meat Production</option>
                <option value="Dual Purpose">Dual Purpose</option>
                <option value="Ornamental">Ornamental</option>
                <option value="Other">Other</option>
              </Input>
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

export default AllBirdBreeds;
