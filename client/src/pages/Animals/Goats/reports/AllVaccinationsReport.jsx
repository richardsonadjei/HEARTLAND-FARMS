import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllVaccinationsReport = () => {
  const defaultType = 'Goat';
  const [animalVaccinations, setAnimalVaccinations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedVaccination, setSelectedVaccination] = useState(null);

  useEffect(() => {
    fetchAnimalVaccinations(defaultType);
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchAnimalVaccinations = async (type) => {
    try {
      const response = await fetch(`/api/animal-vaccinations?type=${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch animal vaccinations');
      }
      const data = await response.json();
      setAnimalVaccinations(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (vaccination) => {
    setSelectedVaccination(vaccination);
    toggleEditModal();
  };

  const handleDelete = async (vaccination) => {
    try {
      const response = await fetch(`/api/animal-vaccinations/${vaccination._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal vaccination');
      }
      setAnimalVaccinations(animalVaccinations.filter((v) => v._id !== vaccination._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      // Handle error message
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Implement logic to save changes in the edit modal
      // Assuming selectedVaccination contains updated data
      const response = await fetch(`/api/animal-vaccinations/${selectedVaccination._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedVaccination),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update animal vaccination data');
      }
      
      // Assuming the response contains the updated vaccination data
      const updatedVaccination = await response.json();
      
      // Update the local state with the updated vaccination data
      const updatedAnimalVaccinations = animalVaccinations.map(vaccination =>
        vaccination._id === updatedVaccination._id ? updatedVaccination : vaccination
      );
      setAnimalVaccinations(updatedAnimalVaccinations);
  
      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error if failed to save changes
    }
  };

  // Grouping the animal vaccinations by animalId
  const groupedAnimalVaccinations = animalVaccinations.reduce((acc, vaccination) => {
    if (!acc[vaccination.animalId]) {
      acc[vaccination.animalId] = [];
    }
    acc[vaccination.animalId].push(vaccination);
    return acc;
  }, {});

  return (
    <Container fluid>
      <h2 className="mt-4">All Animal Vaccinations</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {Object.keys(groupedAnimalVaccinations).map((animalId) => (
        <div key={animalId} className="table-responsive mt-4">
          <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>Animal ID: {animalId}</h3>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Vaccine Details</th>
                <th>Method of Administration</th>
                <th>Date Administered</th>
                <th>Administered By</th>
                <th>Next Due Date</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedAnimalVaccinations[animalId].map((vaccination, index) => (
                <tr key={vaccination._id}>
                  <td>{index + 1}</td>
                  <td>{vaccination.type}</td>
                  <td>{vaccination.vaccineDetails}</td>
                  <td>{vaccination.methodOfAdministration}</td>
                  <td>{new Date(vaccination.dateAdministered).toLocaleDateString('en-US')}</td>
                  <td>{vaccination.administeredBy}</td>
                  <td>{new Date(vaccination.nextDueDate).toLocaleDateString('en-US')}</td>
                  <td>{vaccination.notes}</td>
                  <td>
                    <RiPencilLine color="blue" size={24} onClick={() => handleEdit(vaccination)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <RiDeleteBinLine color="red" size={24} onClick={() => handleDelete(vaccination)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Animal Vaccination</ModalHeader>
        {selectedVaccination && (
          <form>
            <div className="form-group">
              <label htmlFor="editType">Type</label>
              <input type="text" className="form-control" id="editType" value={selectedVaccination.type} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editAnimalId">Animal ID</label>
              <input type="text" className="form-control" id="editAnimalId" value={selectedVaccination.animalId} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editVaccineDetails">Vaccine Details</label>
              <input type="text" className="form-control" id="editVaccineDetails" value={selectedVaccination.vaccineDetails} onChange={(e) => setSelectedVaccination({ ...selectedVaccination, vaccineDetails: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editMethodOfAdministration">Method of Administration</label>
              <select className="form-control" id="editMethodOfAdministration" value={selectedVaccination.methodOfAdministration} onChange={(e) => setSelectedVaccination({ ...selectedVaccination, methodOfAdministration: e.target.value })}>
                <option value="Injection">Injection</option>
                <option value="Oral">Oral</option>
                <option value="Nasal">Nasal</option>
                <option value="Topical">Topical</option>
                <option value="Intravenous">Intravenous</option>
                <option value="Intraocular">Intraocular</option>
                <option value="Subcutaneous Implant">Subcutaneous Implant</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="editDateAdministered">Date Administered</label>
              <input type="date" className="form-control" id="editDateAdministered" value={selectedVaccination.dateAdministered} onChange={(e) => setSelectedVaccination({ ...selectedVaccination, dateAdministered: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editAdministeredBy">Administered By</label>
              <input type="text" className="form-control" id="editAdministeredBy" value={selectedVaccination.administeredBy} onChange={(e) => setSelectedVaccination({ ...selectedVaccination, administeredBy: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editNextDueDate">Next Due Date</label>
              <input type="date" className="form-control" id="editNextDueDate" value={selectedVaccination.nextDueDate} onChange={(e) => setSelectedVaccination({ ...selectedVaccination, nextDueDate: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editNotes">Notes</label>
              <textarea className="form-control" id="editNotes" rows="3" value={selectedVaccination.notes} onChange={(e) => setSelectedVaccination({ ...selectedVaccination, notes: e.target.value })}></textarea>
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
          <Button color="danger" onClick={() => handleDelete(selectedVaccination)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllVaccinationsReport;
