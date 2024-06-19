import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllVegePestAndWeedControls = () => {
  const [controls, setControls] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedControl, setSelectedControl] = useState(null);
  const [editedVegetable, setEditedVegetable] = useState('');
  const [editedBatchNumber, setEditedBatchNumber] = useState('');
  const [editedPestAndWeedControlDetails, setEditedPestAndWeedControlDetails] = useState('');
  const [editedQuantityApplied, setEditedQuantityApplied] = useState('');
  const [editedApplicationDate, setEditedApplicationDate] = useState('');
  const [editedAdditionalDetails, setEditedAdditionalDetails] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-vege-pest-and-weed-control');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetable pest and weed controls');
      }
      const data = await response.json();
      setControls(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (control) => {
    setSelectedControl(control);
    setEditedVegetable(control.vegetable);
    setEditedBatchNumber(control.batchNumber);
    setEditedPestAndWeedControlDetails(control.pestAndWeedControlDetails);
    setEditedQuantityApplied(control.quantityApplied);
    setEditedApplicationDate(control.applicationDate);
    setEditedAdditionalDetails(control.additionalDetails);
    toggleModal();
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this pest and weed control?");
  
    if (!confirmDelete) {
      return;
    }
  
    try {
      const response = await fetch(`/api/delete-vege-pest-and-weed-control/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vegetable pest and weed control');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/edit-vege-pest-and-weed-control/${selectedControl._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vegetable: editedVegetable,
          batchNumber: editedBatchNumber,
          pestAndWeedControlDetails: editedPestAndWeedControlDetails,
          quantityApplied: editedQuantityApplied,
          applicationDate: editedApplicationDate,
          additionalDetails: editedAdditionalDetails
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update vegetable pest and weed control');
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
      <h1>All Vegetable Pest and Weed Controls</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vegetable</th>
            <th>Batch Number</th>
            <th>Pest and Weed Control Details</th>
            <th>Quantity Applied</th>
            <th>Application Date</th>
            <th>Additional Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {controls.map((control, index) => (
            <tr key={control._id}>
              <th scope="row">{index + 1}</th>
              <td>{control.vegetable}</td>
              <td>{control.batchNumber}</td>
              <td>{control.pestAndWeedControlDetails}</td>
              <td>{control.quantityApplied}</td>
              <td>{formatDate(control.applicationDate)}</td>
              <td>{control.additionalDetails}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(control)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(control._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Vegetable Pest and Weed Control</ModalHeader>
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
              <Label for="editedPestAndWeedControlDetails">Pest and Weed Control Details</Label>
              <Input
                type="text"
                id="editedPestAndWeedControlDetails"
                value={editedPestAndWeedControlDetails}
                onChange={(e) => setEditedPestAndAndWeedControlDetails(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="editedQuantityApplied">Quantity Applied</Label>
                <Input
                  type="text"
                  id="editedQuantityApplied"
                  value={editedQuantityApplied}
                  onChange={(e) => setEditedQuantityApplied(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="editedApplicationDate">Application Date</Label>
                <Input
                  type="date"
                  id="editedApplicationDate"
                  value={editedApplicationDate}
                  onChange={(e) => setEditedApplicationDate(e.target.value)}
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
  
  export default AllVegePestAndWeedControls;
  
