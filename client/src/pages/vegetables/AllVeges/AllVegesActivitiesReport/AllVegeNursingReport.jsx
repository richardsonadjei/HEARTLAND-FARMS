import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllVegeNursings = () => {
  const [nursings, setNursings] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedNursing, setSelectedNursing] = useState(null);
  const [editedVegetable, setEditedVegetable] = useState('');
  const [editedVariety, setEditedVariety] = useState('');
  const [editedBatchNumber, setEditedBatchNumber] = useState('');
  const [editedQuantityNursed, setEditedQuantityNursed] = useState('');
  const [editedStartDate, setEditedStartDate] = useState('');
  const [editedExpectedTransplantingDate, setEditedExpectedTransplantingDate] = useState('');
  const [editedAdditionalDetails, setEditedAdditionalDetails] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-vege-nursings');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetable nursings');
      }
      const data = await response.json();
      setNursings(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (nursing) => {
    setSelectedNursing(nursing);
    setEditedVegetable(nursing.vegetable);
    setEditedVariety(nursing.variety);
    setEditedBatchNumber(nursing.batchNumber);
    setEditedQuantityNursed(nursing.quantityNursed);
    setEditedStartDate(nursing.startDate);
    setEditedExpectedTransplantingDate(nursing.expectedTransplantingDate);
    setEditedAdditionalDetails(nursing.additionalDetails);
    toggleModal();
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this vegetable nursing record?');
    if (!isConfirmed) {
      return;
    }
  
    try {
      const response = await fetch(`/api/vege-nursing-records/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vegetable nursing');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };
  

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/vege-nursing-records/${selectedNursing._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vegetable: editedVegetable,
          variety: editedVariety,
          batchNumber: editedBatchNumber,
          quantityNursed: editedQuantityNursed,
          startDate: editedStartDate,
          expectedTransplantingDate: editedExpectedTransplantingDate,
          additionalDetails: editedAdditionalDetails
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update vegetable nursing');
      }
      toggleModal();
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const groupNursingsByVegetable = () => {
    return nursings.reduce((acc, nursing) => {
      const { vegetable } = nursing;
      if (!acc[vegetable]) {
        acc[vegetable] = [];
      }
      acc[vegetable].push(nursing);
      return acc;
    }, {});
  };

  const groupedNursings = groupNursingsByVegetable();

  return (
    <Container>
      <h1>All Vegetable Nursings</h1>
      {Object.keys(groupedNursings).map((vegetable) => (
        <div key={vegetable}>
          <h2>{vegetable}</h2>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Variety</th>
                <th>Batch Number</th>
                <th>Quantity Nursed</th>
                <th>Start Date</th>
                <th>Expected Transplanting Date</th>
                <th>Additional Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedNursings[vegetable].map((nursing, index) => (
                <tr key={nursing._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{nursing.variety}</td>
                  <td>{nursing.batchNumber}</td>
                  <td>{nursing.quantityNursed}</td>
                  <td>{formatDate(nursing.startDate)}</td>
                  <td>{formatDate(nursing.expectedTransplantingDate)}</td>
                  <td>{nursing.additionalDetails}</td>
                  <td>
                    <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(nursing)} />
                    <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(nursing._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Vegetable Nursing</ModalHeader>
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
              <Label for="editedVariety">Variety</Label>
              <Input
                type="text"
                id="editedVariety"
                value={editedVariety}
                onChange={(e) => setEditedVariety(e.target.value)}
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
              <Label for="editedQuantityNursed">Quantity Nursed</Label>
              <Input
                type="number"
                id="editedQuantityNursed"
                value={editedQuantityNursed}
                onChange={(e) => setEditedQuantityNursed(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedStartDate">Start Date</Label>
              <Input
                type="date"
                id="editedStartDate"
                value={editedStartDate}
                onChange={(e) => setEditedStartDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editedExpectedTransplantingDate">Expected Transplanting Date</Label>
              <Input
                type="date"
                id="editedExpectedTransplantingDate"
                value={editedExpectedTransplantingDate}
                onChange={(e) => setEditedExpectedTransplantingDate(e.target.value)}
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

export default AllVegeNursings;

