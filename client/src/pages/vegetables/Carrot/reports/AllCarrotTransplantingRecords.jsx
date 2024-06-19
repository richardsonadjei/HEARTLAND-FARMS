import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, FormGroup, Label, Input, Form } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllCarrotTransplantingReport = () => {
  const [cabbageTransplantingRecords, setCabbageTransplantingRecords] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    getAllCabbageTransplantingRecords();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const getAllCabbageTransplantingRecords = async () => {
    try {
      const response = await fetch('/api/all-carrot-transplanting-records');
      if (!response.ok) {
        throw new Error('Failed to fetch cabbage transplanting records');
      }
      const data = await response.json();
      setCabbageTransplantingRecords(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    toggleEditModal();
  };
  
  const handleDelete = (record) => {
    setSelectedRecord(record);
    toggleDeleteModal();
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/update-vege-transplanting/${selectedRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedRecord)
      });
  
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
  
      toggleEditModal();
      // Optionally, you can fetch all cabbage transplanting records again to refresh the data
      getAllCabbageTransplantingRecords();
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };
  
  const handleDeleteRecord = async () => {
    try {
      const response = await fetch(`/api/delete-vege-transplanting/${selectedRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
  
      toggleDeleteModal();
      // Optionally, you can fetch all cabbage transplanting records again to refresh the data
      getAllCabbageTransplantingRecords();
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };
  
  return (
    <Container>
      <h2 className="mt-4">All Green Pepper Transplanting Records</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
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
            {cabbageTransplantingRecords.map((record, index) => (
              <tr key={record._id}>
                <td>{record.vegetable}</td>
                <td>{record.batchNumber}</td>
                <td>{record.quantityTransplanted}</td>
                <td>{new Date(record.transplantingDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{new Date(record.expectedHarvestDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{record.numberOfBeds}</td>
                <td>{record.additionalDetails}</td>
                <td>
                  <RiPencilLine color="blue" size={24} onClick={() => handleEdit(record)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  <RiDeleteBinLine color="red" size={24} onClick={() => handleDelete(record)} style={{ cursor: 'pointer' }} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Transplanting Record</ModalHeader>
        <ModalBody>
          {selectedRecord && (
            <Form>
              <FormGroup>
                <Label for="vegetable">Vegetable</Label>
                <Input type="text" name="vegetable" id="vegetable" value={selectedRecord.vegetable || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, vegetable: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="batchNumber">Batch Number</Label>
                <Input type="text" name="batchNumber" id="batchNumber" value={selectedRecord.batchNumber || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, batchNumber: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="quantityTransplanted">Quantity Transplanted</Label>
                <Input type="number" name="quantityTransplanted" id="quantityTransplanted" value={selectedRecord.quantityTransplanted || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, quantityTransplanted: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="transplantingDate">Transplanting Date</Label>
                <Input type="date" name="transplantingDate" id="transplantingDate" value={selectedRecord.transplantingDate || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, transplantingDate: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="expectedHarvestDate">Expected Harvest Date</Label>
                <Input type="date" name="expectedHarvestDate" id="expectedHarvestDate" value={selectedRecord.expectedHarvestDate || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, expectedHarvestDate: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="numberOfBeds">Number of Beds</Label>
                <Input type="number" name="numberOfBeds" id="numberOfBeds" value={selectedRecord.numberOfBeds || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, numberOfBeds: e.target.value })} />
              </FormGroup>
              <FormGroup>
                <Label for="additionalDetails">Additional Details</Label>
                <Input type="textarea" name="additionalDetails" id="additionalDetails" value={selectedRecord.additionalDetails || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, additionalDetails: e.target.value })} />
              </FormGroup>
            </Form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>
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
          <Button color="danger" onClick={handleDeleteRecord}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllCarrotTransplantingReport;
