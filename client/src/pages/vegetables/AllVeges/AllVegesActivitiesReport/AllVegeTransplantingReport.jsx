import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllVegeTransplantings = () => {
  const [transplantings, setTransplantings] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedTransplanting, setSelectedTransplanting] = useState(null);
  const [editedVegetable, setEditedVegetable] = useState('');
  const [editedBatchNumber, setEditedBatchNumber] = useState('');
  const [editedQuantityTransplanted, setEditedQuantityTransplanted] = useState('');
  const [editedTransplantingDate, setEditedTransplantingDate] = useState('');
  const [editedExpectedHarvestDate, setEditedExpectedHarvestDate] = useState('');
  const [editedNumberOfBeds, setEditedNumberOfBeds] = useState('');
  const [editedAdditionalDetails, setEditedAdditionalDetails] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-vege-transplantings');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetable transplantings');
      }
      const data = await response.json();
      setTransplantings(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (transplanting) => {
    setSelectedTransplanting(transplanting);
    setEditedVegetable(transplanting.vegetable);
    setEditedBatchNumber(transplanting.batchNumber);
    setEditedQuantityTransplanted(transplanting.quantityTransplanted);
    setEditedTransplantingDate(transplanting.transplantingDate);
    setEditedExpectedHarvestDate(transplanting.expectedHarvestDate);
    setEditedNumberOfBeds(transplanting.numberOfBeds);
    setEditedAdditionalDetails(transplanting.additionalDetails);
    toggleModal();
  };

  const handleDelete = async (id) => {
    // Confirm delete action with user
    const confirmDelete = window.confirm("Are you sure you want to delete this vegetable transplanting?");
  
    if (!confirmDelete) {
      return; // If user cancels, exit function
    }
  
    try {
      const response = await fetch(`/api/delete-vege-transplanting/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vegetable transplanting');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/edit-vege-transplanting/${selectedTransplanting._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vegetable: editedVegetable,
          batchNumber: editedBatchNumber,
          quantityTransplanted: editedQuantityTransplanted,
          transplantingDate: editedTransplantingDate,
          expectedHarvestDate: editedExpectedHarvestDate,
          numberOfBeds: editedNumberOfBeds,
          additionalDetails: editedAdditionalDetails
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update vegetable transplanting');
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
      <h1>All Vegetable Transplantings</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vegetable</th>
            <th>Batch Number</th>
            <th>Quantity Transplanted</th>
            <th>Transplanting Date</th>
            <th>Expected Harvest Date</th>
            <th>Number of Beds</th>
            <th>Additional Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transplantings.map((transplanting, index) => (
            <tr key={transplanting._id}>
              <th scope="row">{index + 1}</th>
              <td>{transplanting.vegetable}</td>
              <td>{transplanting.batchNumber}</td>
              <td>{transplanting.quantityTransplanted}</td>
              <td>{formatDate(transplanting.transplantingDate)}</td>
              <td>{formatDate(transplanting.expectedHarvestDate)}</td>
              <td>{transplanting.numberOfBeds}</td>
              <td>{transplanting.additionalDetails}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(transplanting)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(transplanting._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Vegetable Transplanting</ModalHeader>
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
              <Label for="editedQuantityTransplanted">Quantity Transplanted</Label>
              <Input
                type="text"
                id="editedQuantityTransplanted"
                value={editedQuantityTransplanted}
                onChange={(e) => setEditedQuantityTransplanted(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedTransplantingDate">Transplanting Date</Label>
              <Input
                type="date"
                id="editedTransplantingDate"
                value={editedTransplantingDate}
                onChange={(e) => setEditedTransplantingDate(e.target.value)}
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

export default AllVegeTransplantings;
