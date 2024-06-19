import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const SpecificVegeBatchesReport = () => {
  const [batches, setBatches] = useState([]);
  const [vegetableTypes, setVegetableTypes] = useState([]);
  const [selectedVegetableType, setSelectedVegetableType] = useState(null);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [editedBatchNumber, setEditedBatchNumber] = useState('');
  const [editedIsActive, setEditedIsActive] = useState(false);
  const [editedAdditionalDetails, setEditedAdditionalDetails] = useState('');

  useEffect(() => {
    fetchData();
    fetchVegetableTypes();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/batches/${selectedVegetableType ? selectedVegetableType.value : ''}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batches');
      }
      const data = await response.json();
      setBatches(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchVegetableTypes = async () => {
    try {
      const response = await fetch('/api/all-vegetables');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetable types');
      }
      const data = await response.json();
      const options = data.map((vegetable) => ({
        value: vegetable.name,
        label: vegetable.name,
      }));
      setVegetableTypes(options);
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const toggleEditModal = () => {
    setModalEdit(!modalEdit);
  };

  const toggleDeleteModal = () => {
    setModalDelete(!modalDelete);
  };

  const handleEdit = (batch) => {
    setSelectedBatch(batch);
    setEditedBatchNumber(batch.batchNumber);
    setEditedIsActive(batch.isActive);
    setEditedAdditionalDetails(batch.additionalDetails);
    toggleEditModal();
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/batches/${selectedBatch._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete batch');
      }
      toggleDeleteModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`/api/batches/${selectedBatch._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          batchNumber: editedBatchNumber,
          isActive: editedIsActive,
          additionalDetails: editedAdditionalDetails,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update batch');
      }
      toggleEditModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Function to format the date in "Monday 3rd May 2024" format
  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Container>
      <h1>Specific Vegetable Batches Report</h1>
      <Select
        options={vegetableTypes}
        onChange={(selectedOption) => setSelectedVegetableType(selectedOption)}
        value={selectedVegetableType}
        placeholder="Select vegetable type"
      />
      <Button color="primary" onClick={fetchData}>Show Batches</Button>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Created At</th> {/* Added column for Created At */}
            <th>Batch Number</th>
            <th>Active</th>
            <th>Additional Details</th>
           
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {batches.map((batch, index) => (
            <tr key={batch._id}>
              <th scope="row">{index + 1}</th>
              <td>{batch.type}</td>
              <td>{formatDate(batch.createdAt)}</td> {/* Format the created at date */}
              <td>{batch.batchNumber}</td>
              <td>{batch.isActive ? 'Yes' : 'No'}</td>
              <td>{batch.additionalDetails}</td>
             
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(batch)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => { setSelectedBatch(batch); toggleDeleteModal(); }} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modalEdit} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Batch</ModalHeader>
        <ModalBody>
          <Form>
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
              <Label for="editedIsActive">Active</Label>
              <Input
                type="select"
                id="editedIsActive"
                value={editedIsActive}
                onChange={(e) => setEditedIsActive(e.target.value === 'true')}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="editedAdditionalDetails">Additional Details</Label>
              <Input
                type="textarea"
                id="editedAdditionalDetails"
                value={editedAdditionalDetails}
                onChange={(e) => setEditedAdditionalDetails(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveEdit}>Save</Button>{' '}
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={modalDelete} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this batch?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default SpecificVegeBatchesReport;
