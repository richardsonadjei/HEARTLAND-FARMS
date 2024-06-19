import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, FormGroup, Label, Input, Form } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllCabbageNursingRecords = () => {
  const [cabbageNursingRecords, setCabbageNursingRecords] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    getAllCabbageNursingRecords();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const getAllCabbageNursingRecords = async () => {
    try {
      const response = await fetch('/api/cabbage-nursing-records');
      if (!response.ok) {
        throw new Error('Failed to fetch cabbage nursing records');
      }
      const data = await response.json();
      setCabbageNursingRecords(data);
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
      const response = await fetch(`/api/cabbage-nursing-records/${selectedRecord._id}`, {
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
      // Optionally, you can fetch all cabbage nursing records again to refresh the data
      getAllCabbageNursingRecords();
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };
  
  const handleDeleteRecord = async () => {
    try {
      const response = await fetch(`/api/cabbage-nursing-records/${selectedRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
  
     
      toggleDeleteModal();
      // Optionally, you can fetch all cabbage nursing records again to refresh the data
      getAllCabbageNursingRecords();
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };
  
  
  return (
    <Container>
      <h2 className="mt-4">All Cabbage Nursing Records</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Vegetable</th>
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
            {cabbageNursingRecords.map((record) => (
              <tr key={record._id}>
                <td>{record.vegetable}</td>
                <td>{record.variety}</td>
                <td>{record.batchNumber}</td>
                <td>{record.quantityNursed}</td>
                <td>{new Date(record.startDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
                <td>{new Date(record.expectedTransplantingDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
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
        <ModalHeader toggle={toggleEditModal}>Edit Nursery Record</ModalHeader>
        <ModalBody>
  {selectedRecord && (
    <Form>
      <FormGroup>
        <Label for="vegetable">Vegetable</Label>
        <Input type="text" name="vegetable" id="vegetable" value={selectedRecord.vegetable || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, vegetable: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="variety">Variety</Label>
        <Input type="text" name="variety" id="variety" value={selectedRecord.variety || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, variety: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="batchNumber">Batch Number</Label>
        <Input type="text" name="batchNumber" id="batchNumber" value={selectedRecord.batchNumber || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, batchNumber: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="quantityNursed">Quantity Nursed</Label>
        <Input type="number" name="quantityNursed" id="quantityNursed" value={selectedRecord.quantityNursed || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, quantityNursed: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="startDate">Start Date</Label>
        <Input type="date" name="startDate" id="startDate" value={selectedRecord.startDate || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, startDate: e.target.value })} />
      </FormGroup>
      <FormGroup>
        <Label for="expectedTransplantingDate">Expected Transplanting Date</Label>
        <Input type="date" name="expectedTransplantingDate" id="expectedTransplantingDate" value={selectedRecord.expectedTransplantingDate || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, expectedTransplantingDate: e.target.value })} />
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

export default AllCabbageNursingRecords;
