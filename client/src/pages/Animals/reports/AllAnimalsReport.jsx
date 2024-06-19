import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllAnimalsReport = () => {
  const [animals, setAnimals] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-animals');
      if (!response.ok) {
        throw new Error('Failed to fetch animals');
      }
      const data = await response.json();
      setAnimals(data);
    } catch (error) {
      console.error('Failed to fetch animals:', error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (animal) => {
    setSelectedAnimal(animal);
    toggleModal();
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetch(`/api/update-animal-id/${selectedAnimal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedAnimal),
      });
      if (!response.ok) {
        throw new Error('Failed to edit animal');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error('Failed to edit animal:', error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this animal?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/delete-animal-id/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal');
      }
      fetchData();
    } catch (error) {
      console.error('Failed to delete animal:', error.message);
    }
  };

  return (
    <Container>
      <h1>All Animals Report</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Id Number</th>
            <th>Specie</th>
            <th>Breed</th>
            <th>Identity Tag</th>
            <th>Birth Date</th>
            <th>Current Age</th>
            <th>Gender</th>
            <th>Farm House Location</th>
            <th>Total</th>
            <th>Additional Details</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal, index) => (
            <tr key={animal._id}>
              <th scope="row">{index + 1}</th>
              <td>{animal.type}</td>
              <td>{animal.identityNumber}</td>
              <td>{animal.specie}</td>
              <td>{animal.breed}</td>
              <td>{animal.identityTag}</td>
              <td>{new Date(animal.birthDate).toLocaleDateString()}</td>
              <td>{animal.currentAge}</td>
              <td>{animal.gender}</td>
              <td>{animal.farmHouseLocation}</td>
              <td>{animal.total}</td>
              <td>{animal.additionalDetails}</td>
              <td>{animal.createdBy}</td>
              <td>
                <RiEdit2Line
                  size={20}
                  style={{ cursor: 'pointer', marginRight: '10px' }}
                  onClick={() => handleEdit(animal)}
                />
                <RiDeleteBin6Line
                  size={20}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(animal._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Animal</ModalHeader>
        <ModalBody>
  {selectedAnimal && (
    <Form>
      <FormGroup>
        <Label for="type">Type</Label>
        <Input
          type="text"
          id="type"
          value={selectedAnimal.type}
          onChange={(e) => setSelectedAnimal({ ...selectedAnimal, type: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="specie">Specie</Label>
        <Input
          type="text"
          id="specie"
          value={selectedAnimal.specie}
          onChange={(e) => setSelectedAnimal({ ...selectedAnimal, specie: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="breed">Breed</Label>
        <Input
          type="text"
          id="breed"
          value={selectedAnimal.breed}
          onChange={(e) => setSelectedAnimal({ ...selectedAnimal, breed: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="identityTag">Identity Tag</Label>
        <Input
          type="text"
          id="identityTag"
          value={selectedAnimal.identityTag}
          onChange={(e) => setSelectedAnimal({ ...selectedAnimal, identityTag: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="birthDate">Birth Date</Label>
        <Input
          type="date"
          id="birthDate"
          value={selectedAnimal.birthDate}
          onChange={(e) => setSelectedAnimal({ ...selectedAnimal, birthDate: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="gender">Gender</Label>
        <Input
          type="select"
          id="gender"
          value={selectedAnimal.gender}
          onChange={(e) => setSelectedAnimal({ ...selectedAnimal, gender: e.target.value })}
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="farmHouseLocation">Farm House Location</Label>
        <Input
          type="text"
          id="farmHouseLocation"
          value={selectedAnimal.farmHouseLocation}
          onChange={(e) => setSelectedAnimal({ ...selectedAnimal, farmHouseLocation: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="total">Total</Label>
        <Input
          type="number"
          id="total"
          value={selectedAnimal.total}
          onChange={(e) => setSelectedAnimal({ ...selectedAnimal, total: e.target.value })}
        />
      </FormGroup>
      <FormGroup>
        <Label for="additionalDetails">Additional Details</Label>
        <Input
          type="textarea"
          id="additionalDetails"
          value={selectedAnimal.additionalDetails}
          onChange={(e) => setSelectedAnimal({ ...selectedAnimal, additionalDetails: e.target.value })}
        />
      </FormGroup>
    </Form>
  )}
</ModalBody>


        <ModalFooter>
          <Button color="primary" onClick={handleEditSubmit}>Save</Button>{' '}
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllAnimalsReport;
