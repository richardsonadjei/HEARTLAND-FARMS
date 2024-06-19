import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const  AllCarrotFertilizerApplicationRecord = () => {
  const [cabbageFertilizerApplications, setCabbageFertilizerApplications] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    getAllCabbageFertilizerApplications();
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const getAllCabbageFertilizerApplications = async () => {
    try {
      const response = await fetch('/api/all-carrot-fertilizer-appication-records');
      if (!response.ok) {
        throw new Error('Failed to fetch cabbage fertilizer application records');
      }
      const data = await response.json();
      setCabbageFertilizerApplications(data);
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
      const response = await fetch(`/api/vege-fertilizer-applications/${selectedRecord._id}`, {
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
      // Optionally, you can fetch all cabbage fertilizer application records again to refresh the data
      getAllCabbageFertilizerApplications();
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };
  
  const handleDeleteRecord = async () => {
    try {
      const response = await fetch(`/api/vege-fertilizer-applications/${selectedRecord._id}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete record');
      }
  
      toggleDeleteModal();
      // Optionally, you can fetch all cabbage fertilizer application records again to refresh the data
      getAllCabbageFertilizerApplications();
    } catch (error) {
      console.error(error.message);
      // Handle error
    }
  };
  
  return (
    <Container>
      <h2 className="mt-4">All Spring Onions Fertilizer Application Records</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Vegetable</th>
              
              <th>Batch Number</th>
              <th>Quantity Applied</th>
              <th>Application Date</th>
              <th>Additional Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cabbageFertilizerApplications.map((record) => (
              <tr key={record._id}>
                <td>{record.vegetable}</td>
                
                <td>{record.batchNumber}</td>
                <td>{record.quantityApplied}</td>
                <td>{new Date(record.applicationDate).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</td>
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
        <ModalHeader toggle={toggleEditModal}>Edit Fertilizer Application Record</ModalHeader>
        <ModalBody>
          {selectedRecord && (
            <form>
              <div className="form-group">
                <label htmlFor="vegetable">Vegetable</label>
                <input type="text" className="form-control" id="vegetable" value={selectedRecord.vegetable || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, vegetable: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="variety">Variety</label>
                <input type="text" className="form-control" id="variety" value={selectedRecord.variety || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, variety: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="batchNumber">Batch Number</label>
                <input type="text" className="form-control" id="batchNumber" value={selectedRecord.batchNumber || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, batchNumber: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="quantityApplied">Quantity Applied</label>
                <input type="number" className="form-control" id="quantityApplied" value={selectedRecord.quantityApplied || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, quantityApplied: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="applicationDate">Application Date</label>
                <input type="date" className="form-control" id="applicationDate" value={selectedRecord.applicationDate || ''} onChange={(e) => setSelectedRecord({ ...selectedRecord, applicationDate: e.target.value })} />
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

export default AllCarrotFertilizerApplicationRecord;
