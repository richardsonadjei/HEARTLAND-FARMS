import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const CarrotBatchTransplantingReport = () => {
  const defaultType = 'Carrot';
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [transplantingRecord, setTransplantingRecord] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    fetchBatchOptions(defaultType);
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const handleBatchSelectChange = (selectedOption) => {
    setSelectedBatch(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/vege-transplanting/${selectedBatch.value}`);
      if (!response.ok) {
        throw new Error('Spring Onion transplanting record not found');
      }
      const data = await response.json();
      setTransplantingRecord(data);
      setErrorMessage('');
    } catch (error) {
      setTransplantingRecord(null);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/cabbage-transplanting/${transplantingRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          // Include the fields you want to update
          vegetable: updatedVegetable,
          batchNumber: updatedBatchNumber,
          quantityTransplanted: updatedQuantity,
          transplantingDate: updatedTransplantingDate,
          expectedHarvestDate: updatedHarvestDate,
          numberOfBeds: updatedNumberOfBeds,
          additionalDetails: updatedAdditionalDetails
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to update transplanting record');
      }
  
      // Optionally, you can fetch the updated record from the server and update the state
      // Example:
      const updatedRecord = await response.json();
      setTransplantingRecord(updatedRecord);
  
      // Close the edit modal
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/cabbage-transplanting/${transplantingRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete transplanting record');
      }
  
      // Reset the state and close the delete modal
      setTransplantingRecord(null);
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  const fetchBatchOptions = async (type) => {
    try {
      const response = await fetch(`/api/all-batches/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch batch numbers');
      }
      const batches = await response.json();
      const options = batches.map((batch) => ({ value: batch.batchNumber, label: batch.batchNumber }));
      setBatchOptions(options);
    } catch (error) {
      console.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate.replace(/(\d+)(st|nd|rd|th)/, "$1<sup>$2</sup>");
  };
  

  return (
    <Container>
      <h2 className="mt-4">Cabbage Batch Transplanting Report</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="batchNumber">Select Batch Number:</Label>
          <Select
            id="batchNumber"
            options={batchOptions}
            value={selectedBatch}
            onChange={handleBatchSelectChange}
            isSearchable
            placeholder="Select Batch Number"
          />
          <Button type="submit" color="primary">Submit</Button>
        </FormGroup>
      </Form>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="table-responsive">
        {transplantingRecord && (
          <table className="table">
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
            {transplantingRecord && (
              <tr>
                <td>1</td>
                <td>{transplantingRecord.vegetable}</td>
                <td>{transplantingRecord.batchNumber}</td>
                <td>{transplantingRecord.quantityTransplanted}</td>
                <td>{formatDate(transplantingRecord.transplantingDate)}</td>
                <td>{formatDate(transplantingRecord.expectedHarvestDate)}</td>
                <td>{transplantingRecord.numberOfBeds}</td>
                <td>{transplantingRecord.additionalDetails}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={toggleEditModal} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Transplanting Record</ModalHeader>
        <ModalBody>
          {/* Edit form */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEdit}>Save Changes</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this record?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDelete}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default CarrotBatchTransplantingReport;
