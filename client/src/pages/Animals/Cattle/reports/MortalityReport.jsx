import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const MortalityReport = () => {
  const defaultType = 'Cattle';
  const [mortalityRecords, setMortalityRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchMortalityRecords(defaultType);
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchMortalityRecords = async (type) => {
    try {
      const response = await fetch(`/api/animal-mortality?type=${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch mortality records');
      }
      const data = await response.json();
      setMortalityRecords(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    toggleEditModal();
  };

  const handleDelete = async (record) => {
    try {
      const response = await fetch(`/api/mortality-records/${record._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete mortality record');
      }
      setMortalityRecords(mortalityRecords.filter((r) => r._id !== record._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      // Handle error message
    }
  };
  
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/mortality-records/${selectedRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRecord),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update mortality record data');
      }
  
      const updatedRecord = await response.json();
  
      const updatedMortalityRecords = mortalityRecords.map((record) =>
        record._id === updatedRecord._id ? updatedRecord : record
      );
      setMortalityRecords(updatedMortalityRecords);
  
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error if failed to save changes
    }
  };
  
  return (
    <Container fluid>
      <h2 className="mt-4">Mortality Report</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {mortalityRecords.map((record, index) => (
        <div key={record._id} className="table-responsive mt-4">
          <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>Record #{index + 1}</h3>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>Type</th>
                <th>Animal ID</th>
                <th>Date</th>
                <th>Cause</th>
                <th>Recorded By</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{record.type}</td>
                <td>{record.animalId}</td>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.cause}</td>
                <td>{record.recordedBy}</td>
                <td>{record.notes}</td>
                <td>
                  <RiPencilLine color="blue" size={24} style={{ cursor: 'pointer', marginRight: '10px' }} onClick={() => handleEdit(record)} />
                  <RiDeleteBinLine color="red" size={24} style={{ cursor: 'pointer' }} onClick={() => handleDelete(record)} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
  <ModalHeader toggle={toggleEditModal}>Edit Mortality Record</ModalHeader>
  {selectedRecord && (
    <form onSubmit={handleSaveChanges}>
      <div className="form-group">
        <label htmlFor="editType">Type</label>
        <input type="text" className="form-control" id="editType" value={selectedRecord.type} onChange={(e) => setSelectedRecord({ ...selectedRecord, type: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="editAnimalId">Animal ID</label>
        <input type="text" className="form-control" id="editAnimalId" value={selectedRecord.animalId} onChange={(e) => setSelectedRecord({ ...selectedRecord, animalId: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="editDate">Date</label>
        <input type="date" className="form-control" id="editDate" value={selectedRecord.date.substring(0, 10)} onChange={(e) => setSelectedRecord({ ...selectedRecord, date: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="editCause">Cause</label>
        <input type="text" className="form-control" id="editCause" value={selectedRecord.cause} onChange={(e) => setSelectedRecord({ ...selectedRecord, cause: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="editRecordedBy">Recorded By</label>
        <input type="text" className="form-control" id="editRecordedBy" value={selectedRecord.recordedBy} onChange={(e) => setSelectedRecord({ ...selectedRecord, recordedBy: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="editNotes">Notes</label>
        <textarea className="form-control" id="editNotes" rows="3" value={selectedRecord.notes} onChange={(e) => setSelectedRecord({ ...selectedRecord, notes: e.target.value })}></textarea>
      </div>
      <ModalFooter>
        <Button color="primary" type="submit">Save Changes</Button>
        <Button color="secondary" onClick={toggleEditModal}>Cancel</Button>
      </ModalFooter>
    </form>
  )}
</Modal>


      {/* Delete Modal */}
      <Modal isOpen={deleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Confirm Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this record?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={toggleDeleteModal}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default MortalityReport;
