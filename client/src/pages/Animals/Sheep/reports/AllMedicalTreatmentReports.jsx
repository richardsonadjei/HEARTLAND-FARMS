import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllMedicalTreatmentRecords = () => {
  const defaultType = 'Sheep';
  const [animalMedicalTreatments, setAnimalMedicalTreatments] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState(null);

  useEffect(() => {
    fetchAnimalMedicalTreatments(defaultType);
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchAnimalMedicalTreatments = async (type) => {
    try {
      const response = await fetch(`/api/medical-treatment-records-by-type?type=${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch animal medical treatments');
      }
      const data = await response.json();
      setAnimalMedicalTreatments(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (treatment) => {
    setSelectedTreatment(treatment);
    toggleEditModal();
  };

  const handleDelete = async (treatment) => {
    try {
      const response = await fetch(`/api/medical-treatment-records/${treatment._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal medical treatment');
      }
      setAnimalMedicalTreatments(animalMedicalTreatments.filter((t) => t._id !== treatment._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      // Handle error message
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Implement logic to save changes in the edit modal
      // Assuming selectedTreatment contains updated data
      const response = await fetch(`/api/medical-treatment-records/${selectedTreatment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedTreatment),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update animal medical treatment data');
      }
      
      // Assuming the response contains the updated treatment data
      const updatedTreatment = await response.json();
      
      // Update the local state with the updated treatment data
      const updatedAnimalMedicalTreatments = animalMedicalTreatments.map(treatment =>
        treatment._id === updatedTreatment._id ? updatedTreatment : treatment
      );
      setAnimalMedicalTreatments(updatedAnimalMedicalTreatments);
  
      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error if failed to save changes
    }
  };

  // Grouping the animal medical treatments by animalId
  const groupedAnimalMedicalTreatments = animalMedicalTreatments.reduce((acc, treatment) => {
    if (!acc[treatment.animalId]) {
      acc[treatment.animalId] = [];
    }
    acc[treatment.animalId].push(treatment);
    return acc;
  }, {});

  return (
    <Container fluid>
      <h2 className="mt-4">All Animal Medical Treatments</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {Object.keys(groupedAnimalMedicalTreatments).map((animalId) => (
        <div key={animalId} className="table-responsive mt-4">
          <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>Animal ID: {animalId}</h3>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Treatment Type</th>
                <th>Treatment Date</th>
                <th>Medication and Dosage</th>
                <th>Veterinarian</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedAnimalMedicalTreatments[animalId].map((treatment, index) => (
                <tr key={treatment._id}>
                  <td>{index + 1}</td>
                  <td>{treatment.type}</td>
                  <td>{treatment.treatmentType}</td>
                  <td>{new Date(treatment.treatmentDate).toLocaleDateString('en-US')}</td>
                  <td>{treatment.medicationAndDosage}</td>
                  <td>{treatment.veterinarian}</td>
                  <td>{treatment.notes}</td>
                  <td>
                    <RiPencilLine color="blue" size={24} onClick={() => handleEdit(treatment)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <RiDeleteBinLine color="red" size={24} onClick={() => handleDelete(treatment)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Animal Medical Treatment</ModalHeader>
        {selectedTreatment && (
          <form>
            <div className="form-group">
              <label htmlFor="editType">Type</label>
              <input type="text" className="form-control" id="editType" value={selectedTreatment.type} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editAnimalId">Animal ID</label>
              <input type="text" className="form-control" id="editAnimalId" value={selectedTreatment.animalId} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editTreatmentType">Treatment Type</label>
              <input type="text" className="form-control" id="editTreatmentType" value={selectedTreatment.treatmentType} onChange={(e) => setSelectedTreatment({ ...selectedTreatment, treatmentType: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editTreatmentDate">Treatment Date</label>
              <input type="date" className="form-control" id="editTreatmentDate" value={selectedTreatment.treatmentDate} onChange={(e) => setSelectedTreatment({ ...selectedTreatment, treatmentDate: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editMedicationAndDosage">Medication and Dosage</label>
              <input type="text" className="form-control" id="editMedicationAndDosage" value={selectedTreatment.medicationAndDosage} onChange={(e) => setSelectedTreatment({ ...selectedTreatment, medicationAndDosage: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editVeterinarian">Veterinarian</label>
              <input type="text" className="form-control" id="editVeterinarian" value={selectedTreatment.veterinarian} onChange={(e) => setSelectedTreatment({ ...selectedTreatment, veterinarian: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editNotes">Notes</label>
              <textarea className="form-control" id="editNotes" rows="3" value={selectedTreatment.notes} onChange={(e) => setSelectedTreatment({ ...selectedTreatment, notes: e.target.value })}></textarea>
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
          <Button color="danger" onClick={() => handleDelete(selectedTreatment)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllMedicalTreatmentRecords;

