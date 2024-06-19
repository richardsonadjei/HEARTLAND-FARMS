import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllVegeDirectPlantings = () => {
  const [directPlantings, setDirectPlantings] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedDirectPlanting, setSelectedDirectPlanting] = useState(null);
  const [editedVegetable, setEditedVegetable] = useState('');
  const [editedBatchNumber, setEditedBatchNumber] = useState('');
  const [editedQuantityPlanted, setEditedQuantityPlanted] = useState('');
  const [editedPlantingDate, setEditedPlantingDate] = useState('');
  const [editedExpectedHarvestDate, setEditedExpectedHarvestDate] = useState('');
  const [editedNumberOfBeds, setEditedNumberOfBeds] = useState('');
  const [editedAdditionalDetails, setEditedAdditionalDetails] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-vege-direct-plantings');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetable direct plantings');
      }
      const data = await response.json();
      setDirectPlantings(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (directPlanting) => {
    setSelectedDirectPlanting(directPlanting);
    setEditedVegetable(directPlanting.vegetable);
    setEditedBatchNumber(directPlanting.batchNumber);
    setEditedQuantityPlanted(directPlanting.quantityPlanted);
    setEditedPlantingDate(directPlanting.plantingDate);
    setEditedExpectedHarvestDate(directPlanting.expectedHarvestDate);
    setEditedNumberOfBeds(directPlanting.numberOfBeds);
    setEditedAdditionalDetails(directPlanting.additionalDetails);
    toggleModal();
  };

  const handleDelete = async (id) => {
    // Confirm delete action with user
    const confirmDelete = window.confirm("Are you sure you want to delete this vegetable direct planting?");
  
    if (!confirmDelete) {
      return; // If user cancels, exit function
    }
  
    try {
      const response = await fetch(`/api/delete-vege-direct-planting/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vegetable direct planting');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/edit-vege-direct-planting/${selectedDirectPlanting._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vegetable: editedVegetable,
          batchNumber: editedBatchNumber,
          quantityPlanted: editedQuantityPlanted,
          plantingDate: editedPlantingDate,
          expectedHarvestDate: editedExpectedHarvestDate,
          numberOfBeds: editedNumberOfBeds,
          additionalDetails: editedAdditionalDetails
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update vegetable direct planting');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      <h1>All Vegetable Direct Plantings</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vegetable</th>
            <th>Batch Number</th>
            <th>Quantity Planted</th>
            <th>Planting Date</th>
            <th>Expected Harvest Date</th>
            <th>Number of Beds</th>
            <th>Additional Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {directPlantings.map((directPlanting, index) => (
            <tr key={directPlanting._id}>
              <th scope="row">{index + 1}</th>
              <td>{directPlanting.vegetable}</td>
              <td>{directPlanting.batchNumber}</td>
              <td>{directPlanting.quantityPlanted}</td>
              <td>{formatDate(directPlanting.plantingDate)}</td>
              <td>{formatDate(directPlanting.expectedHarvestDate)}</td>
              <td>{directPlanting.numberOfBeds}</td>
              <td>{directPlanting.additionalDetails}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(directPlanting)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(directPlanting._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Vegetable Direct Planting</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editedVegetable">Vegetable</Label>
              <Input
                type="text"
                id="editedVegetable"
                value={editedVegetable}
                onChange={(e) => setEditedVegetable(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedBatchNumber">Batch Number</Label>
              <Input
                type="text"
                id="editedBatchNumber"
                value={editedBatchNumber}
                onChange={(e) => setEditedBatchNumber(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedQuantityPlanted">Quantity Planted</Label>
              <Input
                type="text"
                id="editedQuantityPlanted"
                value={editedQuantityPlanted}
                onChange={(e) => setEditedQuantityPlanted(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedPlantingDate">Planting Date</Label>
              <Input
                type="date"
                id="editedPlantingDate"
                value={editedPlantingDate}
                onChange={(e) => setEditedPlantingDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedExpectedHarvestDate">Expected Harvest Date</Label>
              <Input
                type="date"
                id="editedExpectedHarvestDate"
                value={editedExpectedHarvestDate}
                onChange={(e) => setEditedExpectedHarvestDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedNumberOfBeds">Number of Beds</Label>
              <Input
                type="number"
                id="editedNumberOfBeds"
                value={editedNumberOfBeds}
                onChange={(e) => setEditedNumberOfBeds(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedAdditionalDetails">Additional Details</Label>
              <Input
                type="text"
                id="editedAdditionalDetails"
                value={editedAdditionalDetails}
                onChange={(e) => setEditedAdditionalDetails(e.target.value)}
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

export default AllVegeDirectPlantings;

