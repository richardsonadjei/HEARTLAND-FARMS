import React, { useState, useEffect } from 'react';
import { Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { RiEdit2Line, RiDeleteBin6Line } from 'react-icons/ri';

const AllVegeFertilizerApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editedVegetable, setEditedVegetable] = useState('');
  const [editedBatchNumber, setEditedBatchNumber] = useState('');
  const [editedFertilizerDetails, setEditedFertilizerDetails] = useState('');
  const [editedQuantityApplied, setEditedQuantityApplied] = useState('');
  const [editedApplicationDate, setEditedApplicationDate] = useState('');
  const [editedAdditionalDetails, setEditedAdditionalDetails] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/all-veges-fertilizer-applications');
      if (!response.ok) {
        throw new Error('Failed to fetch vegetable fertilizer applications');
      }
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleEdit = (application) => {
    setSelectedApplication(application);
    setEditedVegetable(application.vegetable);
    setEditedBatchNumber(application.batchNumber);
    setEditedFertilizerDetails(application.fertilizerDetails);
    setEditedQuantityApplied(application.quantityApplied);
    setEditedApplicationDate(application.applicationDate);
    setEditedAdditionalDetails(application.additionalDetails);
    toggleModal();
  };

  const handleDelete = async (id) => {
    // Confirm delete action with user
    const confirmDelete = window.confirm("Are you sure you want to delete this fertilizer application?");
  
    if (!confirmDelete) {
      return; // If user cancels, exit function
    }
  
    try {
      const response = await fetch(`/api/delete-vege-fertilizer-application/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete vegetable fertilizer application');
      }
      fetchData();
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/edit-vege-fertilizer-application/${selectedApplication._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vegetable: editedVegetable,
          batchNumber: editedBatchNumber,
          fertilizerDetails: editedFertilizerDetails,
          quantityApplied: editedQuantityApplied,
          applicationDate: editedApplicationDate,
          additionalDetails: editedAdditionalDetails
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update fertilizer application');
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
      <h1>All Vegetable Fertilizer Applications</h1>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Vegetable</th>
            <th>Batch Number</th>
            <th>Fertilizer Details</th>
            <th>Quantity Applied</th>
            <th>Application Date</th>
            <th>Additional Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application, index) => (
            <tr key={application._id}>
              <th scope="row">{index + 1}</th>
              <td>{application.vegetable}</td>
              <td>{application.batchNumber}</td>
              <td>{application.fertilizerDetails}</td>
              <td>{application.quantityApplied}</td>
              <td>{formatDate(application.applicationDate)}</td>
              <td>{application.additionalDetails}</td>
              <td>
                <RiEdit2Line size={20} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(application)} />
                <RiDeleteBin6Line size={20} style={{ cursor: 'pointer' }} onClick={() => handleDelete(application._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Fertilizer Application</ModalHeader>
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
              <Label for="editedFertilizerDetails">Fertilizer Details</Label>
              <Input
                type="text"
                id="editedFertilizerDetails"
                value={editedFertilizerDetails}
                onChange={(e) => setEditedFertilizerDetails(e.target.value)}
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
  
  export default AllVegeFertilizerApplications;
  
