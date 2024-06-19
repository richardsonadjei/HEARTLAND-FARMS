import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Container } from 'reactstrap';
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri';

const AllAnimalBirths = () => {
  const defaultType = 'Cattle';
  const [animalBirths, setAnimalBirths] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  useEffect(() => {
    fetchAnimalBirths(defaultType);
  }, []);

  const toggleEditModal = () => setEditModal(!editModal);
  const toggleDeleteModal = () => setDeleteModal(!deleteModal);

  const fetchAnimalBirths = async (type) => {
    try {
      const response = await fetch(`/api/animal-births?type=${type}`);
      if (!response.ok) {
        throw new Error('Failed to fetch animal births');
      }
      const data = await response.json();
      setAnimalBirths(data);
      setErrorMessage('');
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  };

  const handleEdit = (animal) => {
    setSelectedAnimal(animal);
    toggleEditModal();
  };

  const handleDelete = async (animal) => {
    try {
      const response = await fetch(`/api/animal-births/${animal._id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete animal birth');
      }
      setAnimalBirths(animalBirths.filter((a) => a._id !== animal._id));
      toggleDeleteModal();
    } catch (error) {
      console.error(error);
      // Handle error message
    }
  };

  const handleSaveChanges = async () => {
    try {
      // Implement logic to save changes in the edit modal
      // Assuming selectedAnimal contains updated data
      const response = await fetch(`/api/animal-births/${selectedAnimal._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedAnimal),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update animal birth data');
      }
      
      // Assuming the response contains the updated animal data
      const updatedAnimal = await response.json();
      
      // Update the local state with the updated animal data
      const updatedAnimalBirths = animalBirths.map(animal =>
        animal._id === updatedAnimal._id ? updatedAnimal : animal
      );
      setAnimalBirths(updatedAnimalBirths);
  
      // Close the edit modal after successful update
      toggleEditModal();
    } catch (error) {
      console.error(error);
      // Handle error if failed to save changes
    }
  };

  // Grouping the animal births by parentGoatId
  const groupedAnimalBirths = animalBirths.reduce((acc, animal) => {
    if (!acc[animal.animalId]) {
      acc[animal.animalId] = [];
    }
    acc[animal.animalId].push(animal);
    return acc;
  }, {});

  return (
    <Container fluid>
      <h2 className="mt-4">All Animal Births</h2>
      {errorMessage && <p>{errorMessage}</p>}
      {Object.keys(groupedAnimalBirths).map((animalId) => (
        <div key={animalId} className="table-responsive mt-4">
          <h3 style={{ textAlign: 'center', fontWeight: 'bold', color: 'blue' }}>Animal ID: {animalId}</h3>

          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>#</th>
                <th>Type</th>
                <th>Date of Birth</th>
                <th>Number of Kids</th>
                <th>Birth Details</th>
                <th>Notes</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedAnimalBirths[animalId].map((animal, index) => (
                <tr key={animal._id}>
                  <td>{index + 1}</td>
                  <td>{animal.type}</td>
                  <td>{new Date(animal.dateOfBirth).toLocaleDateString('en-US')}</td>
                  <td>{animal.numberOfKids}</td>
                  <td>
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Gender</th>
                          <th>Weight</th>
                          <th>Health Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {animal.birthDetails.map((detail, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{detail.gender}</td>
                            <td>{detail.weight}</td>
                            <td>{detail.healthStatus}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                  <td>{animal.notes}</td>
                  <td>{new Date(animal.createdAt).toLocaleString()}</td>
                  <td>
                    <RiPencilLine color="blue" size={24} onClick={() => handleEdit(animal)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <RiDeleteBinLine color="red" size={24} onClick={() => setSelectedAnimal(animal) || toggleDeleteModal()} style={{ cursor: 'pointer', marginRight: '10px' }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* Edit Modal */}
      <Modal isOpen={editModal} toggle={toggleEditModal}>
        <ModalHeader toggle={toggleEditModal}>Edit Animal Birth</ModalHeader>
        {selectedAnimal && (
          <form>
            <div className="form-group">
              <label htmlFor="editType">Type</label>
              <input type="text" className="form-control" id="editType" value={selectedAnimal.type} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editanimalId">Animal ID</label>
              <input type="text" className="form-control" id="editanimalId" value={selectedAnimal.animalId} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editDateOfBirth">Date of Birth</label>
              <input type="text" className="form-control" id="editDateOfBirth" value={selectedAnimal.dateOfBirth} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="editNumberOfKids">Number of Kids</label>
              <input type="number" className="form-control" id="editNumberOfKids" value={selectedAnimal.numberOfKids} onChange={(e) => setSelectedAnimal({ ...selectedAnimal, numberOfKids: e.target.value })} />
            </div>
            <div className="form-group">
              <label htmlFor="editNotes">Notes</label>
              <textarea className="form-control" id="editNotes" rows="3" value={selectedAnimal.notes} onChange={(e) => setSelectedAnimal({ ...selectedAnimal, notes: e.target.value })}></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="editCreatedAt">Created At</label>
              <input type="text" className="form-control" id="editCreatedAt" value={new Date(selectedAnimal.createdAt).toLocaleString()} disabled />
            </div>
            {/* Birth Details */}
            <div className="form-group">
              <label>Birth Details</label>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Gender</th>
                    <th>Weight</th>
                    <th>Health Status</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAnimal.birthDetails.map((detail, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td><input type="text" className="form-control" value={detail.gender} onChange={(e) => setSelectedAnimal({
                        ...selectedAnimal,
                        birthDetails: selectedAnimal.birthDetails.map((d, idx) => idx === i ? { ...d, gender: e.target.value } : d)
                      })} /></td>
                      <td><input type="text" className="form-control" value={detail.weight} onChange={(e) => setSelectedAnimal({
                        ...selectedAnimal,
                        birthDetails: selectedAnimal.birthDetails.map((d, idx) => idx === i ? { ...d, weight: e.target.value } : d)
                      })} /></td>
                      <td><input type="text" className="form-control" value={detail.healthStatus} onChange={(e) => setSelectedAnimal({
                        ...selectedAnimal,
                        birthDetails: selectedAnimal.birthDetails.map((d, idx) => idx === i ? { ...d, healthStatus: e.target.value } : d)
                      })} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          <Button color="danger" onClick={() => handleDelete(selectedAnimal)}>Delete</Button>
          <Button color="secondary" onClick={toggleDeleteModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default AllAnimalBirths;
