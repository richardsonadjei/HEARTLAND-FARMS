import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllSpringOnionsDirectPlantingReport = () => {
  const [springOnionsDirectPlanting, setSpringOnionsDirectPlanting] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    getAllSpringOnionsDirectPlanting();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const getAllSpringOnionsDirectPlanting = async () => {
    try {
      const response = await fetch('/api/spring-onions-direct-planting-records');
      if (!response.ok) {
        throw new Error('Failed to fetch spring onions direct planting records');
      }
      const data = await response.json();
      setSpringOnionsDirectPlanting(data);
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
      const response = await fetch(`/api/vege-direct-plantings/${selectedRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedRecord)
      });
  
      if (!response.ok) {
        throw new Error('Failed to update direct planting record');
      }
  
      toggleEditModal(); // Close the edit modal after successful update
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };
  
  
  const handleDeleteRecord = async () => {
    try {
      const response = await fetch(`/api/vege-direct-planting/${selectedRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
  
      toggleDeleteModal();
      getAllSpringOnionsDirectPlanting();
    } catch (error) {
      console.error(error.message);
    }
  };
  
  return (
    <Container>
      <h2 className="mt-4">All Spring Onions Direct Planting Records</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Vegetable</th>
              <th>Batch Number</th>
              <th>Quantity Direct Planted</th>
              <th>Planting Date</th>
              <th>Expected Harvest Date</th>
              <th>Number of Beds</th>
              <th>Additional Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {springOnionsDirectPlanting.map((record) => (
              <tr key={record._id}>
                <td>{record.vegetable}</td>
                <td>{record.batchNumber}</td>
                <td>{record.quantityDirectPlanted}</td>
                <td>{new Date(record.plantingDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
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

      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Direct Planting Record</ModalHeader>
        <ModalBody>
          {selectedRecord && (
            <form>
              <div className="form-group">
                <label htmlFor="vegetable">Vegetable</label>
                <input type="text" className="form-control" id="vegetable" value={selectedRecord.vegetable || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, vegetable: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="batchNumber">Batch Number</label>
                <input type="text" className="form-control" id="batchNumber" value={selectedRecord.batchNumber || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, batchNumber: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="quantityDirectPlanted">Quantity Direct Planted</label>
                <input type="number" className="form-control" id="quantityDirectPlanted" value={selectedRecord.quantityDirectPlanted || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, quantityDirectPlanted: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="plantingDate">Planting Date</label>
                <input type="date" className="form-control" id="plantingDate" value={selectedRecord.plantingDate || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, plantingDate: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="expectedHarvestDate">Expected Harvest Date</label>
                <input type="date" className="form-control" id="expectedHarvestDate" value={selectedRecord.expectedHarvestDate || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, expectedHarvestDate: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="numberOfBeds">Number of Beds</label>
                <input type="number" className="form-control" id="numberOfBeds" value={selectedRecord.numberOfBeds || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, numberOfBeds: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="additionalDetails">Additional Details</label>
                <textarea className="form-control" id="additionalDetails" rows="3" value={selectedRecord.additionalDetails || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, additionalDetails: e.target.value })}></textarea>
              </div>
            </form>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSaveChanges}>Save Changes</Button>
          <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
        </ModalFooter>
      </Modal>


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

export default AllSpringOnionsDirectPlantingReport;
