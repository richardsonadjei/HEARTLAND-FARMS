import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Form, FormGroup, Label, Input } from 'reactstrap';
import Select from 'react-select';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const BatchTransplantingReport = () => {
  const defaultType = 'Cabbage';
  const [batchOptions, setBatchOptions] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [transplantingRecord, setTransplantingRecord] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  
  const [updatedVegetable, setUpdatedVegetable] = useState('');
  const [updatedBatchNumber, setUpdatedBatchNumber] = useState('');
  const [updatedQuantity, setUpdatedQuantity] = useState('');
  const [updatedTransplantingDate, setUpdatedTransplantingDate] = useState('');
  const [updatedHarvestDate, setUpdatedHarvestDate] = useState('');
  const [updatedNumberOfBeds, setUpdatedNumberOfBeds] = useState('');
  const [updatedAdditionalDetails, setUpdatedAdditionalDetails] = useState('');

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
        throw new Error('Cabbage transplanting record not found');
      }
      const data = await response.json();
      setTransplantingRecord(data);
      setErrorMessage('');
    } catch (error) {
      setTransplantingRecord(null);
      setErrorMessage(error.message);
    }
  };

  const openEditModal = (record) => {
    setUpdatedVegetable(record.vegetable);
    setUpdatedBatchNumber(record.batchNumber);
    setUpdatedQuantity(record.quantityTransplanted);
    setUpdatedTransplantingDate(record.transplantingDate);
    setUpdatedHarvestDate(record.expectedHarvestDate);
    setUpdatedNumberOfBeds(record.numberOfBeds);
    setUpdatedAdditionalDetails(record.additionalDetails);
    toggleEditModal();
  };

  const handleEdit = async () => {
    try {
      const response = await fetch(`/api/update-vege-transplanting/${transplantingRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
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
  
      const updatedRecord = await response.json();
      setTransplantingRecord(updatedRecord);
      toggleEditModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/delete-vege-transplanting/${transplantingRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete transplanting record');
      }
  
      setTransplantingRecord(null);
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
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
                  <RiPencilLine color="blue" size={24} onClick={() => openEditModal(transplantingRecord)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={toggleDeleteModal} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Transplanting Record</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="editVegetable">Vegetable</Label>
              <Input
                type="text"
                id="editVegetable"
                value={updatedVegetable}
                onChange={(e) => setUpdatedVegetable(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editBatchNumber">Batch Number</Label>
              <Input
                type="text"
                id="editBatchNumber"
                value={updatedBatchNumber}
                onChange={(e) => setUpdatedBatchNumber(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editQuantityTransplanted">Quantity Transplanted</Label>
              <Input
                type="number"
                id="editQuantityTransplanted"
                value={updatedQuantity}
                onChange={(e) => setUpdatedQuantity(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editTransplantingDate">Transplanting Date</Label>
              <Input
                type="date"
                id="editTransplantingDate"
                value={updatedTransplantingDate}
                onChange={(e) => setUpdatedTransplantingDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editExpectedHarvestDate">Expected Harvest Date</Label>
              <Input
                type="date"
                id="editExpectedHarvestDate"
                value={updatedHarvestDate}
                onChange={(e) => setUpdatedHarvestDate(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editNumberOfBeds">Number of Beds</Label>
              <Input
                type="number"
                id="editNumberOfBeds"
                value={updatedNumberOfBeds}
                onChange={(e) => setUpdatedNumberOfBeds(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="editAdditionalDetails">Additional Details</Label>
              <Input
                type="text"
                id="editAdditionalDetails"
                value={updatedAdditionalDetails}
                onChange={(e) => setUpdatedAdditionalDetails(e.target.value)}
              />
            </FormGroup>
          </Form>
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

export default BatchTransplantingReport;
