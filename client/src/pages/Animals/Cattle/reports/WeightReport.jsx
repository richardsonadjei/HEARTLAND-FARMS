import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AnimalWeightReport = () => {
  const defaultType = 'Cattle';
  const [animalWeightRecords, setAnimalWeightRecords] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchAnimalWeightRecords(defaultType);
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchAnimalWeightRecords = async (type) => {
    try {
      const response = await fetch(`/api/animal-weights/${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch animal weight records');
      }
      const data = await response.json();
      setAnimalWeightRecords(data);
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
      const response = await fetch(`/api/animal-weights/${record._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal weight record');
      }
      setAnimalWeightRecords(animalWeightRecords.filter((r) => r._id !== record._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      // Handle error message
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Implement logic to save changes in the edit modal
      // Assuming selectedRecord contains updated data
      const response = await fetch(`/api/animal-weights/${selectedRecord._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedRecord),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update animal weight record');
      }
      
      // Assuming the response contains the updated weight record data
      const updatedRecord = await response.json();
      
      // Update the local state with the updated record data
      const updatedAnimalWeightRecords = animalWeightRecords.map(record =>
        record._id === updatedRecord._id ? updatedRecord : record
      );
      setAnimalWeightRecords(updatedAnimalWeightRecords);
  
      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error if failed to save changes
    }
  };

  // Grouping the animal weight records by animalId
  const groupedAnimalWeightRecords = animalWeightRecords.reduce((acc, record) => {
    if (!acc[record.animalId]) {
      acc[record.animalId] = [];
    }
    acc[record.animalId].push(record);
    return acc;
  }, {});

  return (
    <Container fluid>
      <h2 className="mt-4">Animal Weight Records</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {Object.keys(groupedAnimalWeightRecords).map((animalId) => (
        <div key={animalId} className="table-responsive mt-4">
          <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>Animal ID: {animalId}</h3>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Weight (kg)</th>
                <th>Date Recorded</th>
                <th>Recorded By</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedAnimalWeightRecords[animalId].map((record, index) => (
                <tr key={record._id}>
                  <td>{index + 1}</td>
                  <td>{record.type}</td>
                  <td>{record.weight}</td>
                  <td>{new Date(record.dateRecorded).toLocaleDateString('en-US')}</td>
                  <td>{record.recordedBy}</td>
                  <td>{record.notes}</td>
                  <td>
                    <RiPencilLine color="blue" size={24} onClick={() => handleEdit(record)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <RiDeleteBinLine color="red" size={24} onClick={() => handleDelete(record)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Animal Weight Record</ModalHeader>
        {selectedRecord && (
          <form>
            <div className="form-group">
              <label htmlFor="editType">Type</label>
              <input type="text" className="form-control" id="editType" value={selectedRecord.type} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editAnimalId">Animal ID</label>
              <input type="text" className="form-control" id="editAnimalId" value={selectedRecord.animalId} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editWeight">Weight (kg)</label>
              <input type="number" className="form-control" id="editWeight" value={selectedRecord.weight} onChange={(e) => setSelectedRecord({ ...selectedRecord, weight: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editDateRecorded">Date Recorded</label>
              <input type="date" className="form-control" id="editDateRecorded" value={selectedRecord.dateRecorded} onChange={(e) => setSelectedRecord({ ...selectedRecord, dateRecorded: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editRecordedBy">Recorded By</label>
              <input type="text" className="form-control" id="editRecordedBy" value={selectedRecord.recordedBy} onChange={(e) => setSelectedRecord({ ...selectedRecord, recordedBy: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editNotes">Notes</label>
              <textarea className="form-control" id="editNotes" rows="3" value={selectedRecord.notes} onChange={(e) => setSelectedRecord({ ...selectedRecord, notes: e.target.value })}></textarea>
            </div>
          </form>
        )}
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
          <Button color="danger" onClick={() => handleDelete(selectedRecord)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AnimalWeightReport;
